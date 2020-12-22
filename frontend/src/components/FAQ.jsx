import React from "react";
import styled from "styled-components";
import example from "../data/example.txt"

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

    a {
        color: var(--yellow);
        font-weight: bold;
        text-decoration: none;
    }
    span {
        color: rgb(200,200,200);
        /*
        font-style: italic;
        background: rgb(25,25,25);
        padding: 0px 3px;*/
    }
    br {
        marg
    }

`

function FAQ() {
    return (
        <FAQDiv >
            <Text>
                <h3>What is this?</h3>
                <p>
                    A simple tool for speedrunners to get more insights into their splits.
                    You can see your timesaves, your balanced splits, and compare your runs to previous ones or to those of your competitors.
                </p>
                <h3>How do use it?</h3>
                <p>
                    Paste a <a href='https://splits.io/'>splits.io</a> link or the raw data of your run under 'YOU'.
                    Leave the 'THEM' fields empty if you just want to analyse your own splits.
                    If you want to compare your splits to another run, put the link or data of that run under 'THEM'.
                </p>
                <h3>What do I put under <span>Raw Splits</span>?</h3>
                <p>
                    Use this field if you don't want to use data from an uploaded run on <a href='https://splits.io/'>splits.io</a>.
                    You can directly copy from your <a href='https://livesplit.org/'>LiveSplit</a> splits and paste the data in the <span>raw splits</span> field.
                    It's also possible to copy from a spreadsheet.
                </p>
                <h3>What do I copy from LiveSplit?</h3>
                <p>
                    Right click your splits and select <span>Edit Splits</span>.
                    Select all the fields under the columns named <span>Segment Name</span>, <span>Split Time</span>, <span>Segment Time</span> and <span>Best Segment</span>.
                    The <span>Split Time</span> column won't actually be used, so you can leave it out if you use your own data.
                </p>
                <h3>How should I format my own run data?</h3>
                <p>
                    You need to supply the <span>names</span>, <span>PB durations</span> and <span>gold durations</span> of your segments, in that order.
                    The columns should be separated by tabs, comma's or semicolons.
                    Spaces are not accepted since split names often contain spaces too.
                    It's easiest to copy your data from a spreadsheet, which will automatically separate your columns by tabs.
                    Don't include a column header.
                    <br />
                    Click <a href={example} target="_blank">here</a> for an example of valid data to use in the <span>raw splits</span> field.
                </p>
                <h3>How should I format durations?</h3>
                <p>
                    Segment durations should be formatted like <span>hh:mm:ss.ms</span>, where leading zeros and milliseconds are optional.
                    If a segment is shorter than an hour, the hours can be ommitted (like <span>12:34.56</span> or <span>1:23</span>).
                    It's also possible to put times in milliseconds only (like <span>89330</span> for <span>1:29.33</span>)
                    <br />
                </p>
                <h3>Missing splits</h3>
                <p>
                    The tool assumes that when a split is missing, the next split contains the length of both itself and the
                    previous missing one. This goes for both PB and Gold segments, and is how <a href='https://livesplit.org/'>LiveSplit</a> normally handles
                    missing splits.
                </p>
            </Text>
        </FAQDiv>
    );
}

export default FAQ;