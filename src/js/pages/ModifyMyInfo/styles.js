import styled from "@emotion/styled";
import { StyledButton } from "../../components/Button/styles";
import palette from "../../lib/style";
import { ListItemBlock } from "../MyInfo/styles";

export const InfoInput = styled.input`
  width: 300px;
  margin-top: 5px;
  height: 60px;
  background-color: ${palette.gray[0]};
  border: none;
  padding: 7px;
  border-radius: 6px;
  font-size: 32px;
  box-sizing: border-box;
  font-weight: 800;
  text-align: right;
`;

export const StyledListItemBlock = styled(ListItemBlock)`
  & span {
    margin-top: 5px;
    display: block;
    text-align: right;
    color: ${palette.pink};
    font-size: 12px;
    font-weight: 800;
  }
`;

export const ModifyMyInfoButtonBlock = styled.div`
  margin-right: 50px;
  margin-top: 60px;
  text-align: right;
  & button + button {
    margin-left: 30px;
  }
`;

export const ModifyMyInfoButton = styled(StyledButton)`
  padding: 22px 12px;
  font-size: 34px;
  border-radius: 12px;
`;
