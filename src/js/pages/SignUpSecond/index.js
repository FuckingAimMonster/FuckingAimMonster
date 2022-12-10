import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BgImage from "../../components/BgImage";
import RightsComment from "../../components/RightsComment";
import {
  ContinueButton,
  InputBlock,
  LinkSpan,
  StyledWhiteBox,
} from "../Login/styles";
import continueBtnImage from "../../../../images/right-arrow.png";
import SignUpStepBox from "../../components/SignUpStepBox";
import {
  CanDoList,
  MiddleMessage,
  MoveToCheckSpan,
  StyledErrorMsg,
} from "./styles";
import fingerOneImg from "../../../../images/one.png";
import fingerTwoImg from "../../../../images/two.png";
import { addUser, changeField, initialize } from "../../modules/userSlice";
import { useEffect } from "react";

const SignUpSecond = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, nickname, password, mousedpi, gamedpi, auth, authError } =
    useSelector(({ user }) => ({
      username: user.username,
      nickname: user.nickname,
      password: user.password,
      mousedpi: user.mousedpi,
      gamedpi: user.gamedpi,
      auth: user.auth,
      authError: user.authError,
    }));
  const [error, setError] = useState("");

  const onChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    const name = e.target.name;
    dispatch(changeField({ key: name, value: value }));
  };

  const onSignUp = (e) => {
    e.preventDefault();
    if ([mousedpi, gamedpi].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    const user = {
      username,
      nickname,
      password,
      mousedpi,
      gamedpi,
      currentdpi: "",
    };
    dispatch(addUser(user));
  };

  useEffect(() => {
    if (auth) {
      setError("");
      dispatch(initialize());
      history.push("/register/third");
    }
    if (authError) {
      setError("회원가입에 실패했습니다.");
      return;
    }
  }, [auth, authError, setError, history, dispatch]);

  return (
    <>
      <BgImage />
      <StyledWhiteBox>
        <SignUpStepBox step="second" />
        <h1 style={{ marginBottom: "25px" }}>회원가입</h1>
        <form onSubmit={onSignUp}>
          <InputBlock>
            <span>마우스 DPI를 입력해주세요.</span>
            <input name="mousedpi" value={mousedpi} onChange={onChange} />
            <h6>※ 마우스 DPI는 차후 감도 계산할 때, 꼭 필요한 정보에요!</h6>
          </InputBlock>
          <InputBlock>
            <span>발로란트 인게임 감도를 입력해주세요.</span>
            <input name="gamedpi" value={gamedpi} onChange={onChange} />
          </InputBlock>
        </form>
        <StyledErrorMsg>{error}</StyledErrorMsg>
        <MiddleMessage>
          내 마우스 DPI를 모른다면?
          <span>아래와 같은 방법으로 알 수 있어요!</span>
        </MiddleMessage>
        <CanDoList>
          <li>
            <img src={fingerOneImg} />
            <h4>마우스 제조사별 소프트웨어 설치하기.</h4>
          </li>
          <li>
            <img src={fingerTwoImg} />
            <h4>직접 마우스 DPI를 계산하기.</h4>
          </li>
          <Link
            to="#"
            onClick={() =>
              window.open(
                "https://www.mouse-sensitivity.com/dpianalyzer/",
                "_blank"
              )
            }
          >
            <MoveToCheckSpan>
              ➜ DPI 측정을 위한 웹사이트로 이동하기.
            </MoveToCheckSpan>
          </Link>
        </CanDoList>
        <ContinueButton style={{ margin: "25px auto" }} onClick={onSignUp}>
          <img src={continueBtnImage} />
        </ContinueButton>
        <div>
          <LinkSpan>
            잘못 입력하신게 있나요?
            <Link to="/register/first">
              <span>이전 페이지로 돌아가기</span>
            </Link>
          </LinkSpan>
        </div>
      </StyledWhiteBox>
      <RightsComment />
    </>
  );
};

export default SignUpSecond;
