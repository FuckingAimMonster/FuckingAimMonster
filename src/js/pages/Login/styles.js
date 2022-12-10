import styled from "@emotion/styled";
import palette from "../../lib/style";
import keepLoginBtnImage from "../../../../images/check-mark.png";
import { WhiteBlock } from "../SignUpFirst/styles";

export const StyledWhiteBox = styled(WhiteBlock)`
  & h1 {
    margin-bottom: 50px;
  }

  & div {
    margin-bottom: 25px;
  }
`;

export const ErrorMsg = styled.span`
  color: ${palette.pink};
  display: block;
  font-size: 14px;
  font-weight: 800;
  width: 420px;
  margin: 0 auto;
  margin-bottom: 15px;
`;

export const CheckButtonBlock = styled.div`
  width: 420px;
  margin: 0 auto;
  display: flex;

  & button {
    width: 25px;
    height: 25px;
    padding: 0;
    border: none;
    border-radius: 6px;
    margin-right: 5px;
    cursor: pointer;
    background-image: ${(props) =>
      props.isChecked ? `url(${keepLoginBtnImage})` : null};
    background-size: cover;
    background-color: ${(props) =>
      props.isChecked ? palette.pink : palette.gray[0]};
  }

  & span {
    color: ${palette.black[0]};
    font-size: 18px;
    font-weight: 800;
  }
`;

export const ContinueButton = styled.button`
  width: 100px;
  height: 100px;
  padding: 0;
  border: none;
  background-color: ${palette.pink};
  border-radius: 40px;
  margin: 70px auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease-out 0s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }

  & img {
    width: 50px;
    height: 50px;
    filter: invert();
  }
`;

export const LinkSpan = styled.span`
  color: ${palette.gray[4]};
  font-size: 12px;
  font-weight: 700;

  & span {
    margin-left: 5px;
    color: ${palette.pink};
    font-size: 12px;
    font-weight: 800;
  }
`;

export const InputBlock = styled.div`
  margin-bottom: 5px;

  & span {
    font-size: 16px;
    font-weight: 800;
    color: ${palette.black[0]};
    margin-left: 5px;
    margin-bottom: 8px;
    display: block;
  }

  & input {
    width: 100%;
    height: 60px;
    background-color: ${palette.gray[0]};
    border: none;
    padding: 7px;
    border-radius: 6px;
    font-size: 26px;
    box-sizing: border-box;
    font-weight: 800;
  }

  & h6 {
    margin: 0;
    margin-top: 2px;
    font-size: 12px;
    font-weight: 800;
    color: ${palette.gray[6]};
  }
`;
