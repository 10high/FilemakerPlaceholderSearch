import React from "react";
import Styles from "./Header.module.css";

export default class Header extends React.Component {
    render() {
        return (

            <header className={Styles.header}>
                <div className={Styles.headerWrapper}>
                    <h1 className={Styles.placeholderNameHeader}>Placeholder Name:
                        <span className={Styles.placeholderNameBody}>{this.props.placeholdername}</span>
                    </h1>
                    <h2 className={Styles.pageHeader}>Custom Placeholder Check</h2>
                </div>
                <h3 className={Styles.placeholderFilepath}>{`This is filepath text`/* Filepath to Placeholder goes here */}</h3>

            </header>
        )
    }
}