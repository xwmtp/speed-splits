import styled from "styled-components";
import React from "react";
import Sidebar from '../sidebar/Sidebar.jsx'
import Table from "./Table.jsx";
import Loader from "./LoadingSpinner"
import { isEmpty } from "../../util"

class ComparePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, splitsData: {} }
        this.requestSplitsData = this.requestSplitsData.bind(this);
    }

    PageDiv = styled.div`
        display: flex;
        flex-grow: 1;
        h2 {
            color: var(--yellow);
            text-transform: uppercase;
        }
    `;

    CompareDiv = styled.div`
        padding: 20px;
        height: 100%;
        width: 100%;
        height: 1px solid green;
        display: flex;
        flex-direction: row;
        p {
            white-space: pre-line;  
        }
    `;

    requestSplitsData(formData) {
        this.setState({ loading: true })
        if (Object.values(formData).every(x => isEmpty(x))) {
            return this.setState({ loading: false, splitsData: { 'error': "Please fill in a Splits.io id or splits data for 'YOU', and optionally for 'THEM'." } })
        }
        fetch(encodeURI(`${process.env.REACT_APP_BACKEND_URL}/splits/form/`), {
            method: "post",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then(r => {
            if (r.status / 100 !== 2) {
                this.setState({ loading: false })
                throw Error(r.status);
            }
            return r.json();
        }).then(splitsData => {
            this.setState({ loading: false, splitsData: splitsData });
        }).catch(() => this.updateDate({'error' : 'Could not fetch data.'}))
    }

    updateDate(splitsData) {
        this.setState({loading: false, splitsData: splitsData})
    }


    render() {
        const compareContent = this.state.loading ? <Loader /> : <TableBlock data={this.state.splitsData} />
        return (
            <this.PageDiv id='compare-page'>
                <Sidebar makeRequest={this.requestSplitsData} />
                <this.CompareDiv id='compare-div'>
                    {compareContent}
                </this.CompareDiv>
            </this.PageDiv>
        );
    }
}

export default ComparePage;



const TableDiv = styled.div`
    padding: 5px 0px;
    margin: 0px 10px;

    font-size: 18px;
    display: flex;
    flex-direction: column;

    table {  
        border-spacing: 0px;
        border-collapse: collapse;
        flex-shrink: 0;
        thead {
            .column-header {
                background-color: var(--violet);
                font-weight: bold;
            };
        }
        tbody {
            tr:last-child {font-weight: bold;}

            tr {
                border-top: 1px solid rgb(55, 55, 55);
            }
        }


        td, th {
            padding: 8px 15px;
            vertical-align: center;
        }
        th {
            text-transform: capitalize;
            text-align: center;
        }
        .align-right {
            text-align: right;
        }
        .align-left {
            text-align: left;
        }
        .align-center {
            text-align: center;
        }
        .no-background {
            background-color: var(--bg-color);
            padding: 8px 10px;
            border-top: 1px solid var(--bg-color);
        }
    }
    `;

class TableBlock extends React.Component {

    addDisplayInfoYouData(data) {
        return {
            dataHeaderInfo: [
                { header: 'you', span: 4 }
            ],
            columnInfo: [
                { name: 'name_you', display: 'split', class: 'align-right' },
                { name: 'duration_you', display: 'PB', class: 'align-right' },
                { name: 'gold_you', display: 'gold', class: 'align-right' },
                { name: 'timesave_you', display: 'timesave', class: 'align-right' },
            ],
            data: data['splits_data']['data']
        }
    }

    addDisplayInfoVSData(data) {
        return {
            dataHeaderInfo: [
                { header: 'you', span: 4 },
                { header: 'vs', span: 3 },
                { header: 'them', span: 4 }
            ],
            columnInfo: [
                { name: 'name_you', display: 'split', class: 'align-right' },
                { name: 'duration_you', display: 'PB', class: 'align-right' },
                { name: 'gold_you', display: 'gold', class: 'align-right split-colors' },
                { name: 'empty_1', type: 'empty', class: 'no-background' },
                { name: 'gold_vs_gold', display: 'gold/gold', class: 'align-right split-colors' },
                { name: 'pb_vs_pb', display: 'PB/PB', class: 'align-right split-colors' },
                { name: 'gold_vs_pb', display: 'gold/PB', class: 'align-right split-colors' },
                { name: 'empty_2', type: 'empty', class: 'no-background' },
                { name: 'duration_them', display: 'PB', class: 'align-right split-colors' },
                { name: 'gold_them', display: 'gold', class: 'align-right split-colors' },
                { name: 'name_them', display: 'split', class: 'align-left' },
            ],
            data: data['splits_data']['data']
        }
    }

    render() {
        let pageContent;
        if ('error' in this.props.data) {
            pageContent = <p>{this.props.data['error']}</p>
        }
        else if ('splits_data' in this.props.data) {
            const data = this.props.data
            let displayInfo;
            if (data['splits_data']['type'] === 'you_data') {
                displayInfo = this.addDisplayInfoYouData(data);
            }
            if (data['splits_data']['type'] === 'vs_data') {
                displayInfo = this.addDisplayInfoVSData(data);
            }
            pageContent = (
                <TableDiv id='table-block'>
                    <Table data={displayInfo} />
                </TableDiv>)
        }
        else {
            pageContent = <></>;
        }
        return pageContent
    }
}
