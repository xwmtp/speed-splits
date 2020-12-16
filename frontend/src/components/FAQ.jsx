import React from "react";
import styled from "styled-components";

const FAQDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-grow: 1;
`

const Text = styled.div`
    max-width: 800px;
    width: 70%;
    padding-top: 40px;
    text-align: left;
    font-size: 18px;

    h3 {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 8px;
    }

`



function FAQ() {
    return (
        <FAQDiv >
            <Text>
                <h3>How to use the Raw Splits field</h3>
                <p>
                    If you'd like to paste your own split data rather than linking a run on Splits.io, you can use
                    the 'raw splits' field. If you want to compare against someone who splits differently you might
                    want to change the splits manually. <br />
                    You can directly copy the splits data from Livesplit and paste it in the raw splits field. Just
                    open your splits, right click and select 'Edit Splits'. Select all the fields under the 'Segment
                     Name', 'Split Time', 'Segment Time' and 'Best Segment' columns and copy/paste to the raw splits
                    field on this site. <br/>
                    It's also possible to copy from a spreadsheet. Make sure you have you have a split name column,
                    then segment durations and then gold durations.
                </p>
                <h3>Raw splits formatting</h3>
                <p>
                    The columns should be separated by tabs, comma's or semicolons. Spaces are not accepted since split
                    names often contain spaces too. If you copy from Livesplit or a spreadsheet, the data should automatically
                    be separated by tabs.<br/>
                    Segment durations should be formatted like hh:mm:ss.ms, but leading zeroes and milliseconds are optional.
                    If the splits are shorter than an hour, the hours can be ommitted (like 12:34.56 or 1:23 for example).
                    It's also possible to put times in milliseconds only, like 
                </p>

            </Text>

        </FAQDiv>
    );
}

export default FAQ;