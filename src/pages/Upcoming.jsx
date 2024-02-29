import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getUpcomingAnime } from '../store/animeSlice/fetchFunctions'
import AnimeList from "../components/AnimeList";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import Loader from "../components/Loader";

export default function Upcoming() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const genres = useSelector((state) => state.anime.genres);
    const upcomingAnime = useSelector((state) => state.anime.upcomingAnime);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (!upcomingAnime.length) {
            const fetchData = async () => {
                try {
                    await dispatch(getUpcomingAnime());
                    setLoading(false);
                } catch (error) {
                    console.error("Ошибка при получении данных:", error);
                    setLoading(false);
                }
            };

            fetchData();
        } else {
            setLoading(false);
        }
    }, [dispatch, upcomingAnime]);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <SelectGenre genres={genres} type="upcoming" />

            {loading ? (
               <Loader />
            ) : (
                upcomingAnime && upcomingAnime.length ? (
                    <AnimeList title={"Upcoming Anime"} data={upcomingAnime} />
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
