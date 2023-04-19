import React from "react";
import Header from "../Header/Header";
import LanguageRadioButtons from "../LanguageRadioButtons/LanguageRadioButtons";
import SearchInput from "../SearchInput/SearchInput";
import SourceTarget from "../SourceTarget/SourceTarget";
import PlaceholderSearch from "../PlaceholderSearch/PlaceholderSearch";
import ResultsList from "../ResultsList/ResultsList";
import ResultsPreview from "../ResultsPreview/ResultsPreview";
import PlaceholderDefinition from "../PlaceholderDefinition/PlaceholderDefinition";
import Styles from "./App.module.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholders: [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
            searchInputValue: "Paste your string here",
            isSelected: [false, false, false, false, false, false,],
            placeholderRecordIds: [0, 0, 0, 0, 0, 0],
            placeholderName: "",
            placeholderDefinition: "",
            tableData: [],
            sourceTargetSelectedOption: "source",
            languageButtonsSelectedOption: "German"
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleClearOnClick = this.handleClearOnClick.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.updateplaceholdersearchvalue = this.updateplaceholdersearchvalue.bind(this);
        this.sourceTargetHandleOptionChange = this.sourceTargetHandleOptionChange.bind(this);
        this.languageButtonsHandleOptionChange = this.languageButtonsHandleOptionChange.bind(this);
    }

    extractPlaceholders(input) {
        const initialMatchArr = input.match(/\[[^\]]*\('.*?\)[^\]]*\]/g) || [];
        const placeholderArr = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]];
        for (let i = 0; i < 6; i++) {
            if (initialMatchArr[i]) {
                placeholderArr[i][0] = initialMatchArr[i];  //matches [ to ]
                placeholderArr[i][1] = initialMatchArr[i].match(/\('(\w+)'/)[1]; //matches between ' '
            } else {
                for (let j = 0; j < 2; j++) {
                    placeholderArr[i][j] = "";
                }
            }
        }
        return placeholderArr;
    }

    handleOnChange(event) {
        const updatePlaceholders = this.extractPlaceholders(event.target.value);
        this.setState(
            {
                searchInputValue: event.target.value,
                placeholders: updatePlaceholders
            }
        )
    }

    handleClearOnClick() {
        this.setState({
            searchInputValue: "Paste your string here",
            placeholders: ["", "", "", "", "", ""],
            placeholderRecordIds: [0, 0, 0, 0, 0, 0],
            placeholderDefinition: "",
            isSelected: [false, false, false, false, false, false,]
        })
    }

    sourceTargetHandleOptionChange(option) {
        this.setState({
            sourceTargetSelectedOption: option
        })
    }

    languageButtonsHandleOptionChange(option) {
        this.setState({
            languageButtonsSelectedOption: option
        })
    }


    getUsername() {
        let username = prompt("Please enter your username:");
        this.setState({
            username: username
        })
        return username
    }

    getPassword() {
        let password = prompt("Please enter your password:");
        this.setState({
            password: password
        })
        return password
    }

    checkCredentials() {
        let credentials = [this.state.username, this.state.password]
        if (!credentials[0]) credentials[0] = this.getUsername();
        if (!credentials[1]) credentials[1] = this.getPassword();
        return credentials
    }

    async fetchSetAllGlobalFields() {
        const credentials = this.checkCredentials();
        const searchInput = encodeURIComponent(this.state.searchInputValue)
        fetch("../../build/php/setAllGlobalFields.php?url=nativeprime-fm.dyndns.org", {
            headers: {
                "User": credentials[0],
                "Password": credentials[1],
                "SearchInput": searchInput,
                "SourceTarget": this.state.sourceTargetSelectedOption,
                "Language": this.state.languageButtonsSelectedOption
            }
        })
            .then(response => response.json())

            .catch(error => {
                console.error(error);
                this.setState({
                    username: "",
                    password: ""
                })
                alert("Something went wrong!\n\nPerhaps you entered your username or password incorrectly.\nPlease check and enter them again when prompted.\n\nIf the problem persists, please contact Friedrich.")
            });
    }

    async fetchRunScript(placeholderNumber) {
        return fetch("../../build/php/runScript.php?url=nativeprime-fm.dyndns.org", {
            headers: {
                "User": this.state.username,
                "Password": this.state.password,
                "PlaceholderNumber": placeholderNumber
            }
        })
            .then(response => response.json())
            .then(data => {
                return data.response.response.scriptResult;
            })
            .catch(error => {
                console.error(error);
            });
    }

    async handleOnBlur() {
        await this.fetchSetAllGlobalFields()
        const placeholderNumbers = ["first", "second", "third", "fourth", "fifth", "sixth"];
        const fetchPlaceholderRecordIDs = await Promise.allSettled(
            placeholderNumbers.map(async number => await this.fetchRunScript(number))
        )
        const updatedPlaceholderRecordIDs = fetchPlaceholderRecordIDs.map(item => item.value);
        this.setState({
            placeholderRecordIds: updatedPlaceholderRecordIDs
        })
    }

    async fetchGetRecord(recordID) {
        return fetch("../../build/php/getRecord.php?url=nativeprime-fm.dyndns.org", {
            headers: {
                "User": this.state.username,
                "Password": this.state.password,
                "RecordID": recordID
            }
        })
            .then(response => response.json())
            .then(data => {
                return data.response.response
            })
            .catch(error => {
                console.error(error);
            });
    }

    async updateplaceholdersearchvalue(number, recordID) {
        const recordData = await this.fetchGetRecord(recordID);
        console.log(recordData);
        const placeholderName = recordData.data[0].fieldData.Placeholder_Name_view;
        const placeholderDefinition = recordData.data[0].fieldData.Placeholder_Definition_view;
        const formattedDefinition = placeholderDefinition.replace(/\n/g, '<br>');
        const tableData = recordData.data[0].portalData.placeholderfromcustomfile_LOCKEYSFORCUSTOMPLACEHOLDER;

        const updatedIsSelected = [];
        for (let i = 0; i < 6; i++) {
            if (i === number - 1) {
                updatedIsSelected[i] = true;
            } else {
                updatedIsSelected[i] = false;
            }
        }


        this.setState({
            isSelected: updatedIsSelected,
            placeholderName: placeholderName,
            placeholderDefinition: formattedDefinition,
            tableData: tableData
        });
    }


    render() {
        return (
            <div className={Styles.app__container}>
                <Header
                    placeholdername={this.state.placeholderName} />
                <main className={Styles.app__main}>
                    <div className={Styles.searchInput__container}>
                        <SearchInput
                            onClick={this.handleClearOnClick}
                            value={this.state.searchInputValue}
                            onChange={this.handleOnChange}
                            placeholdersearchvalue={this.state.placeholderSearchValue}
                            onBlur={this.handleOnBlur}
                        />
                        <div className={Styles.radioButtons__container}>
                            <LanguageRadioButtons
                                languageButtonsSelectedOption={this.state.languageButtonsSelectedOption}
                                languageButtonsHandleOptionChange={this.languageButtonsHandleOptionChange} />
                            <SourceTarget
                                sourceTargetSelectedOption={this.state.sourceTargetSelectedOption}
                                sourceTargetHandleOptionChange={this.sourceTargetHandleOptionChange} />
                        </div>
                    </div>
                    <div className={Styles.searchResults__container}>
                        <div className={Styles.searchResults__placeholderSearchWrapper}>
                            <PlaceholderSearch
                                number="1"
                                placeholder={this.state.placeholders[0][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[0]}
                                recordid={this.state.placeholderRecordIds[0]} />
                            <PlaceholderSearch
                                number="2"
                                placeholder={this.state.placeholders[1][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[1]}
                                recordid={this.state.placeholderRecordIds[1]} />
                            <PlaceholderSearch
                                number="3"
                                placeholder={this.state.placeholders[2][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[2]}
                                recordid={this.state.placeholderRecordIds[2]} />
                            <PlaceholderSearch
                                number="4"
                                placeholder={this.state.placeholders[3][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[3]}
                                recordid={this.state.placeholderRecordIds[3]} />
                            <PlaceholderSearch
                                number="5"
                                placeholder={this.state.placeholders[4][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[4]}
                                recordid={this.state.placeholderRecordIds[4]} />
                            <PlaceholderSearch
                                number="6"
                                placeholder={this.state.placeholders[5][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[5]}
                                recordid={this.state.placeholderRecordIds[5]} />
                        </div>
                        <ResultsList
                            tableData={this.state.tableData} />
                    </div>
                    <div className={Styles.previewDefinitionWrapper}>

                        <div className={Styles.resultsPreview}>
                            <ResultsPreview />
                        </div>
                        <div className={Styles.placeholderDefinition}>
                            <PlaceholderDefinition
                                placeholderDefinition={this.state.placeholderDefinition} />
                        </div>
                    </div>
                    <div className={Styles.placeholderDefinition2}>
                        <PlaceholderDefinition
                            placeholderDefinition={this.state.placeholderDefinition} />
                    </div>

                </main>
            </div>
        );
    }
}