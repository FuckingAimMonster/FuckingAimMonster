import styled from "@emotion/styled";
import palette from "../../lib/style";
import { ErrorMsg } from "../Login/styles";

export const MiddleMessage = styled.span`
  width: 420px;
  margin: 0 auto;
  display: block;
  font-size: 32px;
  font-weight: 800;

  & span {
    color: ${palette.black[0]};
    display: block;
    font-size: 14px;
  }
`;

export const CanDoList = styled.ul`
  width: 420px;
  margin: 0 auto;
  list-style: none;
  padding: 0;

  & li {
    display: flex;
    margin-top: 15px;
    align-items: center;

    img {
      width: 25px;
      height: 25px;
    }

    h4 {
      margin: 0;
      font-size: 20px;
      color: ${palette.black[0]};
    }
  }
`;

export const MoveToCheckSpan = styled.span`
  color: ${palette.pink};
  font-size: 12px;
  font-weight: 800;
  margin-left: 25px;
`;

export const StyledErrorMsg = styled(ErrorMsg)`
  margin-top: -15px;
`;
