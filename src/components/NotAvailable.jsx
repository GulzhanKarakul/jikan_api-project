import React from "react";
import styled from "styled-components";

export default  function NotAvailable() {
    return (
        <NotAvailableContainer>
            <h1 className="not-available">
                Фильмы отсутствуют для выбранного жанра.
            </h1>
        </NotAvailableContainer>
    );
};

const NotAvailableContainer = styled.div`
    margin-top: 5rem;
    text-align: center;
`;
