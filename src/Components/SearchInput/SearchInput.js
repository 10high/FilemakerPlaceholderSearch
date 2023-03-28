import React from "react";
import Styles from "./SearchInput.module.css";

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'Paste your string here' };
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        //This handles storing/processing the string
    }

    render() {
        return (
            <form className={Styles.form}>
                <div className={Styles.searchWrapper}>
                    <div className={Styles.searchInputWrapper}>
                        <h2 className={Styles.searchInput}>Search Input</h2>
                        <button className={Styles.button} type="button">Clear</button>
                    </div>
                    <textarea
                        className={Styles.textArea}
                        name="searchInput"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </div>
            </form>
        );
    }
}