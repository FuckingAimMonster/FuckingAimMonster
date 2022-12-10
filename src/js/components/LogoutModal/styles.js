import styled from "@emotion/styled";
import palette from "../../lib/style";
import { StyledButton } from "../Button/styles";

export const ModalFrame = styled.div`
  width: 500px;
  height: 280px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 14px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border-radius: 4px;
  z-index: 0;
  position: absolute;
  top: 35%;
  left: 80px;

  & h1 {
    margin: 60px 0;
    font-size: 38px;
    color: ${palette.black[0]};
    text-align: center;
  }
`;

export const ModalButtonBlock = styled.div`
  display: flex;
  justify-content: center;

  & button + button {
    margin-left: 80px;
  }
`;

export const ModalButton = styled(StyledButton)`
  font-size: 34px;
  border-radius: 12px;
  padding: 22px 12px;
`;
