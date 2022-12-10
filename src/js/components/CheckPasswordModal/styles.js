import styled from "@emotion/styled";
import palette from "../../lib/style";
import { ModalFrame } from "../LogoutModal/styles";

export const StyledModalFrame = styled(ModalFrame)`
  & h2 {
    margin: 0;
    margin-top: 30px;
    font-size: 30px;
    color: ${palette.black[0]};
    text-align: center;
  }

  & input {
    display: block;
    margin: 5px auto;
    width: 420px;
    height: 60px;
    background-color: ${palette.gray[0]};
    border: none;
    padding: 7px;
    border-radius: 6px;
    font-size: 26px;
    box-sizing: border-box;
  }

  & span {
    display: block;
    width: 420px;
    margin: 0 auto;
    color: ${palette.pink};
    font-size: 14px;
    font-weight: 900;
  }

  & div {
    margin-top: 35px;
  }
`;
