import React, { useEffect } from "react";
import BgImage from "../../components/BgImage";
import RightsComment from "../../components/RightsComment";
import SignUpStepBox from "../../components/SignUpStepBox";
import { StyledWhiteBox } from "../Login/styles";
import {
  CheerUpMessage,
  CompleteMessage,
  MiddleImg,
  ToLoginButton,
} from "./styles";
import fireCrackerImg from "../../../../images/fireworks.png";
import targetImg from "../../../../images/target512px.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUpThird = () => {
  return (
    <>
      <BgImage />
      <StyledWhiteBox>
        <SignUpStepBox step="third" />
        <CompleteMessage>
          회원가입이 완료되었어요.
          <img src={fireCrackerImg} />
        </CompleteMessage>
        <CheerUpMessage>
          에임 고수가 되는 날까지 열심히 노력해봐요 !
        </CheerUpMessage>
        <MiddleImg src={targetImg} />
        <Link to="/login">
          <ToLoginButton pink>로그인 하러가기</ToLoginButton>
        </Link>
      </StyledWhiteBox>
      <RightsComment />
    </>
  );
};

export default SignUpThird;
