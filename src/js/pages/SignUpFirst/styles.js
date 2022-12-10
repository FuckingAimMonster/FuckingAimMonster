import styled from "@emotion/styled";
import { ContinueButton } from "../Login/styles";
import React from "react";

export const WhiteBlock = styled.div`
  width: 540px;
  height: 730px;
  margin: 0 auto;
  margin-top: 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 14px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border-radius: 4px;
  z-index: 0;
  position: relative;

  & h1 {
    font-size: 40px;
    padding-top: 40px;
    margin: 0;
    text-align: center;
    margin-bottom: 25px;
  }

  & div {
    width: 420px;
    margin: 0 auto;
    margin-bottom: 12px;
  }
`;

export const StyledContinueButton = styled((props) => (
  <ContinueButton {...props} />
))`
  margin-top: 30px;
  margin-bottom: 22px;
`;
