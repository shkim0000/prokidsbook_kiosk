import React, {useEffect, useRef, useState} from 'react';
import face from '../assets/img/face.svg';
import {useLocation} from "react-router";

const CharMake3 = () => {

  const capture = () => {
    window.location.href = "/char-make4";
  }
    const location = useLocation();
    const state = location.state || {};
    console.log("3",state)
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    useEffect(() => {
        // 웹캠 시작
        async function startWebcam() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            } catch (err) {
                console.error("웹캠 접근 실패:", err);
            }
        }

        startWebcam();

        // 컴포넌트 언마운트 시 스트림 정지
        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // 사진 찍기
    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // 캔버스 크기 비디오 크기에 맞춤
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        // 비디오 현재 프레임을 캔버스에 그림
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 얼굴 모양 이미지 오버레이 (원하는 위치와 크기로 조절 가능)
        const overlayImg = new Image();
        overlayImg.src = "/face-overlay.png"; // public 폴더에 이미지 위치

        overlayImg.onload = () => {
            // 예: 화면 가운데에 얼굴 모양 이미지 크기 150x150 픽셀로 오버레이
            const x = (canvas.width - 150) / 2;
            const y = (canvas.height - 150) / 2;
            ctx.drawImage(overlayImg, x, y, 150, 150);

            // 캡처된 이미지 dataURL 얻기
            const dataUrl = canvas.toDataURL("image/png");
            setCapturedImage(dataUrl);
        };
    };
  return (
      <div className="camera-wrap">
          <p className="camera-info">정면 얼굴이 잘 나오게 촬영해 주세요</p>

          <div
              style={{
                  position: "relative",
                  width: "952px",
                  height: "1535px",
                  overflow: "hidden",
                  backgroundColor: "transparent", // 배경 검정 없앰
              }}
          >
              {/* 웹캠 비디오 */}
              <video
                  ref={videoRef}
                  style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // 꽉 채우면서 비율 유지 (일부 잘림 발생)
                      objectPosition: "center center", // 영상 중심 기준으로 위치 조정
                      zIndex: 1,
                  }}
                  muted
                  playsInline
                  autoPlay
              />
              {/* 얼굴 모양 이미지 오버레이 */}
              <img
                  src={`${face}`}
                  alt="face overlay"
                  style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 150,
                      height: 150,
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                      userSelect: "none",
                      opacity: 0.7,
                      zIndex: 2,
                  }}
                  draggable={false}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>

          <div className="capture-area">
              <button className="icon camera" onClick={capture} />
          </div>
      </div>
  )
}

export default CharMake3
