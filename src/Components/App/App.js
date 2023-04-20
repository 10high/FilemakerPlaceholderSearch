import React from "react";
import Header from "../Header/Header";
import LanguageRadioButtons from "../LanguageRadioButtons/LanguageRadioButtons";
import SearchInput from "../SearchInput/SearchInput";
import SourceTarget from "../SourceTarget/SourceTarget";
import SelectedPlaceholder from "../SelectedPlaceholder/SelectedPlaceholder";
import PlaceholderSearch from "../PlaceholderSearch/PlaceholderSearch";
import ResultsList from "../ResultsList/ResultsList";
import ResultsPreview from "../ResultsPreview/ResultsPreview";
import PlaceholderDefinition from "../PlaceholderDefinition/PlaceholderDefinition";
import Styles from "./App.module.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRecords: {},
            placeholders: [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
            searchInputValue: "Paste your string here",
            isSelected: [false, false, false, false, false, false,],
            placeholderRecordIds: [0, 0, 0, 0, 0, 0],
            placeholderName: "",
            placeholderDefinitionData: "",
            tableData: [],
            sourceTargetSelectedOption: "source",
            languageButtonsSelectedOption: "German",
            previewTextData: "",
            selectedPlaceholderPreview: ""
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleClearOnClick = this.handleClearOnClick.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.updateplaceholdersearchvalue = this.updateplaceholdersearchvalue.bind(this);
        this.sourceTargetHandleOptionChange = this.sourceTargetHandleOptionChange.bind(this);
        this.languageButtonsHandleOptionChange = this.languageButtonsHandleOptionChange.bind(this);
    }

    handleOnChange(event) {
        this.setState(
            {
                searchInputValue: event.target.value
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

    async fetchSetSearchGlobalField() {
        const credentials = this.checkCredentials();
        const searchInput = encodeURIComponent(this.state.searchInputValue)
        fetch("../../build/php/setSearchGlobalField.php?url=nativeprime-fm.dyndns.org", {
            headers: {
                "User": credentials[0],
                "Password": credentials[1],
                "SearchInput": searchInput
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


    async fetchRunScript(scriptname, placeholderNumber) {
        return fetch("../../build/php/runScript.php?url=nativeprime-fm.dyndns.org", {
            headers: {
                "User": this.state.username,
                "Password": this.state.password,
                "ScriptName": scriptname,
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
        await this.fetchSetSearchGlobalField();

        const placeholderNumbers = ["first", "second", "third", "fourth", "fifth", "sixth"];
        const fetchPlaceholderRecords = await Promise.allSettled(
            placeholderNumbers.map(async number => await this.fetchRunScript("Search For extracted Placeholder", number))
        )

        const placeholderRecords = fetchPlaceholderRecords.map(item => item.value);
        console.log(placeholderRecords);

        //const allRecordsAsObject = this needs to separate the records and store each under the RecordID as key 

        //const placeholderValues = This needs to update this.state.placeholders

        /*   this.setState({
              allRecords: allRecordsAsObject,
              placeholders: placeholderValues,
              previewText: "Your preview will be displayed here",
              placeholderDefinition: "",
              placeholderName: "",
              tableData: [],
              isSelected: [false, false, false, false, false, false,]
          }) */
    }



    updateplaceholdersearchvalue(number, recordID) {

        const updatedIsSelected = [];
        for (let i = 0; i < 6; i++) {
            if (i === number - 1) {
                updatedIsSelected[i] = true;
            } else {
                updatedIsSelected[i] = false;
            }
        }

        const recordData = this.state.allRecords[recordID];

        const placeholderName = recordData.data[0].fieldData.Placeholder_Name_view;

        const placeholderDefinitionData = recordData.data[0].fieldData.Placeholder_Definition_view;

        const tableData = recordData.data[0].portalData.placeholderfromcustomfile_LOCKEYSFORCUSTOMPLACEHOLDER;

        // const previewTextData = This needs to extract the preview TextData for all languages and SourceTarget
        //The ResultsPreview component will extract the relevant data depending on language and Source Target




        this.setState({
            isSelected: updatedIsSelected,
            placeholderName: placeholderName,
            placeholderDefinitionData: placeholderDefinitionData,
            tableData: tableData,
            //  previewText: previewTextData
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

                    <SelectedPlaceholder
                        selectedPlaceholderPreview={this.state.selectedPlaceholderPreview} />

                    <div className={Styles.searchResults__container}>
                        <div className={Styles.searchResults__placeholderSearchWrapper}>
                            <PlaceholderSearch
                                number="1"
                                placeholder={this.state.placeholders[0]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[0]}
                                recordid={this.state.placeholderRecordIds[0]} />
                            <PlaceholderSearch
                                number="2"
                                placeholder={this.state.placeholders[1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[1]}
                                recordid={this.state.placeholderRecordIds[1]} />
                            <PlaceholderSearch
                                number="3"
                                placeholder={this.state.placeholders[2]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[2]}
                                recordid={this.state.placeholderRecordIds[2]} />
                            <PlaceholderSearch
                                number="4"
                                placeholder={this.state.placeholders[3]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[3]}
                                recordid={this.state.placeholderRecordIds[3]} />
                            <PlaceholderSearch
                                number="5"
                                placeholder={this.state.placeholders[4]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[4]}
                                recordid={this.state.placeholderRecordIds[4]} />
                            <PlaceholderSearch
                                number="6"
                                placeholder={this.state.placeholders[5]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[5]}
                                recordid={this.state.placeholderRecordIds[5]} />
                        </div>
                        <ResultsList
                            tableData={this.state.tableData}
                            languageSelected={this.state.languageButtonsSelectedOption} />
                    </div>
                    <div className={Styles.previewDefinitionWrapper}>

                        <div className={Styles.resultsPreview}>
                            <ResultsPreview
                                previewTextData={this.state.previewTextData}
                                languageSelected={this.state.languageButtonsSelectedOption}
                                sourceTarget={this.state.sourceTargetSelectedOption} />
                        </div>
                        <div className={Styles.placeholderDefinition}>
                            <PlaceholderDefinition
                                placeholderDefinitionData={this.state.placeholderDefinitionData} />
                        </div>
                    </div>
                    <div className={Styles.placeholderDefinition2}>
                        <PlaceholderDefinition
                            placeholderDefinitionData={this.state.placeholderDefinitionData} />
                    </div>

                </main>
            </div>
        );
    }
}