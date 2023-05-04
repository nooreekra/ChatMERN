import React from "react";
import { UserType } from "../pages/Chat";
import styled from "styled-components";
import Robot from "../assets/robot.gif"

type WelcomeType = {
  currentUser: UserType;
};

export default function Welcome({ currentUser }: WelcomeType) {
  return <Container>
    <img src={Robot} alt="Robot" />
    <h1>
        Welcome, <span>{currentUser.username}!</span>
    </h1>
    <h3>
        Please select a chat to Start Messaging.
    </h3>
  </Container>;
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 20rem;
    }
    span {
        color: #4e00ff;
    }
`