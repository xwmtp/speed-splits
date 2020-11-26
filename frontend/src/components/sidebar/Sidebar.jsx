import styled from "styled-components";
import React from "react";
import SplitsForm from "./SplitsForm";



class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    SidebarDiv = styled.div`
        height: 100%;
        min-height: 100%;
        width: 300px;
        max-width: 30vw;
        background: var(--sidebar-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
`


    render() {
        return <this.SidebarDiv id='sidebar' >
            <SplitsForm makeRequest={this.props.makeRequest} id='splits-form'/>
        </this.SidebarDiv >
    }
}

export default Sidebar;
