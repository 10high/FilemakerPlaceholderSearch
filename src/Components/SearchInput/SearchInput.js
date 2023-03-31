import React from "react";
import Styles from "./SearchInput.module.css";

export default class SearchInput extends React.Component {

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
                        defaultValue={this.props.value}
                        onBlur={this.props.onChange}
                    />
                </div>
            </form>
        );
    }
}