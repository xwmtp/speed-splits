import styled from "styled-components";
import React from "react";

const SplitInputDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0px;
    h2 {
        text-transform: uppercase
    }

`

function SplitInput(props) {
    return (
        <SplitInputDiv >
            <h2>{props.title}</h2>
            <InputForm label='Splits.io id:' name='splitsio' handleChange={props.handleChange} />
        </SplitInputDiv>
    );
}


function InputForm(props) {
    return (
        <label>
            {props.label}
            <input type="text" name={props.name} onChange={props.handleChange} />
        </label>
    );
}



export default SplitInput;