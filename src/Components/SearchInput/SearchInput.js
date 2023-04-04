import React from "react";
import Styles from "./SearchInput.module.css";

export default class SearchInput extends React.Component {

    render() {
        return (
            <form className={Styles.form}>
                <div className={Styles.searchWrapper}>
                    <div className={Styles.searchInputWrapper}>
                        <h2 className={Styles.searchInput}>Search Input</h2>
                        <button className={Styles.button}
                            type="button"
                            onClick={this.props.onClick}>
                            Clear
                        </button>
                    </div>
                    <textarea
                        className={Styles.textArea}
                        name="searchInput"
                        value={this.props.value}
                        onChange={this.props.onChange}
                        placeholdersearchvalue={this.props.placeholdersearchvalue}
                    />
                </div>
            </form>
        );
    }
}