import styled from "@emotion/styled";
import { StyledButton } from "../../components/Button/styles";
import palette from "../../lib/style";

export const CompleteMessage = styled.h2`
  font-size: 38px;
  margin: 0;
  text-align: center;
  padding-top: 150px;

  & img {
    width: 36px;
    height: 36px;
    margin-left: 4px;
  }
`;

export const CheerUpMessage = styled.h3`
  color: ${palette.gray[7]};
  font-size: 24px;
  margin: 0;
  text-align: center;
  margin-left: -8px;
`;

export const MiddleImg = styled.img`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  display: block;
  margin-top: 20px;
  margin-bottom: 100px;
  padding-left: 20px;
`;

export const ToLoginButton = styled(StyledButton)`
  padding: 35px 30px;
  font-size: 28px;
  border-radius: 30px;
  display: block;
  margin: 0 auto;
`;
