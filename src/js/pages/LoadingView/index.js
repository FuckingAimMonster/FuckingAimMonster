import React, { useEffect } from "react";
import {
  Header,
  MyInfoLinkBlock,
  StyledBgImage,
  StyledTitleBlock,
} from "../MainFirst/styles";
import BgBlur from "../../components/BgBlur";
import {
  StyledMainButtonBlock,
  StyledMainCommentBlock,
} from "../MainSecond/styles";
import { LoadingSvg } from "./styles";
import targetImg from "../../../../images/target512px.png";
import profileImg from "../../../../images/user.png";
import { useHistory } from "react-router-dom";

const LoadingView = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/result");
    }, 3000);
  }, [history]);

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
      <StyledMainCommentBlock>
        <h1>
          마우스 감도 분석이 진행중이에요.
          <br />
          조금만 기다려주세요.
        </h1>
      </StyledMainCommentBlock>
      <StyledMainButtonBlock>
        <LoadingSvg viewBox="25 25 50 50" strokeWidth="2">
          <circle cx="50" cy="50" r="20" />
        </LoadingSvg>
      </StyledMainButtonBlock>
    </>
  );
};

export default LoadingView;
