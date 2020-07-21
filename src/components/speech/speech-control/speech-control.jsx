import React from "react";
import styled from "styled-components";

import * as micOn from "../../../textures/microphone.png";

const SVG = styled.svg`
  cursor: pointer;
  text:hover {
    cursor: pointer;
  }
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  position: absolute;
  opacity: 0.5;

  :hover {
    opacity: 1;
  }
`;

const ICON = styled.text`
  cursor: pointer;
  font-size: 25px;
`;

const CIRCLE = styled.circle`
  fill: lightblue;
`;

const SPeechControl = ({ start, TurnSpeech }) => {
  return (
    <SVG
      top={`${window.innerHeight - 180}px`}
      left="20px"
      height="44px"
      width="44px"
      onClick={() => TurnSpeech(!start)}
    >
      <CIRCLE cx="50%" cy="50%" r="22" />
      <ICON textAnchor="middle" x="50%" y="70%">
        {start ? "On" : "Off"}
      </ICON>
    </SVG>
  );
};

export default SPeechControl;
