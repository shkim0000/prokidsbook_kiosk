import React, { useState } from 'react';
import Title from "../components/Title.jsx";
import { Link } from "react-router";
import Slider from "../components/Slider.jsx";

const CharMake7 = () => {
  const [btnActive, setBtnActive] = useState(false);
  const slideList = [
    { name: "선생님", status: false },
    { name: "경찰관", status: false },
    { name: "의사", status: false },
    { name: "간호사", status: false },
    { name: "약사", status: false },
    { name: "판사", status: false },
    { name: "변호사", status: false },
    { name: "과학자", status: false },
    { name: "연예인", status: false },
    { name: "디자이너", status: false },
    { name: "화가", status: false },
    { name: "만화가", status: false },
    { name: "작곡가", status: false },
    { name: "요리사", status: false },
  ];

  return (
    <div className="dream-select">
      <Title titleText="동화 만들기" percents={100} />
      <h3>장래희망이 무엇인가요?</h3>
      <Slider
        className={"dream-slider"}
        slideList={slideList}
        spaceBetween={30}
        slidesPerView={"auto"}
        height={740}
        type={"multi"}
        setBtnActive={setBtnActive}
      />
      <div className="input-change">
        <p>원하는 직업이 없나요?</p>
        <Link to={"/char-make7_2"} className="btn">직접 입력하기</Link>
      </div>
      <div className="btn-wrap">
        <Link to={"/char-make8"} className={`btn contained ${btnActive ? "" : "disabled"}`}>동화 만들러 가기</Link>
      </div>
    </div>
  )
}

export default CharMake7
