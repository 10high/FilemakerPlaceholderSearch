import React from "react";
import Styles from "./Styles.module.css";

export class ResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tableData: {} };
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
                    {data.map((val, key) => (
                        <tr className={Styles.table__row} key={key}>
                            <th scope="row">{val.lockey/* change key to actual used!! */}</th>
                            <td headers="german text">{val.german /* change key to actual used!! */}</td>
                            <td headers="english text">{val.english/* change key to actual used!! */}</td>
                            <td headers="english filename">{val.filenam/* change key to actual used!! */}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}