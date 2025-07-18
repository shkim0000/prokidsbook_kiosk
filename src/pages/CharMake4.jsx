import React, {useEffect, useState} from 'react';
import Title from "../components/Title.jsx";
import {Link, useLocation, useNavigate} from "react-router";
import alert from "../assets/img/icon_alert.svg";
import axios from "axios";
import {auth, getToken, messaging} from "../firebase.js";
import { signInAnonymously } from "firebase/auth";

const CharMake4 = () => {
    const location = useLocation();
    const state = location.state || {};
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupOpen2, setPopupOpen2] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log("4",state)
    const navigate = useNavigate();

    const checkImage= async ()=>{
        setLoading(true);
        try {
            let timeStamp=Math.floor(Date.now() / 1000).toString();
            const response = await axios.post('https://oyvlktmnpl.execute-api.ap-northeast-2.amazonaws.com/dev/character/image/check', {
                image: state.myImg.replace("data:image/png;base64,", ""),
                time_stamp: timeStamp,
            },{
                headers: {
                    Authorization: `Bearer ${state.token}`,
                    authorizer: `Bearer ${state.token}`,
                    "Content-Type": "application/json"
                }
            });


            navigate("/char-make5", {
                state: {style:state.style,gender:state.gender,myImg:state.myImg,nickname:state.nickname,token:state.token,timeStamp:timeStamp}
            });
            console.log("서버 응답:", response.data);
        } catch (error) {
            if(error.response){
                let status = error.response.status;
                 if(status===401){
                    setPopupOpen2(true)
                }else{
                     setPopupOpen(true)
                 }
            }

        }

        setLoading(false)
    }
  return (
    <>
      <div className="capture-confirm">
        <Title titleText="캐릭터 만들기" percents={60} />
        <h3>아래 사진으로 캐릭터가 만들어져요!<br />얼굴이 잘 나왔는지 확인해 주세요.</h3>
        <div className="confirm-box">
          <div className="confirm-face"><img src={state.myImg} /></div>
          <Link to={"/char-make3"} state={{style:state.style,gender:state.gender}} className="icon reset">다시 촬영하기</Link>
        </div>
        <div className="btn-wrap">
            <button className="btn contained" onClick={checkImage}>다음</button>
          {/*<Link to={"/char-make5"} state={{style:state.style,gender:state.gender,myImg:state.myImg}} className="btn contained">다음</Link>*/}
        </div>
      </div>
      <div className={`popup ${popupOpen ? "active" : ""}`}>
        <div className="box">
          <img src={`${alert}`} alt="" />
          <h3>사진을 다시 찍어주세요.</h3>
          <p>촬영 가이드선에 맞추어<br /> 정면 얼굴이 잘 나오게 촬영해주세요.</p>
          <div className="btn-wrap">
            <button className="btn contained" onClick={() => setPopupOpen(false)}>확인</button>
          </div>
        </div>
      </div>
        <div className={`popup ${popupOpen2 ? "active" : ""}`}>
            <div className="box">
                <img src={`${alert}`} alt="" />
                <h3>인터넷 연결을 확인해주세요.</h3>
                <p>사진찍기를 다시 시도해주세요. 메인 화면으로 돌아갑니다</p>
                <div className="btn-wrap">
                    <button className="btn contained" onClick={() => {
                        setPopupOpen2(false);
                        window.location.href="http://localhost:5173"
                    }}>확인</button>
                </div>
            </div>
        </div>
        <div className={`loading-progress ${loading ? "active" : ""}`}>
            <div></div>
        </div>
    </>
  )
}

export default CharMake4
