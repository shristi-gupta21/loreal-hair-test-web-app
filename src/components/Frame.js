import React, { useRef, useState, useEffect } from "react";

const Frame = () => {
  const videoRef = useRef(null);
  const [image, setImage] = useState("");

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };

  const retakeVideo = () => {
    setImage("");
    startCamera();
  };

  const saveImage = () => {
    const a = document.createElement("a");
    a.href = image;
    a.download = "capture.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center">
      <img src="../images/frame.png" className="z-30 h-[43rem]" alt="frame" />
      <div className="absolute h-4/5 top-1 w-[calc(100%-2rem)] z-20">
        <video ref={videoRef} autoPlay playsInline />
      </div>
      <div className="absolute w-full z-0 -left-[70%] flex flex-col gap-16">
        <div>
          <button
            onClick={startCamera}
            className="text-pink-500 w-fit text-4xl bg-white font-bold py-2 px-4 rounded-tl-xl rounded-br-xl "
          >
            CAPTURE
          </button>
        </div>
        <div>
          <button
            onClick={retakeVideo}
            className="text-pink-500 w-fit text-4xl bg-white font-bold py-2 px-4 rounded-tl-xl rounded-br-xl "
          >
            RETAKE
          </button>
        </div>
        <div>
          <button
            onClick={saveImage}
            className="text-pink-500 w-fit text-4xl bg-white font-bold py-2 px-4 rounded-tl-xl rounded-br-xl "
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Frame;
