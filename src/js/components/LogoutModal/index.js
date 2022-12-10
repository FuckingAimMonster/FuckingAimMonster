import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../modules/userSlice";
import { ModalButton, ModalButtonBlock, ModalFrame } from "./styles";

const LogoutModal = ({ onClickCloseLogoutModal }) => {
  const { username } = useSelector(({ user }) => ({
    username: user.user.username,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  const onClickLogout = useCallback(() => {
    //로그아웃 후 첫화면으로 보내기
    dispatch(logout(username));
    history.push("/");
  }, [dispatch, history]);

  return (
    <ModalFrame>
      <h1>로그아웃 하시겠습니까?</h1>
      <ModalButtonBlock>
        <ModalButton onClick={onClickCloseLogoutModal}>취 소</ModalButton>
        <ModalButton pink onClick={onClickLogout}>
          확 인
        </ModalButton>
      </ModalButtonBlock>
    </ModalFrame>
  );
};

export default LogoutModal;
