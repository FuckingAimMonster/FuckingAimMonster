import styled from "@emotion/styled";

export const LoadingSvg = styled.svg`
  --uib-size: 150px;
  --uib-speed: 2s;
  --uib-color: black;

  height: var(--uib-size);
  width: var(--uib-size);
  vertical-align: middle;
  transform-origin: center;
  animation: rotate var(--uib-speed) linear infinite;

  & circle {
    fill: none;
    stroke: var(--uib-color);
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: stretch calc(var(--uib-speed) * 0.75) ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes stretch {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dashoffset: -124px;
    }
  }
`;
