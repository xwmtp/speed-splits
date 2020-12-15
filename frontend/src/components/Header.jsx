import styled from "styled-components";
import React from "react";

const HeaderDiv = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    background: var(--violet);
`

function Header() {

    return (
        <HeaderDiv id='header' >
            <h1>Split Compare</h1>
        </HeaderDiv>
    );
}

export default Header;
