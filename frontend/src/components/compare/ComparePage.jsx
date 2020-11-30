import styled from "styled-components";
import React from "react";
import Sidebar from '../sidebar/Sidebar.jsx'
import Table from "./Table.jsx";

class ComparePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { splitsData: {} }
        this.requestSplitsData = this.requestSplitsData.bind(this);
    }

    PageDiv = styled.div`
        display: flex;
        height: 100%;
        flex-grow: 1;       
        h2 {
            color: var(--yellow);
            text-transform: uppercase;
        }
    `;

    CompareDiv = styled.div`
        padding: 20px;
        display: flex;
        flex-direction: row;
    `;

    requestSplitsData(formData) {
        const url = `${process.env.REACT_APP_BACKEND_URL}/splits?you_splitsio=${formData['you']['splitsio']}&them_splitsio=${formData['them']['splitsio']}`
        console.log(formData)
        console.log(url)
        fetch(url, {
            method: "get",
            mode: "cors"
        })
            .then(r => {
                if (r.status / 100 !== 2) {
                    throw Error();
                }
                console.log("Got json")
                return r.json()
            })
            .then(splitsData => {
                this.setState({ splitsData: splitsData });
                console.log("Got response:");
                console.log(this.state);
            })
    }


    render() {
        return (
            <this.PageDiv id='compare-page'>
                <Sidebar makeRequest={this.requestSplitsData} />
                <this.CompareDiv id='compare-div'>
                    <TableBlock data={this.state.splitsData} />
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
        border: none;
        border-spacing: 0px;
        flex-shrink: 0;
        tr:nth-child(even) {background-color: rgb(45,45,45)};
        td, th {
            padding: 8px 15px;
            border: none;
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
        }
    }
    `;

class TableBlock extends React.Component {

    constructor(props) {
        super(props);
    }

    addDisplayInfoYouData(data) {
        return {
            dataHeaderInfo: [
                { header: 'you', span: 4 }
            ],
            columnInfo: [
                { name: 'name', display: 'split', class: 'align-right' },
                { name: 'duration', display: 'PB', class: 'align-right' },
                { name: 'gold', display: 'gold', class: 'align-right' },
                { name: 'timesave', display: 'timesave', class: 'align-right' },
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
                { name: 'pb_vs_pb', display: 'pb/pb', class: 'align-right split-colors' },
                { name: 'gold_vs_pb', display: 'gold/gold', class: 'align-right split-colors' },
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
                console.log(displayInfo)
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
