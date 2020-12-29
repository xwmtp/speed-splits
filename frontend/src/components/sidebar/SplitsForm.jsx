import styled from "styled-components";
import React from "react";
import SplitInput from './FormInput'


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
        this.handleYouChange = this.handleYouChange.bind(this);
        this.handleThemChange = this.handleThemChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    SplitsFormDiv = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
    `

    Button = styled.button `
        width: 100px;
    `
    handleYouChange(event) {
        this.setState({ you: { ...this.state['you'], [event.target.name]: event.target.value } })
    }

    handleThemChange(event) {
        this.setState({ them: { ...this.state['them'], [event.target.name]: event.target.value } })
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.makeRequest({ ...this.state })
    }

    render() {
        return <this.SplitsFormDiv onSubmit = {this.handleFormSubmit} >
            <SplitInput title='You' handleChange={this.handleYouChange} />
            <SplitInput title='Them' handleChange={this.handleThemChange} />
            <this.Button type='submit'>
                Go!
                </this.Button>
        </this.SplitsFormDiv >
    }
}

export default SplitsForm