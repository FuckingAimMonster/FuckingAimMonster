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
          <h1>?????? ?????????</h1>
        </StyledTitleBlock>
        <MyInfoLinkBlock to="/myinfo">
          <span>?????????</span>
          <img src={profileImg} />
        </MyInfoLinkBlock>
      </Header>
      <MainCommentBlock>
        <h1>????????? ?????? ????????? ????????? ????????? ?????????????????? !</h1>
        <p>
          ????????? ???????????? ?????? ?????? ????????? ????????? ?????? ????????? ???????????????.
          <br />
          ????????? ????????? ?????? ?????? 2~3?????? ?????? ????????? ????????????.
          <br />
          ????????? ???????????? ????????? ????????? ?????? ????????? ????????? ?????? ?????????
          ???????????????.
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
                ??? ??????
                <br />
                ?????? ????????? ???????????????.
              </CommentSpan>
            </div>
            <div style={{ marginTop: "90px" }}>
              <StyledButton pink onClick={onClickCancelButton}>
                ??? ???
              </StyledButton>
            </div>
          </TimerBlock>
        </>
      ) : null}
    </>
  );
};

export default MainFirst;
