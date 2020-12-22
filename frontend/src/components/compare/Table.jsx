import React from "react";

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getDataHeader() {
        const createHeader = headerInfo => {
            return <th key={headerInfo['header']} colSpan={headerInfo['span']}>
                <h2>{headerInfo['header']}</h2>
            </th>
        }
        return <tr className='data-header'>{this.props.data['dataHeaderInfo'].map(createHeader)}</tr>
    }

    getColumnHeader() {
        const createHeader = columnInfo => {
            return <th key={columnInfo['name']} className={columnInfo['class']}>
                {columnInfo['display']}
            </th>
        }
        return <tr className='column-header'>{this.props.data['columnInfo'].map(createHeader)}</tr>
    }

    getRows() {
        const createCell = (columnInfo, rowData, i) => {
            const cellContent = columnInfo['colType'] !== 'empty' ? rowData[columnInfo['name']] : ''
            return <td key={`${i}_${columnInfo['name']}`} className={columnInfo['class']}>
                {cellContent}
            </td>

        }
        const createRow = (rowData, i) => {
            return <tr key={i}>
                {this.props.data['columnInfo'].map((columnInfo, i) => createCell(columnInfo, rowData, i))}
            </tr>
        }
        return this.props.data['data'].map((rowData, i) => createRow(rowData, i))
    }

    render() {

        return (
            <table>
                <thead>
                    {this.getDataHeader()}
                    {this.getColumnHeader()}
                </thead>
                <tbody>
                    
                    {this.getRows()}
                </tbody>
            </table>

        );
    }

}


export default Table;