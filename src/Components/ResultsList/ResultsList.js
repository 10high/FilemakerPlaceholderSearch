import React from "react";
import Styles from "./ResultsList.module.css";

export default class ResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tableData: { bg_random: { lockey: "lockkey", german: "German", english: "EN", filename: "filename" } } };
    };

    render() {
        const data = this.state.tableData;
        return (
            <table className={Styles.table}>
                <thead className={Styles.table__header}>
                    <tr>
                        <th scope="col">Lockey</th>
                        <th scope="col">I_german:New Text</th>
                        <th scope="col">I_english: New Text</th>
                        <th scope="col">I_english:Filename</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr className={Styles.table__row}>
                            <th scope="row">{data.bg_random.lockey/* change key to actual used!! */}</th>
                            <td headers="german text">{data.bg_random.german /* change key to actual used!! */}</td>
                            <td headers="english text">{data.bg_random.english/* change key to actual used!! */}</td>
                            <td headers="english filename">{data.bg_random.filename/* change key to actual used!! */}</td>
                        </tr>
                    }
                </tbody>
            </table>
        )
    }
}