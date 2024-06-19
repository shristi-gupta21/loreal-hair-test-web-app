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
      <div className="text-white flex text-xl items-end justify-end w-full gap-0.5 mr-4 pb-4 font-medium">
        <img src="../images/home.png" className="" alt="home" />
        <span>Home</span>
      </div>
      <div className="z-20 relative">
        <img src="../images/frame.png" className="z-30 h-[43rem]" alt="frame" />
        <div className="absolute h-4/5 top-1 w-[calc(100%-2rem)] z-20">
          <video ref={videoRef} autoPlay playsInline />
        </div>
      </div>
      <div className="absolute w-full z-0 -left-[70%] flex flex-col gap-8">
        <div className=" relative">
          <button
            onClick={startCamera}
            className="text-pink-500 w-fit text-4xl bg-white font-bold py-2 px-4 rounded-tl-3xl rounded-br-3xl "
          >
            CAPTURE
          </button>
          <div className=" absolute bottom-0.5 bg-white w-[73%] h-1 "></div>
        </div>
        <div className=" relative">
          <button
            onClick={retakeVideo}
            className="text-pink-500 w-fit text-4xl bg-white font-bold py-2 px-4 rounded-tl-3xl rounded-br-3xl "
          >
            RETAKE
          </button>
          <div className=" absolute bottom-0.5 bg-white w-[73%]  h-1 "></div>
        </div>
        <div className=" relative">
          <button
            type="button"
            className="text-pink-500 w-fit text-4xl bg-white font-bold py-2 px-4 rounded-tl-3xl rounded-br-3xl "
          >
            POST
          </button>
          <div className=" absolute bottom-0.5 bg-white w-[73%]  h-1 "></div>
        </div>
        <div className=" relative">
          <button
            onClick={saveImage}
            className="text-pink-500 w-fit text-4xl bg-white font-bold py-2 px-4 rounded-tl-3xl rounded-br-3xl "
          >
            SAVE
          </button>
          <div className=" absolute bottom-0.5 bg-white w-[73%]  h-1 "></div>
        </div>
      </div>
      <div className="absolute w-full z-0 -right-[98%] flex flex-col gap-[5.5rem] top-[34%]">
        <div className="  bg-white w-[60%] h-1 "></div>
        <div className=" bg-white w-[73%]  h-1 "></div>
        <div className="  bg-white w-[73%]  h-1 "></div>
        <div className=" bg-white w-[73%]  h-1 "></div>
      </div>
    </div>
  );
};

export default Frame;
