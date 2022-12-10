import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BgImage from "../../components/BgImage";
import RightsComment from "../../components/RightsComment";
import {
  AllCheckButton,
  CautionsBlock,
  PrecautionsWhiteBlock,
  StyledCheckButtonBlock,
} from "./styles";

const defaultCheckList = [
  {
    title: "적과의 교전을 제외하고 불필요한 격발을 자제해주세요.",
    description: ["➜ 분석에 필요하지 않은 정보가 들어오게 돼요."],
    isCheck: false,
  },
  {
    title: "샷건 총기류 사용은 자제해주세요.",
    description: ["➜ 샷건 등의 총기는 에임 향상에 전혀 도움이 되지 않아요."],
    isCheck: false,
  },
  {
    title:
      "분석에 필요한 정보의 양의 모두 채워질 때까지 종료 버튼은 비활성화 돼요.",
    description: [
      "➜ 정보 수집이 완료되면 바로 알려줄게요!",
      "➜ 더 정확한 계산을 원한다면 바로 멈추지 않고, 정보 수집을 더 진행할 수 있어요.",
    ],
    isCheck: false,
  },
];

const Precautions = () => {
  const [checkList, setCheckList] = useState(defaultCheckList);
  const [isAllCheck, setIsAllCheck] = useState(false);
  const history = useHistory();

  const onIsCheckClick = useCallback(
    (index) => {
      setCheckList((prev) => {
        const newItem = { ...prev[index], isCheck: !prev[index].isCheck };
        const newCheckList = [...prev];
        newCheckList[index] = newItem;
        return newCheckList;
      });
    },
    [setCheckList]
  );

  const onClickAllCheckButton = useCallback(() => {
    if (!isAllCheck) {
      return;
    }
    history.push("/main/first");
  }, [isAllCheck, history]);

  useEffect(() => {
    if (checkList.some((value) => value.isCheck === false)) {
      setIsAllCheck(false);
      return;
    }
    setIsAllCheck(true);
  }, [checkList, setIsAllCheck]);

  return (
    <>
      <BgImage />
      <PrecautionsWhiteBlock>
        <h1>주의사항</h1>
        <h5>※ 아래의 주의사항들을 반드시 숙지해주세요.</h5>
        <CautionsBlock>
          {checkList.map((v, index) => {
            return (
              <li key={index}>
                <StyledCheckButtonBlock isChecked={v.isCheck}>
                  <button
                    onClick={() => {
                      onIsCheckClick(index);
                    }}
                  />
                  <h2>{v.title}</h2>
                </StyledCheckButtonBlock>
                {v.description.map((des, i) => (
                  <span key={i}>{des}</span>
                ))}
              </li>
            );
          })}
        </CautionsBlock>
        <AllCheckButton isActive={isAllCheck} onClick={onClickAllCheckButton}>
          모두 확인
        </AllCheckButton>
      </PrecautionsWhiteBlock>
      <RightsComment />
    </>
  );
};

export default Precautions;
