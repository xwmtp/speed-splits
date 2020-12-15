import styled from "styled-components";
import React from "react";
import SplitInput from './SplitInput'


class SplitsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            you: {
                splitsio: '',
                rawdata: ''
            },
            them: {
                splitsio: '',
                rawdata: ''
            }
        }
        console.log(this.state);
        this.handleYouChange = this.handleYouChange.bind(this);
        this.handleThemChange = this.handleThemChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    SplitsFormDiv = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
    `
    handleYouChange(event) {
        this.setState({ you: { ...this.state['you'], [event.target.name]: event.target.value } })
    }

    handleThemChange(event) {
        this.setState({ them: { ...this.state['them'], [event.target.name]: event.target.value } })
    }

    handleFormSubmit(event) {
        console.log(this.state)
        this.props.makeRequest({ ...this.state })
    }


    render() {
        return <this.SplitsFormDiv >
            <SplitInput title='You' handleChange={this.handleYouChange} />
            <SplitInput title='Them' handleChange={this.handleThemChange} />
            <button onClick={this.handleFormSubmit}>
                Compare!
                </button>
        </this.SplitsFormDiv >
    }
}

export default SplitsForm