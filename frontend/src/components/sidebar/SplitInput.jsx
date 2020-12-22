import styled from "styled-components";
import React from "react";
import Tooltip from "./Tooltip";

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
        align-items: center;
        margin: 10px 0px;
    }
    textarea {
        resize: vertical;
    }
    .tooltip {
        margin: 0px 10px;
    }

`

const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 35px;
`

function SplitInput(props) {
    return (
        <SplitInputDiv >
            <h2>{props.title}</h2>
            <label>
                {'Splits.io id:'}
                <input type="text" name='splitsio' onChange={props.handleChange} maxLength={25} />
            </label>
            or
            <label>
                <Title>
                    {'Raw splits:'}
                    <Tooltip text="Paste your raw splits separated by tabs, commas or semicolons.
                                   The segment names, durations and golds are required as columns.
                                   You can copy data directly from livesplit or a spreadsheet.
                                   See 'How to Use' for more details."/>
                </Title>
                <textarea name='rawdata' onChange={props.handleChange} rows={10} cols={30} maxLength={5000} />
            </label>
        </SplitInputDiv>
    );
}

export default SplitInput;