import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import SpeechControl from "./speech-control";

const Speech = ({ GetCommand }) => {
  const [start, SetStart] = useState(false);
  const { transcript, startListening, stopListening } = useSpeechRecognition();
  useEffect(() => {
    if (start) SpeechRecognition.startListening({ language: "en-US" });
    else {
      SpeechRecognition.stopListening();
    }
  }, [start]);

  useEffect(() => {
    if (transcript) {
      console.log(transcript);
      GetCommand(transcript);
      SetStart(false);
    }
  }, [transcript]);

  return <SpeechControl start={start} TurnSpeech={(value) => SetStart(value)} />;
};

export default Speech;
