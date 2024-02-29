import React, { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import styled from 'styled-components'
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const handlerSignIn = async () => {
        try {
            const {email, password} = formValues;
            // Попытка создания пользователя с использованием Firebase Authentication
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch(error) {
            console.log(error); 
        }
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) navigate("/"); 
    })

    return (
        <Container showPassword={showPassword}>
            <BackgroundImage />
            <div className="content">

                <Header login /> 
                <div className="body flex column a-center j-center">
                    <div className="text flex column">
                        <h1>Любое аниме на ваш вкус</h1>
                        <h4>Выбирайте, что смотреть, где угодно</h4>
                        <h6>Зарегистрируйтесь и сохраняйте свои любимые аниме</h6>
                    </div>
                    <div className="form">

                        <input 
                            type="email" 
                            placeholder="Адрес электронной почты" 
                            name="email" 
                            value={formValues.email} 
                            onChange={(event) =>
                                setFormValues({ 
                                    ...formValues,
                                    [event.target.name]: event.target.value
                                })
                            } 
                        />
                        
                        {showPassword && (
                            <input 
                                type="password" 
                                placeholder="Пароль"
                                name="password"
                                value={formValues.password} 
                                onChange={(event) =>
                                    setFormValues({ 
                                        ...formValues,
                                        [event.target.name]: event.target.value
                                    })
                                }  
                            />                        
                        )}
                        
                        {!showPassword && <button onClick={() => setShowPassword(true)}>Начать</button>}
                    </div>
                    
                    <button onClick={handlerSignIn}>Подписаться</button>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    .content {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-rows: 15vh 85vh;
        .body {
            gap: 1rem;
            text-align: center;
            font-size: 2rem;
            h1 {
                padding: 0 25rem;
            }
            .form {
                display: grid;
                grid-template-columns: ${({showPassword}) => showPassword ? "1fr 1fr" : "2fr 1fr"} ;
                width: 60%;
            }
            input {
                color: black;
                border: none;
                padding: 1.5rem;
                font-size: 1.2rem;
                border: 1px solid #000;
                &:focus {
                    outline: none;
                }
            }
            button {
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                font-weight: bolder;
                font-size: 1.05rem;
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
    }
`;
