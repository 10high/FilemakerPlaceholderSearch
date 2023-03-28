import React from "react";
import Styles from "./Styles.module.css";

export default class PlaceholderDefinition extends React.Component {
    render() {
        return (
            <section className={Styles.section}>
                <span className={Styles.section__headerWrapper}>
                    <h2 className={Styles.section__header}>Placeholder Definition</h2>
                </span>
                <div className={Styles.section__bodyWrapper}>
                    <p className={Styles.section__bodyText}>{this.props.placeholderDefinition}</p>
                </div>
            </section>
        )
    }
}