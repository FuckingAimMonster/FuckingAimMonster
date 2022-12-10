import styled from "@emotion/styled";
import bg from "../../../../images/backgroundImage.jpg";

export const Background = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: url(${bg});
  z-index: -1;
`;
