import React from "react";
import styles from "./styles.module.css";

export default class Header extends React.Component {
    render() {
        return (

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <h1 className={styles.placeholderNameHeader}>Placeholder Name:
                        <span className={styles.placeholderNameBody}>{/* PLaceholder Value goes here */}</span>
                    </h1>
                    <h2 className={styles.pageHeader}>Custom Placeholder Check</h2>
                </div>
                <h3 className={styles.placeholderFilepath}>{/* Filepath to Placeholder goes here */}</h3>

            </header>
        )
    }
}