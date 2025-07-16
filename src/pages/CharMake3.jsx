import React, {useEffect, useRef, useState} from 'react';
import face from '../assets/img/face.svg';
import {useLocation, useNavigate} from "react-router";

const CharMake3 = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const state = location.state || {};
    console.log("3",state)
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    useEffect(() => {
        async function startWebcam() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    // metadata 로딩 후 play
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play();
                    };
                }
            } catch (err) {
                console.error("웹캠 접근 실패:", err);
            }
        }

        startWebcam();

        return () => {
            // 언마운트 시 스트림 정지
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);
    // 사진 찍기
    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // ✔️ 실제 화면에 보이는 크기 기준으로 캔버스 설정
        const width = video.clientWidth;
        const height = video.clientHeight;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        // 👉 현재 보이는 영상 프레임을 그대로 복사
        ctx.drawImage(video, 0, 0, width, height);

        // 👉 얼굴 오버레이 이미지는 캡처에 포함하지 않음
        const dataUrl = canvas.toDataURL("image/png");
        setCapturedImage(dataUrl);
        navigate("/char-make4", {
            state: {style:state.style,gender:state.gender,myImg:dataUrl}
        });
    };
  return (

    <div className="camera-wrap" style={{overflow:"hidden"}}>

      <p className="camera-info">정면 얼굴이 잘 나오게 촬영해 주세요</p>
        <div style={{ position: "relative", width: "1080", height: "calc(100% - 160px)", display: "flex", justifyContent:"center", alignItems:"center" }}>
            {/* 웹캠 비디오 */}
            <video
                ref={videoRef}

                style={{  top: 0, left: 0,  objectFit: "cover" , width: "1080", height: "100%"}}
                muted
                playsInline
            />
            {/* 얼굴 모양 이미지 오버레이 (비디오 위) */}
            <img
                src={`${face}`}
                alt="face overlay"
                style={{
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    width: 563,
                    height: 664,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    userSelect: "none",
                    opacity: 1,
                }}
                draggable={false}
            />
            {/* 캔버스는 숨겨놓음 (캡처용) */}
            <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      <div className="capture-area">
        <button className="icon camera" onClick={capturePhoto} />
      </div>
    </div>
  )
}

export default CharMake3
