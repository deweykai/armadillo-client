import React from 'react';

class DataEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
            <td>{this.props.data.id}</td>
            <td>
            <a href={"/api/data/" + this.props.data.id}>
            {this.props.data.temperature}
            </a>
            </td>
            </tr>
        );
    }
}

export default DataEntry;
