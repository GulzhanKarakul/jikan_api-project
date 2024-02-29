import { createSlice } from '@reduxjs/toolkit';
import { 
    getAiringAnime, 
    getTopAnimeById,
    getAnimeById, 
    getAnimePictures, 
    getCharacters, 
    getGenres, 
    getPopularAnime, 
    getUpcomingAnime, 
    getUsersLikedAnime, 
    removeFromLikedAnime, 
    searchAnime,
} from './fetchFunctions';

const initialState = {
    popularAnime: [],
    curAnime: null,
    topAnime: null,
    genres: [],
    upcomingAnime: [],
    airingAnime: [],
    characters: [],
    pictures: [],
    searchResults: [],
    likedAnime: [],
    searchingAnime: '',
};

const AnimeSlice = createSlice({
    name: "anime",
    initialState,
    reducers: {
        clearCurrentAnime: (state) => {
            state.curAnime = null;
        },
        searchState: (state, action) => {
            state.isSearch = action.payload;
        },
        setSearchingAnime: (state, action) => {
            state.searchingAnime = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPopularAnime.fulfilled, (state, action) => {
            console.log(action.payload)
            state.popularAnime = action.payload;
        });

        builder.addCase(getTopAnimeById.fulfilled, (state, action) => {
            state.topAnime = action.payload;
        });

        builder.addCase(getAnimeById.fulfilled, (state, action) => {
            state.curAnime = action.payload;
        });

        builder.addCase(getAiringAnime.fulfilled, (state, action) => {
            state.airingAnime = action.payload;
        });

        builder.addCase(getUpcomingAnime.fulfilled, (state, action) => {
            state.upcomingAnime = action.payload;
        });

        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = [...action.payload];
        });

        builder.addCase(getCharacters.fulfilled, (state, action) => {
            state.characters = [...action.payload];
        });

        builder.addCase(getAnimePictures.fulfilled, (state, action) => {
            state.pictures = [...action.payload];
        });

        builder.addCase(searchAnime.fulfilled, (state, action) => {
            state.searchResults = action.payload;
            console.log(state.searchResults, "searchResults")
        });

        builder.addCase(getUsersLikedAnime.fulfilled, (state, action) => {
            state.likedAnime = [...action.payload];
            console.log(action.payload, "getUsersLikedAnime")
        });

        builder.addCase(removeFromLikedAnime.fulfilled, (state, action) => {
            state.likedAnime = [...action.payload];
            console.log(action.payload, "getUsersLikedAnime")
        });

    },
});

export const { clearCurrentAnime, searchState, setSearchingAnime } = AnimeSlice.actions;
export default AnimeSlice;