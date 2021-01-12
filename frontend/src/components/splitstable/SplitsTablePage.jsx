import styled from "styled-components";
import React from "react";
import Sidebar from '../sidebar/Sidebar.jsx'
import SplitsTable from "./SplitsTable.jsx";
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
        const compareContent = this.state.loading ? <Loader /> : <SplitsTable data={this.state.splitsData} />
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
