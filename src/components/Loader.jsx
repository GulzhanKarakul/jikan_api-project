import React from "react";
import styled, { keyframes } from "styled-components";

export default function Loader () {
    return (
        <LoaderContainer>
        <div></div>
        <div></div>
        <div></div>
      </LoaderContainer>
    )
};


const bounceAnimation = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  height: 500px;
  margin-top: 200px;
  div {
    width: 20px;
    height: 20px;
    margin: 0 5px;
    background-color: red;
    border-radius: 50%;
    animation: ${bounceAnimation} 1.4s infinite ease-in-out;
    display: inline-block;
  }

  div:nth-child(2) {
    animation-delay: -0.7s;
  }

  div:nth-child(3) {
    animation-delay: -0.4s;
  }
`;