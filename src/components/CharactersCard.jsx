import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default React.memo(function CharacterCard ({ character }) {
    const { role } = character;
    const { images, name, mal_id } = character.character;

    return (
        <Link to={`/character/${mal_id}`}>
            <CharacterCardStyled>
                <img src={images?.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
            </CharacterCardStyled>
        </Link>
    );
});

const CharacterCardStyled = styled.div`
    width: 280px;
    height: 400px;
    text-align: center;
    padding: 10px;
    border-radius: 7px;
    border: 5px solid #555;
    transition: all .4s ease-in-out;
    img {
        width: 90%;
        height: 80%;
    }
    h4 {
        padding: .5rem 0;
        color: #fff;
    }
    p {
        color: #27AE60;
    }
    &:hover {
        transform: translateY(-5px);
    }
`;
