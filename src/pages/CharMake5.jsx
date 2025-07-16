import React, { useState } from 'react';
import Title from "../components/Title.jsx";
import { Link } from "react-router";

const CharMake5 = () => {
  const [inputValue, setInputValue] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const textInput = (e) => {
    const target = e.target.value;
    setInputValue(target);

    if(target !== "" && progressValue === 100){
      setBtnActive(true);
    }else{
      setBtnActive(false);
    }
  };

  const textRemove = () => {
    setInputValue("");
    setBtnActive(false);
  };

  return (
    <div className="capture-confirm">
      <Title titleText="캐릭터 만들기" percents={80} />
      <h3>
        { progressValue !== 100 ?
          <>
            캐릭터를 만드는 동안<br />이름을 입력해 주세요.
          </> :
          <>
            캐릭터 생성이<br />완료 되었어요!
          </>
        }
      </h3>
      <div className="name-input">
        <div className="input-wrap">
          <label>
            <input type="text" placeholder="이름을 입력해주세요" value={inputValue} onChange={(e) => textInput(e)} />
            <button className="icon remove" onClick={textRemove} />
          </label>
          <p>0/3</p>
        </div>
        <div className="progress-bar">
          <span style={{ width: `${progressValue}%` }}></span>
        </div>
        <div className="video-wrap">
          <video src={`https://d1cjvpjhgs30xs.cloudfront.net/seocho.mp4`} autoPlay loop muted />
        </div>
      </div>
      <div className="btn-wrap">
        <Link to={"/char-make6"} className={`btn contained ${btnActive ? "" : "disabled"}`}>다음</Link>
      </div>
    </div>
  )
}

export default CharMake5
