import React from "react";
import BgImage from "../../components/BgImage";
import { ButtonBlock, TitleBlock } from "./styles";
import targetImg from "../../../../images/target512px.png";
import RightsComment from "../../components/RightsComment";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "../../modules/userSlice";

const Home = () => {
  /*
  const dispatch = useDispatch();
  const { mousedpi, gamedpi } = useSelector(({ user }) => ({
    mousedpi: user.mousedpi,
    gamedpi: user.gamedpi,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ key: name, value: value }));
  };
  */

  return (
    <>
      <BgImage />
      <TitleBlock>
        <h1>에임 양식장</h1>
        <img src={targetImg} />
      </TitleBlock>
      {/*
        <input
        name="mousedpi"
        value={mousedpi}
        placeholder="mousedpi"
        onChange={onChange}
      />
      <input
        name="gamedpi"
        value={gamedpi}
        placeholder="gamedpi"
        onChange={onChange}
      />
      */}
      <ButtonBlock>
        <div>
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login">
            <Button>로그인</Button>
          </Link>
        </div>
        <div>
          <span>처음 이용하시나요?</span>
          <Link to="/register/first">
            <Button pink>회원가입</Button>
          </Link>
        </div>
      </ButtonBlock>
      <RightsComment />
    </>
  );
};

export default Home;
