import React from "react";
import Styles from "./Styles.module.css";

export class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'Paste your string here' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        //This handles storing/processing the string
    }

    /* handleSubmit(event) {
      
      event.preventDefault();
    } */

    render() {
        return (
            <form className={Styles.form} onSubmit={this.handleSubmit}>
                <div className={Styles.searchWrapper}>
                    <div className={Styles.searchInputWrapper}><label className={Styles.searchInput} for="searchInput"> Search Input</label></div>
                    <button className={Styles.button} type="button">Clear</button>
                </div>
                <textarea className={Styles.textArea} name="searchInput" value={this.state.value} onChange={this.handleChange} />
            </form>
        );
    }
}