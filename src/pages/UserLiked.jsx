import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUsersLikedAnime } from "../store/animeSlice/fetchFunctions";

export default function UserListedAnime() {
    const likedAnime = useSelector((state) => state.anime.likedAnime);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login");
    });

    useEffect(() => {
        if (email) {
        dispatch(getUsersLikedAnime(email));
        }
    }, [email]);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <Container>
        <Navbar isScrolled={isScrolled} />
        <div className="content flex column">
            <h1>My List</h1>
            <div className="grid flex">
            {likedAnime.map((anime, index) => {
                return (
                <Card
                    animeData={anime}
                    index={index}
                    key={index}
                    isLiked={true}
                />
                );
            })}
            </div>
        </div>
        </Container>
    );
}

const Container = styled.div`
    .content {
            margin: 2.3rem;
            margin-top: 8rem;
            gap: 3rem;
        h1 {
            margin-left: 3rem;
        }
        .grid {
            flex-wrap: wrap;
            gap: 1rem;
        }
    }
`;