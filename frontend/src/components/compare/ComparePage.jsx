import styled from "styled-components";
import React from "react";
import Sidebar from '../sidebar/Sidebar.jsx'
import Table from "./Table.jsx";
import youData from '../../you.js'
import themData from '../../them.js'

class ComparePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { splitsData: [] }
        this.requestSplitsData = this.requestSplitsData.bind(this);
    }


    PageDiv = styled.div`
        display: flex;
        height: 100%;
        flex-grow: 1;       
        h2 {
            color: var(--yellow)
        }
    `;

    CompareDiv = styled.div`
        padding: 20px;
        display: flex;
        flex-direction: row;
        table {   
            td, th {
                padding: 5px 20px;
                border: none;
                vertical-align: center;
                text-align: center;
            }
        }
    `;

    requestSplitsData(formData) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/splits?you_splitsio=${formData['you']['splitsio']}/`, {
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
                    <TableBlock title='You' data={this.state.splitsData} />

                </this.CompareDiv>
            </this.PageDiv>
        );
    }

}

export default ComparePage;



const TableDiv = styled.div`
    background: var(--sidebar-color);
    padding: 5px 0px;
    margin: 0px 10px;
    display: flex;
    flex-direction: column;
   
   #block-title {
       text-transform: uppercase;
       margin: 10px 0px;
   }
`;

function TableBlock(props) {

    return (
        <TableDiv id='table-block'>
            <h2 id='block-title'>{props.title}</h2>

            <Table data={props.data} />
        </TableDiv>
    );
}
