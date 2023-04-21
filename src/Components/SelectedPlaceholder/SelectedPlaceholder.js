import React from "react";
import Styles from "./SelectedPlaceholder.module.css"

export default class SelectedPlaceholder extends React.Component {

    render() {
        const formattedPreviewText = this.props.selectedPlaceholderPreview;
        return (
            <div className={Styles.selectedPlaceholder__Wrapper}>
                <div className={Styles.selectedPlaceholder}
                    dangerouslySetInnerHTML={{ __html: formattedPreviewText }}>
                </div>
            </div>
        )
    }
}