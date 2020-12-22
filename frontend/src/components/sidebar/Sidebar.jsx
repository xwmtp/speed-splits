import styled from "styled-components";
import React from "react";
import SplitsForm from "./SplitsForm";

class Sidebar extends React.Component {

    SidebarDiv = styled.div`
        flex-grow: 1;
        width: 350px;
        background: var(--sidebar-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
`

    render() {
        return <this.SidebarDiv id='sidebar' >
            <SplitsForm makeRequest={this.props.makeRequest} id='splits-form' />
        </this.SidebarDiv >
    }
}

export default Sidebar;
