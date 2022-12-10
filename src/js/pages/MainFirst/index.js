import React, { useCallback, useEffect, useState } from "react";
import {
  CommentSpan,
  CounterSpan,
  Header,
  MainButton,
  MainButtonBlock,
  MainCommentBlock,
  MyInfoLinkBlock,
  StyledBgImage,
  StyledTitleBlock,
  TimerBlock,
} from "./styles";
import targetImg from "../../../../images/target512px.png";
import profileImg from "../../../../images/user.png";
import BgBlur from "../../components/BgBlur";
import { StyledButton } from "../../components/Button/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const MainFirst = () => {
  const { mousedpi, gamedpi } = useSelector(({ user }) => ({
    mousedpi: user.user.mousedpi,
    gamedpi: user.user.gamedpi,
  }));
  const { ipcRenderer } = window.require("electron");
  const history = useHistory();
  const [isStarting, setIsStarting] = useState(false);
  const [counter, setCounter] = useState(5);
  let counterInterval;
  let recordTimeout;

  /*
  const onClickStartButton = useCallback(() => {
    setIsStarting(true);
    counterInterval = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
  }, [setIsStarting, setCounter]);
  */

  const onClickStartButton = useCallback(() => {
    setIsStarting(true);
    counterInterval = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
    recordTimeout = setTimeout(() => {
      ipcRenderer.send("startFromApp", "start");
    }, 5000);
  }, [setIsStarting, setCounter]);

  const onClickCancelButton = useCallback(() => {
    clearTimeout(recordTimeout);
    clearInterval(counterInterval);
    setIsStarting(false);
    setCounter(5);
  }, [setIsStarting]);

  useEffect(() => {
    if (counter === 0) {
      clearInterval(counterInterval);
      history.push(`/main/second/${mousedpi},${gamedpi}`);
    }
  }, [counter]);

  useEffect(() => {
    return () => setIsStarting(false);
  }, []);

  return (
    <>
      <StyledBgImage />
      <Header>
        <StyledTitleBlock>
          <img src={targetImg} />
          <h1>에임 양식장</h1>
        </StyledTitleBlock>
        <MyInfoLinkBlock to="/myinfo">
          <span>내정보</span>
          <img src={profileImg} />
        </MyInfoLinkBlock>
      </Header>
      <MainCommentBlock>
        <h1>가운데 시작 버튼을 누르고 게임을 진행해주세요 !</h1>
        <p>
          게임을 진행하는 동안 감도 분석에 필요한 정보 수집이 이루어져요.
          <br />
          정확한 분석을 위해 최소 2~3판의 게임 정보가 요구돼요.
          <br />
          수집이 시작되면 필요한 정보가 모두 채워질 때까지 화면 이동이
          불가능해요.
        </p>
      </MainCommentBlock>
      <MainButtonBlock>
        <MainButton onClick={onClickStartButton} />
      </MainButtonBlock>
      {isStarting ? (
        <>
          <BgBlur />
          <TimerBlock>
            <div>
              <CounterSpan>{counter}</CounterSpan>
              <CommentSpan>
                초 뒤에
                <br />
                정보 수집이 시작됩니다.
              </CommentSpan>
            </div>
            <div style={{ marginTop: "90px" }}>
              <StyledButton pink onClick={onClickCancelButton}>
                취 소
              </StyledButton>
            </div>
          </TimerBlock>
        </>
      ) : null}
    </>
  );
};

export default MainFirst;
