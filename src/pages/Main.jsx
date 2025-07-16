import React from 'react';
import logo from '../assets/img/logo.svg';
import card from '../assets/img/card.png';
import { Link } from "react-router";

const Main = () => {
  return (
    <div className="kiosk-main">
      <div className="logo">
        <img src={`${logo}`} alt=""/>
      </div>
      <h1>나를 닮은 캐릭터와 함께<br />꿈을 그리는 동화 속 세상으로!</h1>
      <div className="card">
        <img src={`${card}`} alt=""/>
      </div>
      <div className="btn-wrap">
        <Link to={"/char-make"} className="btn contained">나만의 AI 꿈 사원증 만들기</Link>
      </div>
    </div>
  )
}

export default Main
