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
          <h1>에임 양식장</h1>
        </StyledTitleBlock>
        <MyInfoLinkBlock to="#">
          <span>내정보</span>
          <img src={profileImg} />
        </MyInfoLinkBlock>
      </Header>
      <BgBlur />
      {isFinished ? (
        <>
          <StyledMainCommentBlock>
            <h1>
              정보 수집이 완료되었어요.
              <img src={clapImg} />
              <br />
              아래 종료 버튼을 클릭해 마우스 감도 분석을 시작해주세요!
            </h1>
          </StyledMainCommentBlock>
          <StyledMainButtonBlock>
            <StyledMainButton onClick={onClickEndButton} isActive />
          </StyledMainButtonBlock>
          <TipCommentBlock>
            <span style={{ marginLeft: "270px" }}>
              <span style={{ color: `${palette.pink}` }}>Tip. </span>
              원한다면 지금 종료하지 않고
              <br />
              게임을 더 진행해 보다{" "}
              <span style={{ color: `${palette.pink}` }}>정확한 결과</span>를
              얻을 수 있어요.
            </span>
          </TipCommentBlock>
        </>
      ) : (
        <>
          <StyledMainCommentBlock>
            <h1>
              인게임 정보 수집이 이루어지고 있어요.
              <br />
              조금만 게임을 더 즐겨주세요!
              <img src={gunImg} />
            </h1>
          </StyledMainCommentBlock>
          <StyledMainButtonBlock>
            <StyledMainButton />
          </StyledMainButtonBlock>
          <TipCommentBlock>
            <span style={{ marginLeft: "200px" }}>
              수집이 완료되면 위 버튼이{" "}
              <span style={{ color: `${palette.pink}` }}>활성화</span> 될거에요.
            </span>
          </TipCommentBlock>
        </>
      )}
    </>
  );
};

export default MainSecond;
