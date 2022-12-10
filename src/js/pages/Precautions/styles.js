import styled from "@emotion/styled";
import { StyledButton } from "../../components/Button/styles";
import palette from "../../lib/style";
import { CheckButtonBlock } from "../Login/styles";
import { WhiteBlock } from "../SignUpFirst/styles";

export const PrecautionsWhiteBlock = styled(WhiteBlock)`
  width: 1000px;

  & h1 {
    margin: 0;
  }

  & h5 {
    margin-top: 5px;
    margin-bottom: 50px;
    text-align: center;
    color: ${palette.pink};
  }

  & div {
    width: 100%;
    margin-bottom: 0;
  }
`;

export const CautionsBlock = styled.ul`
  list-style: none;

  & li {
    margin-bottom: 50px;
    span {
      margin-left: 30px;
      margin-top: 5px;
      color: ${palette.gray[5]};
      font-size: 16px;
      font-weight: 700;
      display: block;
    }
  }
`;

export const StyledCheckButtonBlock = styled(CheckButtonBlock)`
  align-items: center;

  & h2 {
    margin: 0;
    font-size: 28px;
    color: ${palette.black[0]};
  }
`;

export const AllCheckButton = styled(StyledButton)`
  padding: 30px 40px;
  font-size: 28px;
  border-radius: 20px;
  display: block;
  margin: 0 auto;
  margin-top: 90px;
  border: none;
  transition: all 0.3s ease-out 0s;

  ${(props) =>
    props.isActive
      ? `
  color: #ffffff;
  background-color: ${palette.pink};
  `
      : `
  color: ${palette.black[0]};
  &: hover {
    transform: none;
    box-shadow: none;
    cursor: default;
  }
  `}
`;
