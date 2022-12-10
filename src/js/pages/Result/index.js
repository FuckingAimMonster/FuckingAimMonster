import React, { useCallback, useEffect, useState } from "react";
import {
  Header,
  MyInfoLinkBlock,
  StyledBgImage,
  StyledTitleBlock,
} from "../MainFirst/styles";
import targetImg from "../../../../images/target512px.png";
import profileImg from "../../../../images/user.png";
import mouseImg from "../../../../images/mouse.png";
import {
  AnalysisWhiteBlock,
  ResultButton,
  ResultTitleBlock,
  StyledButtonBlock,
} from "./styles";
import palette from "../../lib/style";
import { useDispatch, useSelector } from "react-redux";
import BgBlur from "../../components/BgBlur";
import ResultModal from "../../components/ResultModal";
import { updateUser } from "../../modules/userSlice";

const Result = () => {
  const dispatch = useDispatch();
  const [isMore, setIsMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const { senstivity, user } = useSelector(({ user }) => ({
    senstivity: user.currentdpi,
    user: user.user,
  }));

  const onClickGoToMain = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const onClickEndProgram = useCallback(() => {
    setShowModal(true);
    setIsEnd(true);
  }, [setShowModal, setIsEnd]);

  //최근 추천 마우스 감도 변경
  useEffect(() => {
    if (senstivity) {
      if (parseFloat(user.gamedpi) >= parseFloat(senstivity)) {
        setIsMore(true);
      }
      const newUser = { ...user, currentdpi: senstivity };
      dispatch(updateUser(newUser));
    }
  }, [setIsMore, dispatch]);

  return (
    <>
      <StyledBgImage />
      <Header>
        <StyledTitleBlock>
          <img src={targetImg} />
          <h1>에임 양식장</h1>
        </StyledTitleBlock>
        {/*
        <MyInfoLinkBlock to="/myinfo">
          <span>내정보</span>
          <img src={profileImg} />
        </MyInfoLinkBlock>
        */}
      </Header>
      <>
        <ResultTitleBlock>
          <h1>
            {user.nickname}님 마우스 감도 분석 결과
            <img src={mouseImg} />
          </h1>
        </ResultTitleBlock>
        <AnalysisWhiteBlock>
          <h2>
            적과의 조우 시에, <br />
            평균적으로 마우스가 적의 위치보다{" "}
            <span style={{ color: `${palette.pink}` }}>
              {isMore ? "더 " : "덜 "}
            </span>{" "}
            이동하고 있어요.
          </h2>
          <h1>
            따라서 인게임 감도를 지금보다 <br />{" "}
            <span style={{ color: `${palette.pink}` }}>
              {isMore ? "더 낮은 " : "더 높은 "}
            </span>
            <span
              style={{
                color: `${palette.pink}`,
                fontSize: "40px",
                textDecoration: "underline",
              }}
            >
              {senstivity}
            </span>{" "}
            정도로 맞추는 것을 추천해요!
          </h1>
        </AnalysisWhiteBlock>
        <StyledButtonBlock>
          <div>
            <span>다시 한 번 분석을 희망하시나요?</span>
            <ResultButton mint onClick={onClickGoToMain}>
              메인화면으로 이동하기
            </ResultButton>
          </div>
          <div>
            <span>충분한 도움이 되셨나요?</span>
            <ResultButton pink onClick={onClickEndProgram}>
              프로그램 종료하기
            </ResultButton>
          </div>
        </StyledButtonBlock>
      </>
      {showModal ? (
        <>
          <ResultModal isEnd={isEnd} />
          <BgBlur />
        </>
      ) : null}
    </>
  );
};

export default Result;
