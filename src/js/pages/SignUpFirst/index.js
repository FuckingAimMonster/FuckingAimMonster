import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, checkId, initialize } from "../../modules/userSlice";
import BgImage from "../../components/BgImage";
import RightsComment from "../../components/RightsComment";
import { ErrorMsg, InputBlock, LinkSpan } from "../Login/styles";
import continueBtnImage from "../../../../images/right-arrow.png";
import { StyledContinueButton, WhiteBlock } from "./styles";
import { Link, useHistory } from "react-router-dom";
import SignUpStepBox from "../../components/SignUpStepBox";
import { useState } from "react";
import { useEffect } from "react";

const SignUpFirst = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, nickname, password, checkPassword, authError, isChecked } =
    useSelector(({ user }) => ({
      username: user.username,
      nickname: user.nickname,
      password: user.password,
      checkPassword: user.checkPassword,
      authError: user.authError,
      isChecked: user.isChecked,
    }));
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ key: name, value: value }));
  };

  const onSignUpCheck = (e) => {
    e.preventDefault();
    if ([username, nickname, password, checkPassword].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    if (password !== checkPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      dispatch(changeField({ key: "password", value: "" }));
      dispatch(changeField({ key: "checkPassword", value: "" }));
      return;
    }
    dispatch(checkId(username));
  };

  useEffect(() => {
    if (authError) {
      setError("이미 존재하는 아이디입니다.");
      dispatch(changeField({ key: "username", value: "" }));
      return;
    }
    if (isChecked) {
      setError("");
      dispatch(changeField({ key: "authError", value: null }));
      dispatch(changeField({ key: "isChecked", value: false }));
      history.push("/register/second");
    }
  }, [isChecked, authError, setError, dispatch]);

  const initialInput = useCallback(() => {
    dispatch(initialize());
  }, [dispatch]);

  return (
    <>
      <BgImage />
      <WhiteBlock>
        <SignUpStepBox step="first" />
        <h1>회원가입</h1>
        <form onSubmit={onSignUpCheck}>
          <InputBlock>
            <span>아이디</span>
            <input name="username" value={username} onChange={onChange} />
          </InputBlock>
          <InputBlock>
            <span>닉네임</span>
            <input name="nickname" value={nickname} onChange={onChange} />
          </InputBlock>
          <InputBlock>
            <span>비밀번호</span>
            <input
              name="password"
              type="password"
              value={password}
              onChange={onChange}
            />
          </InputBlock>
          <InputBlock>
            <span>비밀번호 확인</span>
            <input
              name="checkPassword"
              type="password"
              value={checkPassword}
              onChange={onChange}
            />
          </InputBlock>
        </form>
        <ErrorMsg>{error}</ErrorMsg>
        <StyledContinueButton onClick={onSignUpCheck}>
          <img src={continueBtnImage} />
        </StyledContinueButton>
        <div>
          <LinkSpan>
            이미 회원이신가요?
            <Link to="/login" onClick={initialInput}>
              <span>로그인 하러가기</span>
            </Link>
          </LinkSpan>
        </div>
      </WhiteBlock>
      <RightsComment />
    </>
  );
};

export default SignUpFirst;
