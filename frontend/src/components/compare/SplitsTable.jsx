import styled from "styled-components";
import React from "react";



class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const createRow = (segment_data, index) => { return <SplitsTableRow data={segment_data} key={index} /> }

        const rows = this.props.data.map((split, i) => createRow(split, i))

        return (
            <table>
                <tbody>
                    <tr>
                        <th>Segment</th>
                        <th>PB</th>
                        <th>Gold</th>
                        <th>Timesave</th>

                    </tr>
                {rows}
                </tbody>
            </table>

        );
    }

}

function SplitsTableRow(props) {

    return (
        <tr>
            <td>{props.data['name']}</td>
            <td>{props.data['duration']}</td>
            <td>{props.data['gold']}</td>
            <td>{props.data['timesave']}</td>
        </tr>
    );
}

export default Table;