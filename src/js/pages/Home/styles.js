import styled from "@emotion/styled";

export const TitleBlock = styled.div`
  display: flex;
  width: 1100px;
  margin: 0 auto;
  align-items: center;

  & h1 {
    font-size: 84px;
    line-height: 1.2;
    color: #2f2f34;
    margin: 50px 0;
  }

  & img {
    width: 128px;
    height: 128px;
  }
`;

export const ButtonBlock = styled.div`
  position: absolute;
  right: 80px;
  bottom: 100px;
  display: flex;
  margin-bottom: 50px;
  flex: wrap;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  & span {
    display: block;
    text-align: right;
    font-size: 14px;
    margin: 0;
    margin-bottom: 10px;
    font-weight: 800;
  }
  & div + div {
    margin-top: 30px;
  }
`;
