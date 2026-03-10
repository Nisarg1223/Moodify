import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceExpression() {

  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Not detecting");
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
      },
      runningMode: "VIDEO",
      outputFaceBlendshapes: true,
      numFaces: 1
    });

    faceLandmarkerRef.current = faceLandmarker;

    startCamera();
  }

  async function startCamera() {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      const video = videoRef.current;
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
      };

    } catch (err) {
      console.error("Camera error:", err);
    }

  }

  function detect() {

    const video = videoRef.current;
    const landmarker = faceLandmarkerRef.current;

    function frame() {

      if (!detecting) return;

      if (!video || !landmarker) {
        requestAnimationFrame(frame);
        return;
      }

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        requestAnimationFrame(frame);
        return;
      }

      const result = landmarker.detectForVideo(video, Date.now());

      if (result?.faceBlendshapes?.length > 0) {

        const expressions = result.faceBlendshapes[0].categories;

        const getScore = (name) =>
          expressions.find(e => e.categoryName === name)?.score || 0;

        const smile =
          getScore("mouthSmileLeft") + getScore("mouthSmileRight");

        const frown =
          getScore("mouthFrownLeft") + getScore("mouthFrownRight");

        const surprise =
          getScore("eyeWideLeft") +
          getScore("eyeWideRight") +
          getScore("jawOpen");

        if (smile > 0.6) {
          setExpression("😊 Smiling");
        }
        else if (frown > 0.002) {
          setExpression("😢 Sad");
        }
        else if (surprise > 0.9) {
          setExpression("😲 Surprise");
        }
        else {
          setExpression("😐 Neutral");
        }

      }

      requestAnimationFrame(frame);
    }

    frame();
  }

  function handleDetect() {
    setDetecting(true);
    setExpression("Detecting...");
    detect();
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>

      <h2>AI Face Expression Detector</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="640"
        height="480"
        style={{
          border: "3px solid black",
          borderRadius: "10px"
        }}
      />

      <h2 style={{ marginTop: "20px" }}>
        Expression: {expression}
      </h2>

      <button
        onClick={handleDetect}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "10px",
          cursor: "pointer"
        }}
      >
        Detect Expression
      </button>

    </div>
  );
}