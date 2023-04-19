import React from "react";
import Styles from "./ResultsList.module.css";

export default class ResultsList extends React.Component {

    manageTableDataLanguage(selectedLanguage) {
        const languageOptions = {
            German: "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_german: New Text",
            French: "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_french: New Text",
            Korean: "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_korean: New Text",
            Russian: "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_russian: New Text",
            "Simp Chinese": "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_simp_chinese: New Text",
            Spanish: "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_spanish: New Text"
        }
        const selectedLanguageKey = languageOptions[selectedLanguage];
        return selectedLanguageKey
    }

    manageTableData() {
        let tableData = this.props.tableData;
        if (tableData.length < 1) {
            tableData = [{
                "placeholderfromcustomfile_LOCKEYSFORCUSTOMPLACEHOLDER::LocKey": "",
                "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: New Text": "",
                "placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: Filename": ""
            }]
            const language = this.manageTableDataLanguage(this.props.languageSelected);
            tableData[0][language] = "";
        }
        return tableData;
    }

    render() {
        const data = this.manageTableData();
        const language = this.manageTableDataLanguage(this.props.languageSelected);
        return (
            <div className={Styles.table__container}>
                <table className={Styles.table}>
                    <thead className={Styles.table__header}>
                        <tr>
                            <th scope="col">Lockey</th>
                            <th scope="col">{this.props.languageSelected}</th>
                            <th scope="col">I_english: New Text</th>
                            <th scope="col">I_english:Filename</th>
                        </tr>
                    </thead>

                    <tbody className={Styles.table__body}>
                        {data.map((item, index) => (
                            <tr className={Styles.table__row} key={index}>
                                <th scope="row">{item["placeholderfromcustomfile_LOCKEYSFORCUSTOMPLACEHOLDER::LocKey"]}</th>
                                <td headers="selected language text">{item[language]}</td>
                                <td headers="english text">{item["placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: New Text"]}</td>
                                <td headers="english filename">{item["placeholderfromcustomfile_lockeysforcustomplaceholder_EXCELFROMMEMOQ::l_english: Filename"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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