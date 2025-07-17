import React, { useState } from 'react';
import Title from "../components/Title.jsx";
import {Link, useLocation} from "react-router";
import img1 from "../assets/img/charStyle/3d_style.png"

const CharMake6 = () => {
  const [btnActive, setBtnActive] = useState(false);
  const [radioChk, setRadioChk] = useState([false, false, false, false]);
  const [charcImg,setCharcImg]=useState(null);
  const [selImg,setSelImg]=useState(null);
  const location = useLocation();
  const state = location.state || {};
  console.log("6",state)
  const charSelect = (index) => {
    setCharcImg(index)
    setSelImg(state.imgUrlList[index])
    setBtnActive(true);
    for(let i = 0; i < radioChk.length; i++){
      if(i === index){
        setRadioChk(radioChk.map((item, idx) => {
          return idx !== index;
        }))
      }
    }
  }

  return (
    <div className="capture-confirm">
      <Title titleText="캐릭터 만들기" percents={100} />
      <h3>한가지 캐릭터를 선택해 주세요.</h3>
      <div className="char-select" style={{ height: 824 }}>
        <div className="radio-wrap">
          <label onClick={() => {charSelect(0)}} className={radioChk[0] ? "disabled" : ""}>
            <input type="radio" name="char" />
            <span />
            <img src={`${state.imgUrlList[0]}`} alt=""/>
          </label>
          <label onClick={() => {charSelect(1)}} className={radioChk[1] ? "disabled" : ""}>
            <input type="radio" name="char" />
            <span />
            <img src={`${state.imgUrlList[1]}`} alt=""/>
          </label>
          <label onClick={() => {charSelect(2)}} className={radioChk[2] ? "disabled" : ""}>
            <input type="radio" name="char" />
            <span />
            <img src={`${state.imgUrlList[2]}`} alt=""/>
          </label>
          <label onClick={() => {charSelect(3)}} className={radioChk[3] ? "disabled" : ""}>
            <input type="radio" name="char" />
            <span />
            <img src={`${state.imgUrlList[3]}`} alt=""/>
          </label>
        </div>
      </div>
      <div className="btn-wrap">
        <Link to={"/char-make7"} state={{style:state.style,gender:state.gender,myImg:state.myImg,name:state.name,charcImg:charcImg,selImg:selImg,token:state.token}}  className={`btn contained ${btnActive ? "" : "disabled"}`}>동화 만들러 가기</Link>
      </div>
    </div>
  )
}

export default CharMake6
