import styled from "styled-components";
import React from "react";
import SplitInput from "./SplitInput";

const SidebarDiv = styled.div`
    height: 100%;
    width: 200px;
    max-width: 30vw;
    background: rgb(30, 30, 30);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
`

function Sidebar() {

    return (
        <SidebarDiv >
            <SplitInput/>
            <SplitInput/>
        </SidebarDiv>
    );
}

export default Sidebar;
