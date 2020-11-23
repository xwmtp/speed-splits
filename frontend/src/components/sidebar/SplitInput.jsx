import styled from "styled-components";
import React from "react";

const SplitInputDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

function SplitInput() {

    return (
        <SplitInputDiv >
            <h2>YOU</h2>
            <p>split</p>
        </SplitInputDiv>
    );
}

export default SplitInput;
