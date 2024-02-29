import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from '../assets/home.jpg';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPopularAnime, getTopAnimeById } from '../store/animeSlice/fetchFunctions'
import AnimeList from "../components/AnimeList";
import Loader from "../components/Loader";
import NotAvailable from "../components/NotAvailable";

export default function Homepage() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const popularAnime = useSelector((state) => state.anime.popularAnime);
    const topAnime = useSelector((state) => state.anime.topAnime);
    

    useEffect(() => {
        if (!popularAnime.length) {
            const fetchData = async () => {
                try {
                    await dispatch(getTopAnimeById());
                    await dispatch(getPopularAnime());
                    setLoading(false);
                } catch (error) {
                    console.error("Ошибка при получении данных:", error);
                    setLoading(false);
                }
            };

            fetchData();
        } else {
            // Данные уже доступны, устанавливаем loading в false
            setLoading(false);
        }
    }, [dispatch, popularAnime]);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="hero">
                <img src={backgroundImage} alt="background" className="background-image" />
                <div className="container">
                    <div className="logo">
                        <h1>{`${topAnime?.title}/${topAnime?.title_japanese}`}</h1>
                    </div>
                    <div className="buttons flex">
                        <button
                            className="flex j-center a-center"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/player/${topAnime.mal_id}`);
                            }}
                        >
                            <FaPlay /> Play
                        </button>
                        <button
                            className="flex j-center a-center"
                            onClick={() => navigate(`/anime/${topAnime.mal_id}`)}
                        >
                            <AiOutlineInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : (
                popularAnime && popularAnime.length ? (
                    <AnimeList title={"Популярное аниме"} data={popularAnime} />
                ) : (
                    <NotAvailable />
                )
            )}
        </Container>
    )
}

const Container = styled.div`
    background-color: #000;
    margin-top: 7rem;
    .hero {
        position: relative;
        top: 0;
        .background-image {
            filter: brightness(60%);
        }
        img {
            height: 100vh;
            width: 100vw;
        }
        .container {
            position: absolute;
            bottom: 5rem;
            .logo {
                margin-left: 7rem;
                img {
                    width: 100%;
                    height: 100%;
                    margin-left: 5rem;
                }
            }
            .buttons {
                margin: 5rem;
                gap: 2rem;
                button {
                    font-size: 1.4rem;
                    gap: 1rem;
                    border-radius: 0.2rem;
                    padding: 0.5rem;
                    padding-left: 2rem;
                    padding-right: 2.4rem;
                    border: none;
                    cursor: pointer;
                    transition: 300ms ease-in-out;
                    &:hover {
                        opacity: 0.8;
                    }
                    &:nth-of-type(2) {
                        background-color: rgba(109, 109, 110, 0.7);
                        color: #fff;
                        svg {
                            font-size: 1.8rem;
                        }
                    }
                }
            }
        }
    }
`;
