import styled from "@emotion/styled";
import palette from "../../lib/style";

export const SignUpStepBlock = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  right: 5px;
  top: -20px;
`;

export const SignUpStep = styled.span`
  width: 40px;
  height: 7px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.active ? palette.pink : palette.gray[1]};
  display: inline-block;
  margin-left: 5px;
`;
