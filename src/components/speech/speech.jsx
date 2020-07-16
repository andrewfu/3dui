import React, { useState, useEffect } from "react";
import SpeechRecognition from "react-speech-recognition";
import SpeechControl from "./speech-control";

const Speech = ({ transcript, startListening, stopListening, GetCommand }) => {
  const [start, SetStart] = useState(false);
  useEffect(() => {
    if (start) startListening();
    else {
      stopListening();
    }
  }, [start]);

  useEffect(() => {
    setTimeout(() => {}, 1000);
    if (transcript) {
      console.log(transcript);
      if (Number.isInteger(parseInt(transcript))) {
        GetCommand(transcript);
        SetStart(false);
      }
    }
  }, [transcript]);

  return <SpeechControl start={start} TurnSpeech={(value) => SetStart(value)} />;
};

export default SpeechRecognition({ continuous: false })(Speech);
