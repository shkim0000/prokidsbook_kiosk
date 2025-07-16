import React, { useState } from 'react';
import Title from "../components/Title.jsx";

const CharMake8 = () => {
  const [progressValue, setProgressValue] = useState(0);

  return (
    <div className="make-final">
      <Title titleText="동화 만들기" percents={100} />
      <div className="progress-bar" style={{ background: `conic-gradient(from 0deg, #28a8de ${progressValue}%, #d9d9d9 ${progressValue}%)` }}>
        <p><span>{progressValue}</span>%</p>
      </div>
      <h3>잠시만 기다려주세요..<br />곧 나만의 동화가 완성돼요!</h3>

      <div className="video-wrap">
        <video src={`https://d1cjvpjhgs30xs.cloudfront.net/seocho.mp4`} autoPlay loop muted />
      </div>
    </div>
  )
}

export default CharMake8
