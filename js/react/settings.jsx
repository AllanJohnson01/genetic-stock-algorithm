import React from 'react';
import ReactDOM from 'react-dom';

var Settings = React.createClass({
    getInitialState: function () {
        return {numInvestors: this.props.numInvestors}
    },

    onChange: function(e) {
        this.setState({
            numInvestors: e.target.value
        });
    },

    render: function () {
        return (
            <div>
                <form>
                    <fieldset>
                        <legend>Settings:</legend>
                            <p>How many investors should each generagion hold: </p>
                            <input type="text" name={this.state.numInvestors} value={this.state.numInvestors} onChange={this.onChange}/>
                            <p>{this.state.numInvestors}</p>

                    </fieldset>
                </form>
            </div>
        )
    }
});

ReactDOM.render(<Settings numInvestors="20"/>, document.getElementById('settings'));

export default Settings;