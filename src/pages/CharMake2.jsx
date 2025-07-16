import React, { useState } from 'react';
import Title from "../components/Title.jsx";
import { Link } from "react-router";

const CharMake2 = () => {
  const [btnActive, setBtnActive] = useState(false);

  return (
    <div className="char-make">
      <Title titleText="캐릭터 만들기" percents={40} />
      <h3>성별을 선택해 주세요.</h3>
      <div className="radio-wrap" style={{ height: 690 }}>
        <label onClick={() => setBtnActive(true)}>
          <input type="radio" name="sex" />
          <span>남자</span>
        </label>
        <label onClick={() => setBtnActive(true)}>
          <input type="radio" name="sex" />
          <span>여자</span>
        </label>
      </div>
      <div className="btn-wrap">
        <Link to={"/char-make3"} className={`btn contained ${btnActive ? "" : "disabled"}`}>다음</Link>
      </div>
    </div>
  )
}

export default CharMake2
