import React from "react";
import Styles from "./SelectedPlaceholder.module.css"

export default class SelectedPlaceholder extends React.Component {

    formatPreviewText(text) {
        //this needs to strip any unnecessary HTML tags from the text
    }

    render() {
        const formattedPreviewText = this.formatPreviewText(this.props.selectedPlaceholderPreview)
        return (
            <div className={Styles.selectedPlaceholder__Wrapper}>
                <div className={Styles.selectedPlaceholder}
                    dangerouslySetInnerHTML={{ __html: formattedPreviewText }}>

                </div>
            </div>
        )
    }
}