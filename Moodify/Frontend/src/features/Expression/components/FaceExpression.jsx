import { useEffect, useRef, useState } from "react";

import {
  initFaceLandmarker,
  startCamera,
  detectExpression
} from "../utils/utils.js";

export default function FaceExpression() {

  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Not detecting");
  const [detecting, setDetecting] = useState(false);


  useEffect(() => {
    initFaceLandmarker(faceLandmarkerRef, () => startCamera(videoRef));
  }, []);


  function handleDetect() {
    setDetecting(true);
    setExpression("Detecting...");

    detectExpression({
      videoRef,
      faceLandmarkerRef,
      detecting: true,
      setExpression
    });
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