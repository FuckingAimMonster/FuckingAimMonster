import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BgImage from "../../components/BgImage";
import RightsComment from "../../components/RightsComment";
import {
  ContinueButton,
  ErrorMsg,
  InputBlock,
  LinkSpan,
  StyledWhiteBox,
} from "./styles";
import continueBtnImage from "../../../../images/right-arrow.png";
import { changeField, initialize, login } from "../../modules/userSlice";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, password, user, authError } = useSelector(({ user }) => ({
    username: user.username,
    password: user.password,
    user: user.user,
    authError: user.authError,
  }));
  //const [keepLogin, setKeepLoigin] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ key: name, value: value }));
  };

  /*
  const changeKeepLogin = useCallback(() => {
    setKeepLoigin((prev) => !prev);
  }, [setKeepLoigin]);
  */

  const onLogin = (e) => {
    e.preventDefault();
    if ([username, password].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    const info = { username, password };
    dispatch(login(info));
    dispatch(initialize());
  };

  useEffect(() => {
    if (authError) {
      setError("아이디 및 비밀번호를 확인해주세요.");
      return;
    }
    if (user) {
      setError("");
      history.push("/precautions");
    }
  }, [authError, user, setError, dispatch]);

  const initialInput = useCallback(() => {
    dispatch(initialize());
  }, [dispatch]);

  return (
    <>
      <BgImage />
      <StyledWhiteBox>
        <h1>로그인</h1>
        <form onSubmit={onLogin}>
          <InputBlock>
            <span>아이디</span>
            <input name="username" value={username} onChange={onChange} />
          </InputBlock>
          <InputBlock>
            <span>비밀번호</span>
            <input
              name="password"
              value={password}
              type="password"
              onChange={onChange}
            />
          </InputBlock>
        </form>
        <ErrorMsg>{error}</ErrorMsg>
        {/*
          <CheckButtonBlock isChecked={keepLogin ? true : false}>
            <button onClick={changeKeepLogin} />
            <span>로그인 상태 유지</span>
          </CheckButtonBlock>
        */}
        <ContinueButton onClick={onLogin}>
          <img src={continueBtnImage} />
        </ContinueButton>
        <div>
          <LinkSpan>
            아직 회원이 아니신가요?
            <Link to="/register/first" onClick={initialInput}>
              <span>회원가입 하러가기</span>
            </Link>
          </LinkSpan>
        </div>
      </StyledWhiteBox>
      <RightsComment />
    </>
  );
};

export default Login;
