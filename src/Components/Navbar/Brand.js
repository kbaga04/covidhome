import React from 'react'
import styled from "styled-components";

const Brand = () => {
    return (
        <>
            <Over><Title>COVID</Title><Blue>Tracker</Blue></Over>
        </>
    )
}

export default Brand

const Title = styled.h1`
  font-size: 1.5em;
  color: #fff;
  display: inline-block;
  margin: auto 0;
  margin-right: 0;
`;

const Blue = styled.h1`
    color: #1e90ff;
    margin: auto 0;
    display: inline-block;
    margin-left: 0;
`;

const Over = styled.div`
    display: inline-block;
    width: 50%;
    margin-top: 1%;
    @media (max-width: 769px) {
        margin-top: 3%;
    }
`;