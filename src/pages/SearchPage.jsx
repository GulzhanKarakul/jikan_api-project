import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import AnimeList from "../components/AnimeList";
import NotAvailable from "../components/NotAvailable";
import { searchAnime } from "../store/animeSlice/fetchFunctions";
import { setSearchingAnime } from "../store/animeSlice/animeSlice";


export default function Search() {
    const dispatch = useDispatch();
    const [isScrolled, setIsScrolled] = useState(false);
    const searchResults = useSelector((state) => state.anime.searchResults); 
    const searchingAnime = useSelector((state) => state.anime.searchingAnime);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    // Загрузка данных об аниме и персонажах при монтировании компонента
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(searchAnime(searchingAnime));
            } catch (error) {
                console.error("Error fetching airing anime:", error);
            }
        }
    
        fetchData();
    }, [searchingAnime,  dispatch]);

    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            {
                searchResults && searchResults.length ? (
                    <AnimeList title={"Результаты Поика"} data={searchResults} />
                ) : (
                    <NotAvailable />
                )
            }
        </Container>
    )
}

const Container = styled.div`

`;