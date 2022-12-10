const { desktopCapturer, ipcRenderer } = require("electron");
const fs = require("fs");
const PythonShell = require("python-shell");

let mediaRecorder; //MediaRecorder instance to capture footage
let recordedChunks = [];
let startTime;
let counter = 1;
let sensitives = [];

const startPromise = () => {
  return new Promise((resolve, reject) => {
    mediaRecorder.start();
    resolve("done");
  });
};
const start = async () => {
  await startPromise().then((resolve) => {
    startTime = Date.now();
  });
};

/*
const imageCapture = (mousedpi, gamedpi) => {
  const options = {
    mode: "text",
    pythonPath: "./resources/app/python_venv/python.exe",
    pythonOptions: ["-u"],
    scriptPath: "",
    args: [counter, mousedpi, gamedpi],
  };

  PythonShell.PythonShell.run(
    "./resources/app/Final/application.py",
    options,
    (err, result) => {
      console.log("Error : ", err);
      console.log(result);
      const len = result[result.length - 2];
      sensitives.push(result[result.length - 1]);
      ipcRenderer.send("calFinish", { sensitives, len });
    }
  );
  counter++;
};
*/

const imageCapture = (clickTimes, mousePosSet, mousedpi, gamedpi) => {
  const options = {
    mode: "text",
    pythonPath: "./python_venv/python.exe",
    pythonOptions: ["-u"],
    scriptPath: "",
    args: [counter, clickTimes, mousePosSet, mousedpi, gamedpi],
  };

  PythonShell.PythonShell.run(
    "./Final/application.py",
    options,
    (err, result) => {
      console.log("Error : ", err);
      console.log(result);
      const len = result[result.length - 2];
      sensitives.push(result[result.length - 1]);
      ipcRenderer.send("calFinish", { sensitives, len });
      if (err) {
        console.log(err);
      }
    }
  );
};

const stopPromise = (clickTimes, mousePosSet, mousedpi, gamedpi) => {
  return new Promise((resolve, reject) => {
    mediaRecorder.stop();
    setTimeout(imageCapture(clickTimes, mousePosSet, mousedpi, gamedpi), 300);
    resolve("done");
  });
};

ipcRenderer.on("startRecord", () => {
  getVideoSources();
});

/*
ipcRenderer.on("stopRecord", (e, { mousedpi, gamedpi }) => {
  imageCapture(mousedpi, gamedpi);
});
*/

ipcRenderer.on(
  "stopRecord",
  async (e, { clickTimes, mousePosSet, mousedpi, gamedpi }) => {
    const temp = clickTimes.map((time) => time - startTime);
    fs.writeFileSync(
      `videos/drags_origin_${counter}.json`,
      JSON.stringify(mousePosSet)
    );
    fs.writeFileSync(`videos/clickTimes_origin_${counter}.txt`, temp);
    await stopPromise(temp, mousePosSet, mousedpi, gamedpi);
  }
);

const getVideoSources = async () => {
  const inputSources = await desktopCapturer.getSources({
    types: ["screen"],
  });
  selectSource(inputSources[0]).then(() => {
    start();
  });
};

//Captures all recorded chunks
const handleDataAvailable = (event) => {
  console.log("video data available");
  recordedChunks.push(event.data);
};

const handleStop = async (event) => {
  const blob = new Blob(recordedChunks, {
    type: "video/webm; codecs=vp9",
  });
  const buffer = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync(`videos/video_${counter}.mp4`, buffer);
  console.log("video saved successfully");
  recordedChunks = [];
  counter++;
};

//Change the videoSource window to record
const selectSource = async (source) => {
  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: source.id,
      },
    },
  };
  //Create a Stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  //Create the Media Recorder
  const options = { MimeType: "video/webm; codecs=vp9" };
  mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;
};
