import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Airing from "./pages/Airing";
import Upcoming from "./pages/Upcoming";
import AnimeItem from "./pages/Anime";
import Gallery from "./components/Gallery";
import Player from "./pages/Player";
import Search from "./pages/SearchPage";
import UserListedAnime from "./pages/UserLiked";




export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/anime/:id" element={<AnimeItem />} />
                <Route exact path="/airing" element={<Airing />} />
                <Route exact path="/upcoming" element={<Upcoming />} />
                <Route exact path="/character/:id" element={<Gallery />} />
                <Route exact path="/player/:id" element={<Player />} />
                <Route exact path="/search" element={<Search />} />
                <Route exact path="/mylist" element={<UserListedAnime />} />
            </Routes>
        </BrowserRouter>
    )
}