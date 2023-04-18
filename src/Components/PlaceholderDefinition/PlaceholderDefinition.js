import React from "react";
import Styles from "./PlaceholderDefinition.module.css";

export default class PlaceholderDefinition extends React.Component {
    render() {
        return (
            <section className={Styles.section}>
                <div className={Styles.section__headerWrapper}>
                    <h2 className={Styles.section__header}>Placeholder Definition</h2>
                </div>
                <div className={Styles.section__bodyWrapper}>
                    <div className={Styles.section__bodyText}
                        dangerouslySetInnerHTML={{ __html: this.props.placeholderDefinition }}>
                    </div>
                </div>
            </section>
        )
    }
}