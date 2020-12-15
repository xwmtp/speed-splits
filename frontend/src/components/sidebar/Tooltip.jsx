import React from "react";
import styled from "styled-components";

const TooltipDiv = styled.div`
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
    margin: 0px 10px;

    & .tooltiptext {
        visibility: hidden;
        width: 160px;
        background-color: black;
        color: #fff;
        text-align: center;
        font-size: 12px;
        padding: 5px 0;
        border-radius: 6px;
        /* posistion */
        position: absolute;
        z-index: 1;
        top: 150%;
        left: 50%;
        margin-left: -80px;
    }

    & .tooltiptext::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent black transparent;
    }

    &:hover .tooltiptext {
        visibility: visible;
    }

    .tooltiptext {
        padding: 5px;
    }
`

const Circle = styled.div`
    height: 15px;
    width: 15px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(85,85,85);
    text-align: center;
    font-weight: bold;
    border-radius: 50%;
`

function Tooltip(props) {
    return (
        <TooltipDiv class='tooltip'>
            <Circle>?</Circle>
            <span class='tooltiptext'>{props.text}</span>
        </TooltipDiv>
    );
}

export default Tooltip;