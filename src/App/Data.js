import React from 'react';
import DataEntry from './DataEntry.js';

class Data extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
        };

        this.updateData = this.updateData.bind(this);
        this.updateData();
        this.updateTimer = setInterval(() => this.updateData(), 500);
    }

    render() {
        let rows = []

        for (let i = 0; i < this.state.entries.length; i++) {
            rows.push( <li><DataEntry data={this.state.entries[i]} /></li> );
        }

        return (
            <div>
            <table>
            <tr>
            <th>ID #</th>
            <th>Temperature</th>
            </tr>
            {rows}
            </table>
            </div>
        );
    }

    updateData() {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => this.setState({ entries: data }) );
    }
}

export default Data;
