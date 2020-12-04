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
    label {
        display: flex;
        flex-direction: column;
        margin: 10px 0px;
    }
    textarea {
        resize: vertical;
    }

`

function SplitInput(props) {
    return (
        <SplitInputDiv >
            <h2>{props.title}</h2>
            <label>
                {'Splits.io id:'}
                <input type="text" name='splitsio' onChange={props.handleChange} />
            </label>
            or
            <label>
                {'Raw splits:'}
                <textarea name='rawdata' onChange={props.handleChange} rows={10} cols={30} maxLength={5000}/>
            </label>
        </SplitInputDiv>
    );
}





export default SplitInput;