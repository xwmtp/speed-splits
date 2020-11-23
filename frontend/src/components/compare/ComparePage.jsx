import styled from "styled-components";
import React from "react";
import Sidebar from '../sidebar/Sidebar.jsx'

const PageDiv = styled.div`
    display: flex;
    height: 100vh;
    flex-grow: 1;
`;

const CompareDiv = styled.div`
    padding: 20px;
`

function ComparePage() {

    return (
        <PageDiv >
            <Sidebar />
            <CompareDiv>
                <p>Hallo page</p>
            </CompareDiv>
        </PageDiv>
    );
}

export default ComparePage;
