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
    width: 300px;
    max-width: 30vw;
    background: rgb(30, 30, 30);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return <this.SidebarDiv >
            <SplitsForm/>
        </this.SidebarDiv >
    }
}

export default Sidebar;
