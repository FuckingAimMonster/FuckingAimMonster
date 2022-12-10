import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeField, initialize } from "../../modules/userSlice";
import { ModalButton, ModalButtonBlock } from "../LogoutModal/styles";
import { StyledModalFrame } from "./styles";

const CheckPasswordModal = ({ onClickCloseCheckPasswordModal }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const { password, correctPw } = useSelector(({ user }) => ({
    password: user.password,
    correctPw: user.user.password,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  const onChangePassword = (e) => {
    dispatch(changeField({ key: "password", value: e.target.value }));
  };

  const onClickCheckPassword = () => {
    //비밀번호 확인 후 정보 수정 페이지로 보내기
    if (password !== correctPw) {
      setErrorMessage(true);
      return;
    }
    setErrorMessage(false);
    history.push("/myinfo/modify");
  };

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, []);

  return (
    <StyledModalFrame>
      <h2>비밀번호를 입력해주세요.</h2>
      <input value={password} type="password" onChange={onChangePassword} />
      {errorMessage ? <span>비밀번호가 맞지 않습니다!</span> : null}
      <ModalButtonBlock>
        <ModalButton onClick={onClickCloseCheckPasswordModal}>
          닫 기
        </ModalButton>
        <ModalButton pink onClick={onClickCheckPassword}>
          확 인
        </ModalButton>
      </ModalButtonBlock>
    </StyledModalFrame>
  );
};

export default CheckPasswordModal;
