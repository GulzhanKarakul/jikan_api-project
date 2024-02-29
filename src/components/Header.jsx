import React from "react";
import styled from "styled-components";
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function Header(props) {
    const navigate = useNavigate();

    return (
        <Container className="flex a-center j-between">
            <div className="logo">
                <BsArrowLeft onClick={() => {
                            // navigate(-1) возвращает на предыдущую страницу
                            navigate(-1)
                            }} />
                <img src={logo} alt="logo" />
            </div>

            <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
                {props.login ? "Log In" : "Sign Up"}
            </button>
        </Container>
    )
}

const Container = styled.div`
    padding: 0 4rem;
    .logo {
        img{
            height: 5rem;
        }
        svg {
            font-size: 3rem;
            cursor: pointer;
            margin-right: 1rem;
        }
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
    }
`;