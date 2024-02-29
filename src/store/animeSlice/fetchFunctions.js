import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Базовый URL для запросов к API
const KIJAN_BASE_URL = "https://api.jikan.moe/v4";


// Функция для запроса популярных аниме
export const getPopularAnime = createAsyncThunk('manga/popularAnime', async () => {
    const response = await fetch(`${KIJAN_BASE_URL}/top/anime?filter=bypopularity`);
    const data = await response.json();
    return data.data;
});

// Функция для запроса аниме по Id
export const getTopAnimeById = createAsyncThunk('manga/topAnime', async (id) => {
    const response = await fetch(`${KIJAN_BASE_URL}/anime/40748`);
    const data = await response.json();
    console.log(data)
    return data.data;
});

// Функция для запроса аниме по Id
export const getAnimeById = createAsyncThunk('manga/curAnime', async (id) => {
    const response = await fetch(`${KIJAN_BASE_URL}/anime/${id}`);
    const data = await response.json();
    return data.data;
});

// Функция для запроса жанров аниме
export const getGenres = createAsyncThunk('manga/genres', async () => {
    // Добавьте задержку перед запросом
    await new Promise(resolve => setTimeout(resolve, 1000)); // Подождите 1 секунду
    
    const response = await fetch(`${KIJAN_BASE_URL}/genres/anime`);
    let data = await response.json();
    data = data.data.slice(0, 20);
    return data;
});

// Функция для запроса аниме, которое в данный момент выходит
export const getAiringAnime = createAsyncThunk('manga/airing', async () => {
    const response = await fetch(`${KIJAN_BASE_URL}/top/anime?filter=airing`);
    const data = await response.json();
    return data.data;
});

// Функция для запроса предстоящих аниме
export const getUpcomingAnime = createAsyncThunk('manga/upcoming', async () => {
    const response = await fetch(`${KIJAN_BASE_URL}/top/anime?filter=upcoming`);
    const data = await response.json();
    return data.data
});

// Функция для получения данных о персонажах аниме
export const getCharacters = createAsyncThunk('manga/characters', async (id) => {
    // Добавьте задержку перед запросом
    await new Promise(resolve => setTimeout(resolve, 1000)); // Подождите 1 секунду

    const response = await fetch(`${KIJAN_BASE_URL}/anime/${id}/characters`);
    let data = await response.json();
    data = data.data.slice(0, 20);
    return data;
});

// Функция для получения изображений аниме
export const getAnimePictures = createAsyncThunk('manga/pictures', async (id) => {
    const response = await fetch(
      `${KIJAN_BASE_URL}/characters/${id}/pictures`
    );
    let data = await response.json();
    return data.data;
});



// Функция для поиска аниме
export const searchAnime = createAsyncThunk('manga/search',  async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    console.log(data)
    return data.data
});

// Функция для получения моего списка 
export const getUsersLikedAnime = createAsyncThunk(
    "anime/getLiked",
    async(email) => {
    const { data: {anime} } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return anime;
});

// Функция для удаления лайка с аниме
export const removeFromLikedAnime = createAsyncThunk(
    "anime/removeLiked",
    async ({ animeId, email }) => {
        console.log(animeId, email)
        const { data: { anime } } = await axios.put("http://localhost:5000/api/user/remove", {
            email,
            animeId,
        });
    return anime;
});