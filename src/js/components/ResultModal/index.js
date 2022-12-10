import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from "../../modules/userSlice";
import { ModalButton, ModalButtonBlock } from "../LogoutModal/styles";
import { StyledModalFrame } from "./styles";

const ResultModal = ({ isEnd }) => {
  const { ipcRenderer } = window.require("electron");
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onClickIsChanged = useCallback(() => {
    const currentdpi = user.currentdpi;
    const newUser = { ...user, gamedpi: currentdpi };
    dispatch(updateUser(newUser));
    if (isEnd) {
      ipcRenderer.send("app quit", "quit");
    } else {
      history.push("/main/first");
    }
  }, [history]);
  const onClickIsNotChanged = useCallback(() => {
    if (isEnd) {
      ipcRenderer.send("app quit", "quit");
    } else {
      history.push("/main/first");
    }
  }, [history]);

  return (
    <StyledModalFrame>
      <h1>추천받은 감도로 변경하셨나요?</h1>
      <ModalButtonBlock>
        <ModalButton pink onClick={onClickIsChanged}>
          예
        </ModalButton>
        <ModalButton onClick={onClickIsNotChanged}>아니오</ModalButton>
      </ModalButtonBlock>
    </StyledModalFrame>
  );
};

export default ResultModal;
