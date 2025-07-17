import React, {useEffect, useState} from 'react';
import Title from "../components/Title.jsx";
import {Link, useLocation} from "react-router";
import axios from "axios";

const CharMake5 = () => {
  const [inputValue, setInputValue] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [imgUrlList, setImgUrlList] = useState([]);
  const location = useLocation();
  const state = location.state || {};
  const textInput = (e) => {
    const target = e.target.value;
   
    if(e.target.value.length>3){
      return;
    }

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
  const preProcess= async ()=>{
    console.log("preprocess")
    interval = setInterval(() => {

      chkCharc(); // 여기에 실행할 함수 넣기
    }, 1000); // 10000ms = 10초

    await axios.post( import.meta.env.VITE_API_URL+"/api/user/charc/create",{
      gender:state.gender,
      style:state.style,
      time_stamp:state.timeStamp,
      ver:"",
    },{
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-Type": "application/json"
      }
    })

  }
  let count=0;
  const chkCharc= async ()=>{
    try{
    const img=  await axios.get( import.meta.env.VITE_API_URL+"/api/user/charc/first",{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json"
        }
      })

      clearInterval(interval)
      // 캐릭터 생성 완료
      setProgressValue(100)
setBtnActive(true)
      setImgUrlList(img.data.img_url)
    }catch (e){
      count+=1;
      if(count>=100)count=99;
      setProgressValue(count)
    }

  }
  let interval=null;
  useEffect(()=>{
    preProcess();


  },[])


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
          <p>{inputValue.length}/3</p>
        </div>
        <div className="progress-bar">
          <span style={{ width: `${progressValue}%` }}></span>
        </div>
        <div className="video-wrap">
          <video src={`https://d1cjvpjhgs30xs.cloudfront.net/seocho.mp4`} autoPlay loop muted />
        </div>
      </div>
      <div className="btn-wrap">
        <Link to={"/char-make6"} state={{style:state.style,gender:state.gender,myImg:state.myImg,name:inputValue,token:state.token,nickname:state.nickname,imgUrlList:imgUrlList}} className={`btn contained ${btnActive ? "" : "disabled"}`}>다음</Link>
      </div>
    </div>
  )
}

export default CharMake5
