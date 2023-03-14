import React from "react";

import Styles from "./Styles.module.css";

export class PlaceholderSearch extends React.Component {
    render() {
        return (
            <section className={Styles.section}>
                <div className={Styles.section__headerWrapper}>
                    <h2 className={Styles.section__header}>Placeholder {this.props.number}</h2>
                </div>
                <div className={Styles.section__placeholderWrapper}>
                    <p className={Styles.section__placeholderText}>{this.props.placeholder}</p>
                </div>
                <button className={Styles.section__button} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#FFF" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
            </section>
        )
    }
}