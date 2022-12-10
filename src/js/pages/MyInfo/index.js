import React, { useCallback, useEffect, useState } from "react";
import { Header, StyledTitleBlock } from "../MainFirst/styles";
import {
  ChangeInfoButton,
  GoBackLinkBlock,
  ListItemBlock,
  LogoutButton,
  MyInfoBg,
  MyInfoTitleBlock,
  MyInfoTitleBox,
  MyInfoWhiteBlock,
} from "./styles";
import targetImg from "../../../../images/target512px.png";
import profileImg from "../../../../images/user.png";
import gunImg from "../../../../images/space-gun.png";
import palette from "../../lib/style";
import LogoutModal from "../../components/LogoutModal";
import CheckPasswordModal from "../../components/CheckPasswordModal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const MyInfo = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCheckPasswordModal, setShowCheckPasswordModal] = useState(false);
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const history = useHistory();

  const onClickCloseModal = useCallback(() => {
    setShowLogoutModal(false);
    setShowCheckPasswordModal(false);
  }, [setShowLogoutModal, setShowCheckPasswordModal]);

  return (
    <>
      <MyInfoBg />
      <Header>
        <StyledTitleBlock>
          <img src={targetImg} />
          <h1>에임 양식장</h1>
        </StyledTitleBlock>
        <GoBackLinkBlock
          onClick={() => {
            history.push("/main/first");
          }}
        >
          <span>뒤로가기</span>
        </GoBackLinkBlock>
      </Header>
      <MyInfoWhiteBlock>
        <img src={gunImg} />
        <ul>
          <ListItemBlock>
            <h4>닉네임</h4>
            <h1>{user.nickname}</h1>
          </ListItemBlock>
          <ListItemBlock>
            <h4>마우스 DPI</h4>
            <h1>{user.mousedpi}</h1>
          </ListItemBlock>
          <ListItemBlock>
            <h4>발로란트 인게임 감도</h4>
            <h1>{user.gamedpi}</h1>
          </ListItemBlock>
          <ListItemBlock>
            <h4>최근 감도 추천 내역</h4>
            <h1 style={{ color: `${palette.pink}` }}>
              {user.currentdpi === "" ? "없음" : user.currentdpi}
            </h1>
          </ListItemBlock>
        </ul>
        <ChangeInfoButton
          pink
          onClick={() => {
            setShowCheckPasswordModal(true);
          }}
        >
          정보 변경
        </ChangeInfoButton>
      </MyInfoWhiteBlock>
      <MyInfoTitleBlock>
        <MyInfoTitleBox>
          <span>내정보</span>
          <img src={profileImg} />
        </MyInfoTitleBox>
        <LogoutButton
          onClick={() => {
            setShowLogoutModal(true);
          }}
        >
          로그아웃
        </LogoutButton>
      </MyInfoTitleBlock>
      {showLogoutModal ? (
        <LogoutModal onClickCloseLogoutModal={onClickCloseModal} />
      ) : null}
      {showCheckPasswordModal ? (
        <CheckPasswordModal
          onClickCloseCheckPasswordModal={onClickCloseModal}
        />
      ) : null}
    </>
  );
};

export default MyInfo;
