import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom"


const HeaderDiv = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;;
    background: var(--violet);
    .navlink {
        text-decoration: none;
        color: white;
    }
`

function Header() {

    return (
        <HeaderDiv id='header' >
            <NavLink to={'/'} className='navlink' activeClassName='current'><h1>Split Compare</h1></NavLink>
            <NavLink to={'/faq'} className='navlink' activeClassName='current'><h2>FAQ</h2></NavLink>
        </HeaderDiv>
    );
}

export default Header;
