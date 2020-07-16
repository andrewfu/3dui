import React from "react";
import styled from "styled-components";

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
  font-family: "Font Awesome 5 Free";
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
      height="40px"
      width="40px"
      onClick={() => TurnSpeech(!start)}
    >
      <CIRCLE cx="50%" cy="50%" r="20" />
      <ICON textAnchor="middle" x="50%" y="70%">
        {start ? unescape(`%uf130`) : unescape(`%uf131`)}
      </ICON>
    </SVG>
  );
};

export default SPeechControl;
