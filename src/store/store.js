import { configureStore } from '@reduxjs/toolkit';
import AnimeSlice from './animeSlice/animeSlice';

export const store = configureStore({
    reducer: {
        anime: AnimeSlice.reducer,
    },
});