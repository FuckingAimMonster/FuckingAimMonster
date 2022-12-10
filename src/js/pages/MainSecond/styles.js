import styled from "@emotion/styled";
import palette from "../../lib/style";
import { MainButtonBlock, MainCommentBlock } from "../MainFirst/styles";

export const StyledMainCommentBlock = styled(MainCommentBlock)`
  margin-top: 130px;
  position: relative;
  z-index: 1;

  & img {
    width: 44px;
    height: 44px;
    margin-left: 7px;
  }
`;

export const StyledMainButtonBlock = styled(MainButtonBlock)`
  margin-top: 70px;
`;

export const StyledMainButton = styled.button`
  display: block;
  width: 180px;
  height: 180px;
  padding: 0;
  border: none;
  border-radius: 25px;
  z-index: 1;

  ${(props) =>
    props.isActive
      ? `
      background: ${palette.pink};
      cursor: pointer;
      `
      : ` background: ${palette.gray[1]};`}
`;

export const TipCommentBlock = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  margin-top: 15px;

  & span {
    font-size: 20px;
    font-weight: 800;
    color: ${palette.gray[8]};
  }
`;
