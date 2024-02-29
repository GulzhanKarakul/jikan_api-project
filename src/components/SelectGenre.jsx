import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchMoviesByGenre } from "../store";

export default function SelectGenre({ genres, type }) {
    const dispatch = useDispatch();
    return (
        <Select 
            className="flex"
            onChange={e=>{
                dispatch(fetchMoviesByGenre({ genre: e.target.value, type }));
        }}>
            {
                genres.map((genre) => {
                    return (
                        <option value={genre.mal_id} key={genre.mal_id}>
                            {genre.name}
                        </option>
                    );
                })
            }
        </Select>
    )
}

const Select = styled.select`
    margin-leftL 5rem;
    cursor: pounter;
    font-size: 1.4rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
`;