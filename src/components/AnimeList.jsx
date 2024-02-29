import React from "react";
import styled from "styled-components";
import Card from "./Card";

export default function AnimeList({ data, title }) {
    return (
        <Container>
            <h1>{title}</h1>
            <List>
                {data.map((anime, index) => (
                    <Card animeData={anime}  key={index} />
                ))}
            </List>
        </Container>
    );
}

const Container = styled.div`
    max-width: 900px; 
    margin: 0 auto; 
    text-align: center;
    color: white;
    background-color: black;
    padding: 10px;
    h1{
        margin-top: 5rem;
        margin-bottom: 2rem;
    }
`;

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px; 
    justify-content: center; 
    align-items: center; 
`;