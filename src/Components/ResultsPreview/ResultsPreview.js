import React from "react";
import Styles from "./ResultsPreview.module.css";

export default class ResultsPreview extends React.Component {

    extractPreviewText(data, language, sourceTarget) {
        //this needs to extract the previewText based on language and sourceTarget
    }

    render() {
        const previewText = this.extractPreviewText(this.props.previewTextData, this.props.languageSelected, this.props.sourceTarget)
        return (
            <div className={Styles.preview__Wrapper}>
                <div
                    className={Styles.preview__text}
                    dangerouslySetInnerHTML={{ __html: previewText }}></div>
            </div>
        )
    }
}