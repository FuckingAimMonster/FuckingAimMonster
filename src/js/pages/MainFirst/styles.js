import styled from "@emotion/styled";
import { TitleBlock } from "../Home/styles";
import palette from "../../lib/style";
import { Link } from "react-router-dom";
import { Background } from "../../components/BgImage/styles";
import startBtnImg from "../../../../images/right-arrow-black-triangle.png";

export const StyledBgImage = styled(Background)`
  top: 50%;
  width: 50%;
  height: 50%;
  background-size: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${palette.gray[2]};
  height: 49px;
  justify-content: space-between;
`;

export const StyledTitleBlock = styled(TitleBlock)`
  width: 300px;
  margin: 0;
  margin-left: 8px;

  & h1 {
    font-size: 24px;
    margin: 0;
    margin-left: -3px;
  }

  & img {
    width: 36px;
    height: 36px;
  }
`;

export const MyInfoLinkBlock = styled(Link)`
  padding: 7px;
  width: 80px;
  height: 25px;
  border-radius: 16px;
  margin-right: 12px;
  background-color: ${palette.gray[1]};
  display: flex;
  align-items: center;

  & span {
    color: #000000;
    font-size: 20px;
    font-weight: 800;
  }

  & img {
    width: 18px;
    height: 18px;
    margin-left: 4px;
  }
`;

export const MainCommentBlock = styled.div`
  margin-top: 120px;

  & h1 {
    margin: 0;
    text-align: center;
    font-size: 44px;
  }

  & p {
    text-align: center;
    font-size: 20px;
    color: ${palette.gray[8]};
    font-weight: 800;
  }
`;

export const MainButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const MainButton = styled.button`
  display: block;
  width: 200px;
  height: 200px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  background-size: 200px;
  background-image: url(${startBtnImg});
`;

export const TimerBlock = styled.div`
  position: absolute;
  top: 40%;
  z-index: 1;
  width: 100%;

  & div {
    display: flex;
    justify-content: center;
  }
`;

export const CounterSpan = styled.span`
  font-size: 150px;
  color: ${palette.pink};
  font-weight: 800;
  margin-right: 5px;
  padding-left: 425px;
`;

export const CommentSpan = styled.span`
  margin-top: 100px;
  font-weight: 800;
  font-size: 40px;
  color: ${palette.black[1]};
`;
