import React from 'react';
import face from '../assets/img/face.svg';

const CharMake3 = () => {

  const capture = () => {
    window.location.href = "/char-make4";
  }

  return (
    <div className="camera-wrap">
      <p className="camera-info">정면 얼굴이 잘 나오게 촬영해 주세요</p>
      <div className="capture-area">
        <img src={`${face}`} className="face" alt="" />
        <button className="icon camera" onClick={capture} />
      </div>
    </div>
  )
}

export default CharMake3
