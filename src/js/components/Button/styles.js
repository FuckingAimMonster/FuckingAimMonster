import styled from "@emotion/styled";
import palette from "../../lib/style";

export const StyledButton = styled.button`
  padding: 25px 20px;
  border-radius: 12px;
  font-size: 42px;
  line-height: 0.2;
  font-weight: 800;
  transition: all 0.15s ease-out 0s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }

  ${(props) =>
    props.pink
      ? `
  background-color: ${palette.pink};
  color: #ffffff;
  border: 1px solid ${palette.pink};
  `
      : props.mint
      ? `
      background-color: ${palette.mint[0]};
      color: #ffffff;
      border: 1px solid ${palette.mint[0]};
      `
      : `background-color: ${palette.gray[1]};
      border: 1px solid ${palette.gray[3]};
      `}
`;
