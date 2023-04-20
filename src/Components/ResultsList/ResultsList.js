import React from "react";
import Styles from "./ResultsList.module.css";

export default class ResultsList extends React.Component {

    manageTableDataLanguage(selectedLanguage) {
        const languageOptions = {
            German: "TextGerman",
            French: "TextFrench",
            Korean: "TextKorean",
            Russian: "TextRussian",
            "Simp Chinese": "TextSimpChinese",
            Spanish: "TextSpanish"
        }
        const selectedLanguageKey = languageOptions[selectedLanguage];
        return selectedLanguageKey
    }

    manageTableData() {
        let tableData = this.props.resultsListData;
        if (!tableData) {
            tableData = {
                Row_1: [{
                    "LocKey": "",
                    "TextEnglish": "",
                    "Filename": ""
                }]
            }
            const language = this.manageTableDataLanguage(this.props.languageSelected);
            tableData.Row_1[0][language] = "";
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
                        {
                            Object.values(data).map(value => (
                                <tr className={Styles.table__row} key={value[0].LocKey}>
                                    <th scope="row">{value[0].LocKey}</th>
                                    <td headers="selected language text">{value[0][language]}</td>
                                    <td headers="english text">{value[0].TextEnglish}</td>
                                    <td headers="english filename">{value[0].Filename}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    }
}