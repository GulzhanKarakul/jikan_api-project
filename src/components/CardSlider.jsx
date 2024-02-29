import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";
import CharacterCard from "./CharactersCard";
import { useNavigate } from "react-router-dom";

export default React.memo(function CardSlider({ data, title}) {
    const [showControlls, setShowControlls] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(0);
    const navigate = useNavigate();

    const listRef = useRef();

    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70;
        if(direction === "left" && sliderPosition > 0) {
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
            setSliderPosition(sliderPosition - 1);
        }
        if(direction === "right" && sliderPosition < 4) {
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
            setSliderPosition(sliderPosition + 1);
        }
    }
    return (
        <Container 
            className="flex column"
            onMouseEnter={() => setShowControlls(true)}
            onMouseLeave={() => setShowControlls(false)}
        >
            <h1>{title}</h1>
            <div className="wrapper">
                <div className={`slider-action left ${!showControlls ? "none" : ""} flex a-center j-center`}>
                    <AiOutlineLeft onClick={() => handleDirection("left")} />
                </div>
                <div className="flex slider" ref={listRef}>
                {title === "Characters" ? (
                    data.map((character, index) => (
                        <CharacterCard 
                            character={character} 
                            index={index} 
                            key={index} 
                            onClick={() => navigate(`/character/${character.mal_id}`)}
                        />
                    ))
                ) : (
                    data.map((anime, index) => (
                        <Card animeData={anime} index={index} key={index} />
                    ))
                )}
                </div>
                <div className={`slider-action right ${!showControlls ? "none" : ""} flex a-center j-center`}>
                    <AiOutlineRight onClick={() => handleDirection("right")} />
                </div>
            </div>
        </Container>
    )
});

const Container = styled.div`
    gap: 1rem;
    position: relative;
    padding: 2rem 0;
    h1 {
        margin-left: 50px;
    }
    .wrapper {
        .slider {
        width: max-content;
        gap: 1rem;
        transform: translateX(0px);
        transition: 0.3s ease-in-out;
        margin-left: 50px;
        }
        .slider-action {
        position: absolute;
        z-index: 99;
        height: 100%;
        top: 0;
        bottom: 0;
        width: 50px;
        transition: 0.3s ease-in-out;
        svg {
            font-size: 2rem;
        }
        }
        .none {
        display: none;
        }
        .left {
        left: 0;
        }
        .right {
        right: 0;
        }
    }
`;