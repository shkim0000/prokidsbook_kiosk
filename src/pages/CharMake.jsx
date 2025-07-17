import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Title from "../components/Title.jsx";
import Slider from "../components/Slider.jsx";
import {Link, useLocation} from "react-router";


const CharMake = () => {

    // 방법 2: useMemo 사용 (만약 slideList가 동적으로 변해야 한다면)
    const slideList = useMemo(() => [
      { name: "일본 애니메이션 스타일", imgName: "japanese_style.png", value: "japanese" },
      { name: "3D 스타일", imgName: "3d_style.png", value: "3d" },
      { name: "유화 스타일", imgName: "oil_painting_style.png", value: "oil" },
      { name: "빈티지 스타일", imgName: "vintage_style.png", value: "vintage" },
      { name: "픽셀아트 스타일", imgName: "pixelart_style.png", value: "pixel" },
    ], []);
    const location = useLocation();
    const state = location.state || {};
    console.log("1",state)
  const [activeIndex, setActiveIndex] = useState(0);
    const handleActiveIndexChange = useCallback((index) => {
        setActiveIndex(index);
    }, []);
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
        setActiveIndex={handleActiveIndexChange}
      />
      <div className="btn-wrap">
        <Link to={"/char-make2"} state={{style:slideList[activeIndex].value,token:state.token,nickname:state.nickname}} className="btn contained">다음</Link>
      </div>
    </div>
  )
}

export default CharMake
