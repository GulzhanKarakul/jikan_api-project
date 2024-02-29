import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import styled from "styled-components";
import { IoPlayCircleSharp } from 'react-icons/io5';
import { BsCheck } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { clearCurrentAnime } from "../store/animeSlice/animeSlice";

export default React.memo(function Card ({ animeData, isLiked=false }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState(undefined);
    
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) setEmail(currentUser.email);
    });

    const addToList = async () => {
        try {
            await axios.post("http://localhost:5000/api/user/add", {
                email,
                data: {
                    mal_id: animeData.mal_id,
                    title_english: animeData.title_english,
                    images: { jpg : { large_image_url: animeData.images?.jpg.large_image_url }} ,
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Отменяем всплытие события для иконок
    const handleIconClick = (e) => {
        e.stopPropagation();
    };

    // Отменяем переход по ссылке при клике на карточку
    const handleCardClick = (e) => {
        e.preventDefault();
        navigate(`/anime/${animeData.mal_id}`);
    };

    // Отменяем переход по ссылке при клике на карточку
    // const handleCardClick = (e) => {
    //     e.preventDefault();
    //     navigate(`/anime/${animeData.mal_id}`);
    // };

    clearCurrentAnime();
    
    return (
        <Container 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img 
                src={animeData.images?.jpg.large_image_url} 
                alt={animeData.title_english} 
                onClick={handleCardClick}
            />
            {isHovered && (
                <div className="hover">
                    <div className="info-container flex column">
                        <h3 className="name" onClick={handleCardClick}>
                            {animeData.title_english}
                        </h3>
                        <div className="icons flex j-between">
                            <div className="controls flex">
                                <IoPlayCircleSharp 
                                    title="play" 
                                    onClick={() => navigate(`/player/${animeData.mal_id}`)}
                                />
                                {isLiked ? (
                                    <BsCheck 
                                        title="Remove From List" 
                                        onClick={handleIconClick}  // пример
                                    />
                                ) : (
                                    <AiOutlinePlus 
                                        title="Add to my List"
                                        onClick={addToList}
onMouseDown={handleIconClick}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
});

const Container = styled.div`
    position: relative;
    width: 230px;
    height: 330px;
    border-radius: 8px;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .hover {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: max-content;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding: 1rem;
        transform: translateY(100%);
        transition: transform 0.3s ease-in-out;

        .name {
        margin: 0;
        color: #fff;
        cursor: pointer;
        }

        .icons {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .controls {
            display: flex;
            gap: 1rem;
        }

        svg {
            font-size: 2rem;
            color: #fff;
            cursor: pointer;
            transition: color 0.3s ease-in-out;

            &:hover {
            color: #b8b8b8;
            }
        }
        }
    }

    &:hover .hover {
        transform: translateY(0);
    }
`;
