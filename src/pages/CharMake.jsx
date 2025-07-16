import React, { useState } from 'react';
import Title from "../components/Title.jsx";
import Slider from "../components/Slider.jsx";
import { Link } from "react-router";

const CharMake = () => {
  const slideList = [
    { name: "일본 애니메이션 스타일", imgName: "japanese_style.png" },
    { name: "3D 스타일", imgName: "3d_style.png" },
    { name: "유화 스타일", imgName: "oil_painting_style.png" },
    { name: "빈티지 스타일", imgName: "vintage_style.png" },
    { name: "픽셀아트 스타일", imgName: "pixelart_style.png" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  console.log("ASdas", slideList[activeIndex])
  return (
    <div className="char-make">
      <Title titleText="캐릭터 만들기" percents={20} />
      <h3>그림 스타일을 선택해 주세요.</h3>
      <Slider
        className={"charStyle-slider"}
        slideList={slideList}
        spaceBetween={80}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        height={690}
        setActiveIndex={setActiveIndex}
      />
      <p style={{fontSize: 40}}>{activeIndex}</p>
      <div className="btn-wrap">
        <Link to={"/char-make2"} className="btn contained">다음</Link>
      </div>
    </div>
  )
}

export default CharMake
