import styled from "styled-components";
import React from "react";

const HeaderDiv = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    background: rgb(130, 109, 191);
`

function Header() {

    return (
        <HeaderDiv >
            <h1>Split Compare</h1>
        </HeaderDiv>
    );
}

export default Header;
