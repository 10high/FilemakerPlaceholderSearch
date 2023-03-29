import React from "react";
import Styles from "./ResultsPreview.module.css";

export default class ResultsPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = { previewText: "Your preview will be displayed here" }
    }
    handleChange() {
        //This will handle searching and tagging preview text for display
    }
    render() {
        return (
            <div className={Styles.preview__Wrapper}>
                <p className={Styles.preview__text}>{this.state.previewText}</p>
            </div>
        )
    }
}