import React, {useEffect, useState} from 'react';
import Title from "../components/Title.jsx";
import Slider from "../components/Slider.jsx";
import qr from "../assets/img/sample_qr.png";
import {useLocation} from "react-router";
import axios from "axios";

const CharMake9 = () => {
    const location = useLocation();
    const state = location.state || {};
    console.log("9",state)
  const [btnActive, setBtnActive] = useState(false);
  const [qrImg, setQrImg] = useState("");
  const [slideList,setSideList] =useState( [
      { name: " 리아와 친구들은 도서관에서 빛나는 책을 발견했어요. 호기심에 책을 펼친 순간 황금빛 글자들이 반짝이면서 속삭였어요. “세계를 푸르게 되돌리고 싶은 자여.....” 아이들은 책을 둘러싸고 읽기 시작했어요. 각 페이지마다 동물들과 자연의 이야기가 그려져 있었어요. “옛날에는 지구가 푸른색이라는 말이 거짓이 아니었어!” 책의 마지막 장에는 ‘마법의 씨앗을 찾으면 지구를 되돌릴 수 있다’는 이야기가 적혀있었어요.", imgName: "japanese_style.png" },
      { name: " 리아와 친구들은 도서관에서 빛나는 책을 발견했어요. 호기심에 책을 펼친 순간 황금빛 글자들이 반짝이면서 속삭였어요. “세계를 푸르게 되돌리고 싶은 자여.....” 아이들은 책을 둘러싸고 읽기 시작했어요. 각 페이지마다 동물들과 자연의 이야기가 그려져 있었어요. “옛날에는 지구가 푸른색이라는 말이 거짓이 아니었어!” 책의 마지막 장에는 ‘마법의 씨앗을 찾으면 지구를 되돌릴 수 있다’는 이야기가 적혀있었어요.", imgName: "japanese_style.png" },
  ]);
  useEffect(() => {
  //     state 책 보여주기
      preProcess()
  },[])
    const preProcess= async ()=>{
      console.log(state.detail)
        setQrImg(state.detail.qr_code_url)
        let storyList=[]
        for (const key in state.detail.story) {
            let data=state.detail.story;
            console.log("key:", key);               // key만 출력
            console.log("value:", data[key]);
            storyList.push({name:data[key][1],imgName:data[key][0]})// 값 출력
        }
        console.log(storyList)
        setSideList(storyList)
    }
    const printCard = async () => {
        let job="";
        state.slideList.forEach(element => {
            if(element.status){
                job=element.name;
            }
        })


      axios.post( "http://localhost:8080/user/book/print",{
          hope:job,
          name:state.name,
          charc_link:state.charInfo.img_url,
          qr_link: "https://d2vhx1n0375jku.cloudfront.net/pdfs/"+state.detail.book_no+"/프로키즈북.pdf"
      },{
          withCredentials: true,
          headers: {
              Authorization: `Bearer ${state.token}`,
              "Content-Type": "application/json"
          }
      })
    }

  return (
    <div className="make-finished">
      <Title titleText="제작 완료" percents={100} />
      <h3>나만의 동화가 완성됐어요!</h3>
      <Slider
        className={"fairytale-reader"}
        slideList={slideList}
        navigation={true}
        spaceBetween={0}
        slidesPerView={1}
        height={530}
        type={"bookReader"}
      />
      <div className="btn-wrap">
        <button onClick={printCard} className={`btn print ${!btnActive ? "" : "disabled"}`}>프린트하기</button>
      </div>
      <div className="qr-wrap">
        <p>동화 다운로드 QR</p>
        <div className="qr">
          <img src={`data:image/png;base64,${qrImg}`} alt="" />
        </div>
        <span>QR코드를 스캔하면,<br />나만의 동화를 볼 수 있어요!</span>
      </div>
    </div>
  )
}

export default CharMake9
