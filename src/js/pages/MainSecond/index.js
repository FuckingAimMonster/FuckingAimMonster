import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Header,
  MyInfoLinkBlock,
  StyledBgImage,
  StyledTitleBlock,
} from "../MainFirst/styles";
import BgBlur from "../../components/BgBlur";
import {
  StyledMainButton,
  StyledMainButtonBlock,
  StyledMainCommentBlock,
  TipCommentBlock,
} from "./styles";
import palette from "../../lib/style";
import targetImg from "../../../../images/target512px.png";
import profileImg from "../../../../images/user.png";
import gunImg from "../../../../images/space-gun.png";
import clapImg from "../../../../images/clap.png";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "../../modules/userSlice";

const MainSecond = () => {
  const param = useParams("dpi");
  const { ipcRenderer } = window.require("electron");
  const [isFinished, setIsFinished] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  let dpi;
  let stopTimeout;
  let sensitives;
  let totalLength = 0;

  const onClickEndButton = useCallback(() => {
    console.log(sensitives);
    const cal = (
      sensitives.reduce((prev, curr) => {
        return prev + parseFloat(curr);
      }, 0) / sensitives.length
    )
      .toFixed(2)
      .toString();
    dispatch(changeField({ key: "currentdpi", value: cal }));
    history.push("/loading");
  }, [history, dispatch]);

  /*
  ipcRenderer.on("restart", (e, arg) => {
    sensitives = arg.sensitives;
    const len = arg.len;
    totalLength += parseInt(len);
    console.log("totalLength : ", totalLength);
    console.log("end!");
    setIsFinished(true);
  });
*/

  ipcRenderer.on("restart", (e, arg) => {
    sensitives = arg.sensitives;
    const len = arg.len;
    totalLength += parseInt(len);
    console.log("totalLength : ", totalLength);
    if (totalLength >= 50) {
      console.log("end!");
      setIsFinished(true);
    } else {
      console.log("restart!");
      ipcRenderer.send("startFromApp", "start");
      stopTimeout = setTimeout(() => {
        ipcRenderer.send("stopFromApp", {
          mousedpi: dpi[0],
          gamedpi: dpi[1],
        });
      }, 120000);
    }
  });

  useEffect(() => {
    dpi = param.dpi.split(",");
  }, []);

  /*
  useEffect(() => {
    setTimeout(() => {
      console.log("Python code now running!");
      ipcRenderer.send("stopFromApp", { mousedpi: dpi[0], gamedpi: dpi[1] });
    }, 500);
  }, [ipcRenderer]);
*/

  useEffect(() => {
    stopTimeout = setTimeout(() => {
      ipcRenderer.send("stopFromApp", { mousedpi: dpi[0], gamedpi: dpi[1] });
    }, 120000);
  }, [ipcRenderer]);

  return (
    <>
      <StyledBgImage />
      <Header>
        <StyledTitleBlock>
          <img src={targetImg} />
          <h1>?????? ?????????</h1>
        </StyledTitleBlock>
        <MyInfoLinkBlock to="#">
          <span>?????????</span>
          <img src={profileImg} />
        </MyInfoLinkBlock>
      </Header>
      <BgBlur />
      {isFinished ? (
        <>
          <StyledMainCommentBlock>
            <h1>
              ?????? ????????? ??????????????????.
              <img src={clapImg} />
              <br />
              ?????? ?????? ????????? ????????? ????????? ?????? ????????? ??????????????????!
            </h1>
          </StyledMainCommentBlock>
          <StyledMainButtonBlock>
            <StyledMainButton onClick={onClickEndButton} isActive />
          </StyledMainButtonBlock>
          <TipCommentBlock>
            <span style={{ marginLeft: "270px" }}>
              <span style={{ color: `${palette.pink}` }}>Tip. </span>
              ???????????? ?????? ???????????? ??????
              <br />
              ????????? ??? ????????? ??????{" "}
              <span style={{ color: `${palette.pink}` }}>????????? ??????</span>???
              ?????? ??? ?????????.
            </span>
          </TipCommentBlock>
        </>
      ) : (
        <>
          <StyledMainCommentBlock>
            <h1>
              ????????? ?????? ????????? ??????????????? ?????????.
              <br />
              ????????? ????????? ??? ???????????????!
              <img src={gunImg} />
            </h1>
          </StyledMainCommentBlock>
          <StyledMainButtonBlock>
            <StyledMainButton />
          </StyledMainButtonBlock>
          <TipCommentBlock>
            <span style={{ marginLeft: "200px" }}>
              ????????? ???????????? ??? ?????????{" "}
              <span style={{ color: `${palette.pink}` }}>?????????</span> ????????????.
            </span>
          </TipCommentBlock>
        </>
      )}
    </>
  );
};

export default MainSecond;
