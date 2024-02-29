import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAnimeById } from "../store/animeSlice/fetchFunctions";

export default function Player() {
    const navigate = useNavigate();
    const currentAnime = useSelector((state) => state.anime.curAnime);
    const { id } = useParams();
    const dispatch = useDispatch();

    const [url, setUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAnimeById(id));
                const videoUrl = currentAnime.trailer?.embed_url;
                if (videoUrl) {
                    setUrl(videoUrl);
                } else {
                    console.error("No video URL found for the anime");
                    setUrl(''); 
                }
            } catch (error) {
                console.error("Error fetching anime:", error);
                setUrl('');
            }
        };

        fetchData();
    }, [dispatch, id, currentAnime]);

    return (
        <Container>
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                {url ? (
                    <iframe
                        src={url}
                        title="Inline Frame Example"
                        width="100%"
                        height="100%"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>No video available</p>
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
    .player {
        width: 100vw;
        height: 100vh;
        .back {
            position: absolute;
            padding: 2rem;
            z-index: 1;
            svg {
                font-size: 3rem;
                cursor: pointer;
            }
        }
        iframe {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
`;
