import React from "react";
import Styles from "./ResultsList.module.css";

export default class ResultsList extends React.Component {

    manageTableData() {
        let tableData = this.props.tableData;
        if (tableData.length < 1) {
            tableData = [{
                "placeholderfromcustomfile_LOCKEYSFORCUSTOMPLACEHOLDER::LocKey": "",
                "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_german: New Text": "",
                "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: New Text": "",
                "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: Filename": ""
            }]
        }
        return tableData;
    }

    render() {
        const data = this.manageTableData();
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
                <div className={Styles.table__container}>
                    <tbody>
                        {data.map((item, index) => (
                            <tr className={Styles.table__row} key={index}>
                                <th scope="row">{item["placeholderfromcustomfile_LOCKEYSFORCUSTOMPLACEHOLDER::LocKey"]}</th>
                                <td headers="german text">{item["placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_german: New Text"]}</td>
                                <td headers="english text">{item["placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: New Text"]}</td>
                                <td headers="english filename">{item["placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: Filename"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </table>
        )
    }
}

/* {
                        <tr className={Styles.table__row}>
                            <th scope="row">{data[0]["placeholderfromcustomfile_LOCKEYSFORCUSTOMPLACEHOLDER::LocKey"]}</th>
                            <td headers="german text">{data[0]["placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_german: New Text"]}</td>
                            <td headers="english text">{data[0]["placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: New Text"]}</td>
                            <td headers="english filename">{data[0]["placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: Filename"]}</td>
                        </tr>
                    } */