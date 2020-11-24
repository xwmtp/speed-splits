import styled from "styled-components";
import React from "react";
import SplitInput from './SplitInput'


class SplitsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            you: {
                splitsio: ''
            },
            them: {
                splitsio: ''
            }
        }
        console.log(this.state);
        this.handleYouChange = this.handleYouChange.bind(this);
        this.handleThemChange = this.handleThemChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    SplitsFormDiv = styled.div`
        height: 100%;
        width: 100%;
    `
    handleYouChange(event) {
        console.log(`YOU ${event.target.value} updated`);
        this.setState({...this.state, you: {...this.state.you, [event.target.name]: event.target.value}})
        console.log(this.state);
    }
    handleThemChange(event) {
        console.log(`THEM ${event.target.value} updated`);
        this.setState({...this.state, them: {...this.state.them, [event.target.name]: event.target.value}})
        console.log(this.state);
    }

    handleClick(event) {
        console.log('SUBMITTED');
        console.log(this.state)
        event.preventDefault();
    }

    render() {
        return <this.SplitsFormDiv >
            <form onSubmit={this.handleSubmit}>
                <SplitInput title='You' handleChange={this.handleYouChange} />
                <SplitInput title='Them' handleChange={this.handleThemChange} />
                <button  onClick={this.handleClick}>
                Compare!
                </button>
            </form>
        </this.SplitsFormDiv >
    }
}

export default SplitsForm