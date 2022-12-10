import styled from "@emotion/styled";
import { StyledButton } from "../../components/Button/styles";
import palette from "../../lib/style";
import { ButtonBlock } from "../Home/styles";
import { MainCommentBlock } from "../MainFirst/styles";
import { CanDoList } from "../SignUpSecond/styles";

export const ResultTitleBlock = styled(MainCommentBlock)`
  margin-top: 80px;

  & h1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & img {
    width: 45px;
    height: 45px;
    margin-left: 7px;
  }
`;

export const AnalysisWhiteBlock = styled.div`
  width: 700px;
  height: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 14px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border-radius: 4px;
  z-index: 0;
  margin: 0 auto;
  margin-top: 50px;

  & h2 {
    margin: 0;
    padding-top: 40px;
    text-align: center;
    color: ${palette.black[1]};
  }

  & h1 {
    margin-top: 70px;
    text-align: center;
    color: ${palette.black[1]};
  }
`;

export const StyledButtonBlock = styled(ButtonBlock)`
  margin: 0;
`;

export const ResultButton = styled(StyledButton)`
  font-size: 30px;
`;
