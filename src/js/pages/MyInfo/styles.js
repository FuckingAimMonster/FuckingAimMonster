import styled from "@emotion/styled";
import { Background } from "../../components/BgImage/styles";
import { StyledButton } from "../../components/Button/styles";
import palette from "../../lib/style";

export const GoBackLinkBlock = styled(StyledButton)`
  padding: 7px;
  width: 90px;
  height: 40px;
  border-radius: 16px;
  font-size: 20px;
  background-color: ${palette.gray[2]};
  margin-right: 12px;
`;

export const MyInfoBg = styled(Background)`
  top: 50px;
`;

export const MyInfoTitleBlock = styled.div`
  margin-top: 25px;
  margin-left: 50px;
  position: absolute;
`;

export const LogoutButton = styled(StyledButton)`
  padding: 5px;
  width: 120px;
  height: 50px;
  font-size: 26px;
  background-color: ${palette.gray[2]};
  border-radius: 14px;
  margin-left: 16px;
`;

export const MyInfoTitleBox = styled.div`
  display: flex;
  align-items: center;

  & span {
    font-size: 54px;
    font-weight: 800;
    line-height: 1.2;
  }

  & img {
    margin-left: 10px;
    width: 40px;
    height: 40px;
  }
`;

export const MyInfoWhiteBlock = styled.div`
  width: 540px;
  height: 730px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 14px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border-radius: 4px;
  z-index: 0;
  position: absolute;
  top: 140px;
  right: 60px;

  & img {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 40px;
    left: 40px;
  }

  & ul {
    list-style: none;
    text-align: right;
    padding: 0;
    margin: 0;
    margin-right: 50px;
  }
`;

export const ListItemBlock = styled.div`
  margin-top: 50px;

  & h1 {
    font-size: 48px;
    margin: 0;
  }

  & h4 {
    color: ${palette.black[0]};
    margin: 0;
    padding-right: 5px;
  }
`;

export const ChangeInfoButton = styled(StyledButton)`
  padding: 22px 12px;
  margin: 90px auto;
  display: block;
  font-size: 34px;
  border-radius: 12px;
`;
