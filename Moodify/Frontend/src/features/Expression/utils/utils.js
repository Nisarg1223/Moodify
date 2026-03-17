import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export async function initFaceLandmarker(faceLandmarkerRef, startCamera) {

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

export async function startCamera(videoRef) {

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

export function detectExpression({
  videoRef,
  faceLandmarkerRef,
  detectingRef,     
  setExpression
}) {

  const video = videoRef.current;
  const landmarker = faceLandmarkerRef.current;

  function frame() {

    if (!detectingRef.current) return;

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