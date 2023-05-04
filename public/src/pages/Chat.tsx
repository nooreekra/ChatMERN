import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

export type UserType = {
  email: string;
  username: string;
  avatarImage: string;
  isAvatarImageSet: boolean;
  password: string;
  _id: number;
};

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [currentChat, setCurrentChat] = useState<UserType>();
  const [isLoaded, setIsLoaded] = useState(false)
  
  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const user = localStorage.getItem("chat-app-user");
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(user));
      setIsLoaded(true)
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser, navigate]);
  
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container>
      <div className="container">
        {currentUser && (
          <>
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
            {
             (isLoaded && currentChat === undefined) ? <Welcome currentUser={currentUser} /> : currentChat && <ChatContainer currentChat={currentChat} />
            }
            
          </>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
