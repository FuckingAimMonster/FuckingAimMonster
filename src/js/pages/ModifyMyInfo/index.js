import React, { useCallback, useEffect, useState } from "react";
import palette from "../../lib/style";
import { Header, StyledTitleBlock } from "../MainFirst/styles";
import {
  GoBackLinkBlock,
  MyInfoBg,
  MyInfoTitleBlock,
  MyInfoTitleBox,
  MyInfoWhiteBlock,
} from "../MyInfo/styles";
import targetImg from "../../../../images/target512px.png";
import profileImg from "../../../../images/user.png";
import gunImg from "../../../../images/space-gun.png";
import {
  InfoInput,
  ModifyMyInfoButton,
  ModifyMyInfoButtonBlock,
  StyledListItemBlock,
} from "./styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initialize, updateUser } from "../../modules/userSlice";

const ModifyMyInfo = () => {
  const [nicknameInputError, setNicknameInputError] = useState("");
  const [mouseDpiInputError, setMouseDpiInputError] = useState("");
  const [valoDpiInputError, setValoDpiInputError] = useState("");
  const { nickname, mousedpi, gamedpi, user } = useSelector(({ user }) => ({
    nickname: user.nickname,
    mousedpi: user.mousedpi,
    gamedpi: user.gamedpi,
    user: user.user,
  }));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(changeField({ key: "nickname", value: user.nickname }));
    dispatch(changeField({ key: "mousedpi", value: user.mousedpi }));
    dispatch(changeField({ key: "gamedpi", value: user.gamedpi }));
  }, [dispatch]);

  const changeNickname = (e) => {
    dispatch(changeField({ key: e.target.name, value: e.target.value }));
  };

  const changeDpi = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    dispatch(changeField({ key: e.target.name, value: value }));
  };

  const onClickCancelModify = useCallback(() => {
    dispatch(initialize());
    history.push("/myinfo");
  }, [dispatch, history]);

  const onClickConfirmModify = () => {
    //정보 검사 후 myinfo로 이동.
    setNicknameInputError("");
    setMouseDpiInputError("");
    setValoDpiInputError("");
    if (nickname === "") {
      setNicknameInputError("닉네임을 입력해주세요!");
      return;
    }
    if (mousedpi === "") {
      setMouseDpiInputError("DPI를 입력해주세요!");
      return;
    }
    if (gamedpi === "") {
      setValoDpiInputError("인게임 감도를 입력해주세요!");
      return;
    }

    const newUser = {
      ...user,
      nickname: nickname,
      mousedpi: mousedpi,
      gamedpi: gamedpi,
    };
    dispatch(updateUser(newUser));
    dispatch(initialize());
    history.push("/myinfo");
  };

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
            history.goBack();
          }}
        >
          <span>뒤로가기</span>
        </GoBackLinkBlock>
      </Header>
      <MyInfoWhiteBlock>
        <img src={gunImg} />
        <ul>
          <StyledListItemBlock>
            <h4>닉네임</h4>
            <InfoInput
              name="nickname"
              value={nickname}
              onChange={changeNickname}
            />
            <span>{nicknameInputError}</span>
          </StyledListItemBlock>
          <StyledListItemBlock>
            <h4>마우스 DPI</h4>
            <InfoInput name="mousedpi" value={mousedpi} onChange={changeDpi} />
            <span>{mouseDpiInputError}</span>
          </StyledListItemBlock>
          <StyledListItemBlock>
            <h4>발로란트 인게임 감도</h4>
            <InfoInput name="gamedpi" value={gamedpi} onChange={changeDpi} />
            <span>{valoDpiInputError}</span>
          </StyledListItemBlock>
          <StyledListItemBlock>
            <h4>최근 감도 추천 내역</h4>
            <h1 style={{ color: `${palette.pink}` }}>
              {user.currentdpi === "" ? "없음" : user.currentdpi}
            </h1>
          </StyledListItemBlock>
        </ul>
        <ModifyMyInfoButtonBlock>
          <ModifyMyInfoButton onClick={onClickCancelModify}>
            취 소
          </ModifyMyInfoButton>
          <ModifyMyInfoButton pink onClick={onClickConfirmModify}>
            확 인
          </ModifyMyInfoButton>
        </ModifyMyInfoButtonBlock>
      </MyInfoWhiteBlock>
      <MyInfoTitleBlock>
        <MyInfoTitleBox>
          <span>내정보</span>
          <img src={profileImg} />
        </MyInfoTitleBox>
      </MyInfoTitleBlock>
    </>
  );
};

export default ModifyMyInfo;
