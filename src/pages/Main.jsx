import React, {useEffect, useState} from 'react';
import logo from '../assets/img/logo.svg';
import card from '../assets/img/card.png';
import { Link } from "react-router";
import Title from "../components/Title.jsx";
import Slider from "../components/Slider.jsx";
import axios from "axios";
import {signInAnonymously} from "firebase/auth";
import {auth} from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore 인스턴스
const Main = () => {
    const [btnActive, setBtnActive] = useState(false);
    function generateRandomString(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    const [token,setToken]=useState();
    const [nickname,setNickname]=useState();
    const preProcess= async ()=>{
       let uid= await  loginAnonymously();
       console.log(uid,"uid")
        let tmpToken=await getIdTokenAfterAnonymousLogin()
        setToken(tmpToken)
        let tmpNickname=generateRandomString();



        const profileMake= await axios.post( import.meta.env.VITE_API_URL+"/api/user/profile/update",{
            age:16,
            nickname:tmpNickname,
        },{
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${tmpToken}`,
                "Content-Type": "application/json"
            }
        })
        setNickname(tmpNickname)
        setBtnActive(true)
    }
    useEffect(()=>{
        preProcess()
    },[])
    async function getIdTokenAfterAnonymousLogin() {
        // 익명 로그인 먼저 수행
        const user = auth.currentUser;
        if (user) {
            const idToken = await user.getIdToken(true);
            console.log("익명 로그인 후 ID 토큰:", idToken);
            return idToken;
        } else {
            console.log("사용자가 로그인되어 있지 않습니다.");
        }
    }
    async function loginAnonymously() {
        try {
            const userCredential = await signInAnonymously(auth);
            const user = userCredential.user;

            console.log(userCredential)
            return user.uid;
        } catch (error) {
            console.error("익명 로그인 실패:", error);
        }
    }
  return (
    <div className="kiosk-main">
      <div className="logo">
        <img src={`${logo}`} alt=""/>
      </div>
      <h1>나를 닮은 캐릭터와 함께<br />꿈을 그리는 동화 속 세상으로!</h1>
      <div className="card">
        <img src={`${card}`} alt=""/>
      </div>
      <div className="btn-wrap">
        <Link to={"/char-make"}  state={{token:token,nickname:nickname}} className={`btn contained ${btnActive ? "" : "disabled"}`} >나만의 AI 꿈 사원증 만들기</Link>
      </div>
    </div>
  )
}

export default Main
