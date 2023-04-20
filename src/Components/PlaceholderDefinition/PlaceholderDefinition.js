import React from "react";
import Styles from "./PlaceholderDefinition.module.css";

export default class PlaceholderDefinition extends React.Component {

    formatDefinitionData(data) {
        return data.replace(/\n/g, '<br>');
    }



    render() {
        const formattedData = this.formatDefinitionData(this.props.placeholderDefinitionData);
        return (
            <section className={Styles.section}>
                <div className={Styles.section__headerWrapper}>
                    <h2 className={Styles.section__header}>Placeholder Definition</h2>
                </div>
                <div className={Styles.section__bodyWrapper}>
                    <div className={Styles.section__bodyText}
                        dangerouslySetInnerHTML={{ __html: formattedData }}>
                    </div>
                </div>
            </section>
        )
    }
}