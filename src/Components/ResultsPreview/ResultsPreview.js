import React from "react";
import Styles from "./ResultsPreview.module.css";

export default class ResultsPreview extends React.Component {


    render() {
        const previewText = this.props.resultsPreview[this.props.resultsPreviewKey];
        return (
            <div className={Styles.preview__Wrapper}>
                <div
                    className={Styles.preview__text}
                    dangerouslySetInnerHTML={{ __html: previewText }}></div>
            </div>
        )
    }
}