import React from 'react';
import Title from "../components/Title.jsx";
import { Link } from "react-router";

const CharMake4 = () => {

  return (
    <div className="capture-confirm">
      <Title titleText="캐릭터 만들기" percents={60} />
      <h3>아래 사진으로 캐릭터가 만들어져요!<br />얼굴이 잘 나왔는지 확인해 주세요.</h3>
      <div className="confirm-box">
        <div className="confirm-face"></div>
        <Link to={"/char-make3"} className="icon reset">다시 촬영하기</Link>
      </div>
      <div className="btn-wrap">
        <Link to={"/char-make5"} className="btn contained">다음</Link>
      </div>
    </div>
  )
}

export default CharMake4
