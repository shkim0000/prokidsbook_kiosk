import React, { useState } from 'react';
import Title from "../components/Title.jsx";
import {Link, useLocation} from "react-router";
import alert from "../assets/img/icon_alert.svg";

const CharMake4 = () => {
    const location = useLocation();
    const state = location.state || {};
    const [popupOpen, setPopupOpen] = useState(false);
    console.log("4",state)
  return (
    <>
      <div className="capture-confirm">
        <Title titleText="캐릭터 만들기" percents={60} />
        <h3>아래 사진으로 캐릭터가 만들어져요!<br />얼굴이 잘 나왔는지 확인해 주세요.</h3>
        <div className="confirm-box">
          <div className="confirm-face"><img src={state.myImg} /></div>
          <Link to={"/char-make3"} className="icon reset">다시 촬영하기</Link>
        </div>
        <div className="btn-wrap">
          <Link to={"/char-make5"} className="btn contained">다음</Link>
        </div>
      </div>
      <div className={`popup ${popupOpen ? "active" : ""}`}>
        <div className="box">
          <img src={`${alert}`} alt="" />
          <h3>사진을 다시 찍어주세요.</h3>
          <p>촬영 가이드선에 맞추어<br /> 정면 열굴이 잘 나오게 촬영해주세요.</p>
          <div className="btn-wrap">
            <button className="btn contained" onClick={() => setPopupOpen(false)}>확인</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharMake4
