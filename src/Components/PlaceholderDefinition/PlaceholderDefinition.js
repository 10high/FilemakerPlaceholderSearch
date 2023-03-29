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
                    <p className={Styles.section__bodyText}> This is placeholder definition text{this.props.placeholderDefinition}</p>
                </div>
            </section>
        )
    }
}