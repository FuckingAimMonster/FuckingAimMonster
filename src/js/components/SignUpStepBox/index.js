import React from "react";
import { SignUpStep, SignUpStepBlock } from "./styles";

const SignUpStepBox = ({ step }) => {
  if (step === "first") {
    return (
      <SignUpStepBlock>
        <SignUpStep active />
        <SignUpStep />
        <SignUpStep />
      </SignUpStepBlock>
    );
  }
  if (step === "second") {
    return (
      <SignUpStepBlock>
        <SignUpStep />
        <SignUpStep active />
        <SignUpStep />
      </SignUpStepBlock>
    );
  }
  return (
    <SignUpStepBlock>
      <SignUpStep />
      <SignUpStep />
      <SignUpStep active />
    </SignUpStepBlock>
  );
};

export default SignUpStepBox;
