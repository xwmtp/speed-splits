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
    padding: 40px 0px;
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
`

const splitsIO = <a href='https://splits.io/' target="_blank" rel="noreferrer">splits.io</a>
const liveSplit = <a href='https://livesplit.org/' target="_blank" rel="noreferrer">LiveSplit</a>
const discord = <a href="https://discord.com/" target="_blank" rel="noreferrer">Discord</a>
const github = <a href="https://github.com/xwmtp/speed-splits/issues" target="_blank" rel="noreferrer">Github</a>

function FAQ() {
    return (
        <FAQDiv >
            <Text>
                <h3>What is this?</h3>
                <p>
                    A simple tool for speedrunners to get more insights into their splits.
                    You can see your timesaves, your balanced splits, and compare your runs to previous ones or to those of your competitors.
                </p>
                <h3>How do I use it?</h3>
                <p>
                    Paste a {splitsIO} link or the raw data of your run under 'YOU'.
                    Leave the 'THEM' fields empty if you just want to analyse your own splits.
                    If you want to compare your splits to another run, put the link or data of that run under 'THEM'.
                </p>
                <h3>What do I put under <span>Raw Splits</span>?</h3>
                <p>
                    Use this field if you don't want to use data from an uploaded run on {splitsIO}.
                    You can directly copy from your {liveSplit} splits and paste the data in the <span>raw splits</span> field.
                    It's also possible to copy data from a spreadsheet.
                </p>
                <h3>What do I copy from LiveSplit?</h3>
                <p>
                    Right click your splits and select <span>Edit Splits</span>.
                    The fields <span>Segment Name</span>, <span>Segment Time</span> and <span>Best Segment</span> are required, but it's easiest to copy all the fields.
                </p>
                <h3>How should I format my own run data?</h3>
                <p>
                    You need to supply the <span>names</span>, <span>PB durations</span> and <span>gold durations</span> of your segments, in that order.
                    The columns should be separated by tabs, comma's or semicolons.
                    Make sure your segment names do not contain these characters!
                    It's easiest to copy your data from a spreadsheet, which will automatically separate your columns by tabs.
                    Don't include a column header.
                    <br />
                    Click <a href={example} target="_blank" rel="noreferrer">here</a> to view an example of valid data to use in the <span>raw splits</span> field.
                </p>
                <h3>How should I format durations?</h3>
                <p>
                    Segment durations should be formatted like <span>hh:mm:ss.ms</span>, where leading zeros and milliseconds are optional.
                    If a segment is shorter than an hour, the hours can be ommitted (like <span>12:34.56</span> or <span>1:23</span>).
                    It's also possible to put times in milliseconds only (like <span>89330</span> for <span>1:29.33</span>)
                </p>
                <h3>Can I download the data in the tables?</h3>
                <p>
                   There's no download button (yet), but if you want to copy the data in the tables for use in {liveSplit} or a spreadsheet,
                   it's easiest to select all the data in the table, copy and paste to Notepad first. If you copy again from there and paste
                   to a spreadsheet, the columns should be recognized.
                </p>
                <h3>How are missing splits handled?</h3>
                <p>
                    The tool assumes that when a split is missing, the next split contains the duration of both itself and the
                    previous split. This goes for both PB and Gold segments, and is how {liveSplit} normally handles
                    missing splits.
                </p>
                <h3>I got a weird error!</h3>
                <p>
                    If you're using the <span>raw splits</span> field, please read through this FAQ and make sure the data is formatted correctly.
                    If it is, it may be a bug.
                    Let me know by submitting an issue on the {github} page (if your issue isn't already there).
                </p>
                <h3>I have another question / request / ...</h3>
                <p>
                    You can reach me on {discord}: xwillmarktheplace<span>#4400</span>
                </p>
            </Text>
        </FAQDiv>
    );
}

export default FAQ;
