import React, {useEffect, useState} from 'react';
import Title from "../components/Title.jsx";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";

const CharMake8 = () => {
  const [progressValue, setProgressValue] = useState(0);
    const [btnActive, setBtnActive] = useState(false);
    const [moveCount, setMoveCount] = useState(3);
    const [bookno,setBookno]=useState("")
    const location = useLocation();
    const state = location.state || {};
    console.log("8",state)
    const [printComplete, setPrintComplete] = useState(false);
    const navigate = useNavigate();
    const preProcess= async ()=>{
        console.log("pre in")
        let job="";
        state.slideList.forEach(element => {
            if(element.status){
                job=element.name;
            }
        })
        const response = await axios.post(import.meta.env.VITE_API_URL+'/api/user/book/create', {
                "mode": null,
                "theme": {
                    "major": "직업 체험",
                    "middle": job,
                    "sub": job
                },
                "background": null,
                "charc_no": state.charInfo.charc_no,
                "character_datetime": 0,
                "character_type": "0",
                "name": state.name,
                "age": "16",
                "ver": "",
                "source_type": "user"
            }
            ,{
            headers: {
                Authorization: `Bearer ${state.token}`,
                authorizer: `Bearer ${state.token}`,
                "Content-Type": "application/json"
            }
        });
        setBookno(response.data.book_no)
        interval = setInterval(() => {

            chkCharc(response.data.book_no); // 여기에 실행할 함수 넣기
        }, 3000); // 10000ms = 10초
    }
    let interval;
    let count=0;
    const chkCharc= async (data)=>{
        try{
            const img=  await axios.get( import.meta.env.VITE_API_URL+"/api/user/book?book_no="+data+"&ver=",{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${state.token}`,
                    "Content-Type": "application/json"
                }
            })
            if(img.data.book !== null){
                clearInterval(interval)
                // 캐릭터 생성 완료
                setProgressValue(100)
                const response = await axios.post(import.meta.env.VITE_API_URL+'/api/user/book/detail', {
                        "request_user_id": img.data.book.user_id,
                        "spc_cd": img.data.book.spc_cd,
                        "book_no": img.data.book.book_no,
                        "ver": "",
                        "book_type": "share_book"
                    }
                    ,{
                        headers: {
                            Authorization: `Bearer ${state.token}`,
                            authorizer: `Bearer ${state.token}`,
                            "Content-Type": "application/json"
                        }
                    });
                console.log(response.data)
                navigate("/char-make9", {
                    state: {book:img.data,detail:response.data,style:state.style,gender:state.gender,myImg:state.myImg,name:state.name,charcImg:state.charcImg,selImg:state.selImg,slideList:state.slideList,charInfo:state.charInfo,token:state.token}
                });



            }else{
                count+=1;
                if(count>=100)count=99;
                setProgressValue(count)
            }



        }catch (e){
            console.log(e)
        }

    }
    const [hasInitialized, setHasInitialized] = useState(false);
    const printCard = async () => {
        let password=prompt("관리자 비밀번호 입력");
        if(password!=="0630")return;
        setBtnActive(true);
        let job="";
        state.slideList.forEach(element => {
            if(element.status){
                job=element.name;
            }
        })

        await axios.post( "http://localhost:8080/kiosk/user/book/print",{
            hope:job,
            name:state.name,
            charc_link:state.charInfo.img_url,
            qr_link: "https://d2vhx1n0375jku.cloudfront.net/pdfs/"+bookno+"/프로키즈북.pdf"
        },{
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${state.token}`,
                "Content-Type": "application/json"
            }
        })

        setBtnActive(false);


    }


    useEffect(() => {
        if (!hasInitialized) {
            setHasInitialized(true);
            console.log("pre before")
            preProcess();
        }
    }, [hasInitialized]);
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
        <div style={{margin:20}} className="btn-wrap">

                <>
                    <button onClick={printCard} className={`btn print ${bookno!=="" ? "" : "disabled"} ${!btnActive ? "" : "disabled"}`}>
                        {!btnActive ? "관리자 버튼" : "인쇄 중입니다..."}
                    </button>
                </>

        </div>
    </div>
  )
}

export default CharMake8
