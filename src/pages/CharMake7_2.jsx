import React, { useState } from 'react';
import Title from "../components/Title.jsx";
import { Link } from "react-router";
import Slider from "../components/Slider.jsx";

const CharMake7_2 = () => {
  const [btnActive, setBtnActive] = useState(false);

  const textInput = (e) => {
    const target = e.target.value;
    if(target === ""){
      setBtnActive(false);
    }else{
      setBtnActive(true);
    }
  }

  return (
    <div className="dream-select">
      <Title titleText="동화 만들기" percents={100} />
      <h3>장래희망이 무엇인가요?</h3>
      <div className="input-wrap" style={{ height: 820 }}>
        <label>
          <input type="text" placeholder="예시) 크리에이터" onInput={(e) => {textInput(e)}} />
        </label>
      </div>
      <div className="btn-wrap">
        <Link to={"/char-make8"} className={`btn contained ${btnActive ? "" : "disabled"}`}>동화 만들러 가기</Link>
      </div>
    </div>
  )
}

export default CharMake7_2
