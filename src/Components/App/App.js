import React from "react";
import Header from "../Header/Header";
import LanguageRadioButtons from "../LanguageRadioButtons/LanguageRadioButtons";
import SearchInput from "../SearchInput/SearchInput";
import SourceTarget from "../SourceTarget/SourceTarget";
import SelectedPlaceholder from "../SelectedPlaceholder/SelectedPlaceholder";
import PlaceholderSearch from "../PlaceholderSearch/PlaceholderSearch";
import ResultsList from "../ResultsList/ResultsList";
import ResultsPreview from "../ResultsPreview/ResultsPreview";
import ParentPlaceholder from "../ParentPlaceholder/ParentPlaceholder";
import PlaceholderDefinition from "../PlaceholderDefinition/PlaceholderDefinition";
import Styles from "./App.module.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRecords: [],
            placeholders: [],
            searchInputValue: "Paste your string here",
            isSelected: [false, false, false, false, false, false,],
            placeholderName: "",
            placeholderDefinitionData: "",
            resultsListData: {},
            sourceTargetSelectedOption: "source",
            languageButtonsSelectedOption: "German",
            resultsPreview: {},
            selectedPlaceholderPreview: "",
            parentPlaceholderNameBody: "",
            parentPlaceholderSuffixBody: "",
            parentPlaceholderListeLocBody: []
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleClearOnClick = this.handleClearOnClick.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.updateplaceholdersearchvalue = this.updateplaceholdersearchvalue.bind(this);
        this.sourceTargetHandleOptionChange = this.sourceTargetHandleOptionChange.bind(this);
        this.languageButtonsHandleOptionChange = this.languageButtonsHandleOptionChange.bind(this);
    }

    //Sent from SearchInput TextArea onChange (Passed in as prop)
    handleOnChange(event) {
        this.setState(
            {
                searchInputValue: event.target.value
            }
        )
    }

    clearSearchInputValue() {
        this.setState({
            searchInputValue: "Paste your string here"
        })
    }

    clearEverythingElse() {
        this.setState({
            allRecords: [],
            placeholders: [],
            isSelected: [false, false, false, false, false, false,],
            placeholderName: "",
            placeholderDefinitionData: "",
            resultsListData: {},
            resultsPreview: {},
            selectedPlaceholderPreview: "",
            parentPlaceholderNameBody: "",
            parentPlaceholderSuffixBody: "",
            parentPlaceholderListeLocBody: []
        })
    }

    //Sent from SearchInput Clear Button (passed in as prop)
    handleClearOnClick() {
        this.clearSearchInputValue();
        this.clearEverythingElse();
    }

    //sent from SourceTarget (passed in as prop)
    sourceTargetHandleOptionChange(option) {
        this.setState({
            sourceTargetSelectedOption: option
        })
    }

    //sent from LanguageRadioButtons (passed in as prop)
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
        fetch("./php/setSearchGlobalField.php?url=nativeprime-fm.dyndns.org", {
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


    async fetchRunScript(placeholderNumber) {
        return fetch("./php/runScript.php?url=nativeprime-fm.dyndns.org", {
            headers: {
                "User": this.state.username,
                "Password": this.state.password,
                "PlaceholderNumber": placeholderNumber
            }
        })
            .then(response => response.json())
            .then(data => {
                return JSON.parse(data.response.response.scriptResult);
            })
            .catch(error => {
                console.error(error);
            });
    }

    //Extracts the placeholders but result is used only as reference array 
    //to loop over when sending runScripts()
    extractNumberOfPlaceholders() {
        const inputString = this.state.searchInputValue;
        const matches = inputString.match(/\('(\w+)'/g);
        return matches ? matches.length : 0;
    }

    async runScripts(placeholderNumbers) {
        const fetchPlaceholderRecords = await Promise.allSettled(
            placeholderNumbers.map(async number => await this.fetchRunScript(number))
        )

        const placeholderRecords = fetchPlaceholderRecords.map(item => item.value);

        const placeholderValues = placeholderRecords.map(item => item.PlaceholderName)

        this.setState({
            allRecords: placeholderRecords,
            placeholders: placeholderValues
        })
    }

    //Sent from SearchInput Search Button (Passed in as prop)
    async handleSearchInput() {
        this.clearEverythingElse();

        const numberOfMatches = this.extractNumberOfPlaceholders();
        if (numberOfMatches < 1) return;

        const allPlaceholderNumbers = ["first", "second", "third", "fourth", "fifth", "sixth"];
        const placeholderNumbers = allPlaceholderNumbers.slice(0, numberOfMatches);

        await this.fetchSetSearchGlobalField();

        //This delay is "necessary", requested by client to account for calculations performed by Filemaker
        //after SearchInput Textarea is updated. If the scripts here run too soon, can result in Filemaker 
        //returning nonsense
        setTimeout(() => {
            this.runScripts(placeholderNumbers)
        }, 500)

    }


    //Sent from SelectedPlaceholder Search Button (Passed in as prop)
    updateplaceholdersearchvalue(number) {
        const updatedIsSelected = [];
        for (let i = 0; i < 6; i++) {
            if (i === number - 1) {
                updatedIsSelected[i] = true;
            } else {
                updatedIsSelected[i] = false;
            }
        }

        const recordData = this.state.allRecords[number - 1];
        const placeholderName = recordData.PlaceholderName;
        const placeholderDefinitionData = recordData.PlaceholderDefinition;
        const resultsListData = recordData["PortalData:"][0];
        const selectedPlaceholder = recordData["SearchInputHTML:"];
        const resultsPreviewObject = {
            source: recordData.SearchInputPlaceholderRemovedHTML_English,
            French: recordData.SearchInputPlaceholderRemovedHTML_French,
            German: recordData.SearchInputPlaceholderRemovedHTML_German,
            Korean: recordData.SearchInputPlaceholderRemovedHTML_Korean,
            Russian: recordData.SearchInputPlaceholderRemovedHTML_Russian,
            "Simp Chinese": recordData["SearchInputPlaceholderRemovedHTML_Simp Chinese"],
            Spanish: recordData.SearchInputPlaceholderRemovedHTML_Spanish
        }
        const parentPlaceholderName = recordData.ParentPlaceholderName;
        const parentPlaceholderSuffix = recordData.ParentPlaceholderSuffix;
        //Extracts list of items separated by \r into array to pass to ParentPLaceholder
        const parentPlaceholderListLocKeys = () => recordData.ParentPlaceholderListLocKeys.match(/[^\r]+/g);

        this.setState({
            isSelected: updatedIsSelected,
            placeholderName: placeholderName,
            placeholderDefinitionData: placeholderDefinitionData,
            resultsListData: resultsListData,
            resultsPreview: resultsPreviewObject,
            selectedPlaceholderPreview: selectedPlaceholder,
            parentPlaceholderNameBody: parentPlaceholderName,
            parentPlaceholderSuffixBody: parentPlaceholderSuffix,
            parentPlaceholderListeLocBody: parentPlaceholderListLocKeys()
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
                            onClickSearch={this.handleSearchInput}
                            onClickClear={this.handleClearOnClick}
                            value={this.state.searchInputValue}
                            onChange={this.handleOnChange}
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
                            />
                            <PlaceholderSearch
                                number="2"
                                placeholder={this.state.placeholders[1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[1]}
                            />
                            <PlaceholderSearch
                                number="3"
                                placeholder={this.state.placeholders[2]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[2]}
                            />
                            <PlaceholderSearch
                                number="4"
                                placeholder={this.state.placeholders[3]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[3]}
                            />
                            <PlaceholderSearch
                                number="5"
                                placeholder={this.state.placeholders[4]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[4]}
                            />
                            <PlaceholderSearch
                                number="6"
                                placeholder={this.state.placeholders[5]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[5]}
                            />
                        </div>
                        <ResultsList
                            resultsListData={this.state.resultsListData}
                            languageSelected={this.state.languageButtonsSelectedOption} />
                    </div>
                    <div className={Styles.previewDefinitionWrapper}>

                        <div className={Styles.resultsPreview}>
                            <ResultsPreview
                                resultsPreview={this.state.resultsPreview}
                                //Passes in object key, which is either "source" or the name of the language
                                resultsPreviewKey={this.state.sourceTargetSelectedOption === "source" ? "source" : this.state.languageButtonsSelectedOption}
                            />
                        </div>
                        <div className={Styles.placeholderDefinition}>
                            <PlaceholderDefinition
                                placeholderDefinitionData={this.state.placeholderDefinitionData} />
                        </div>
                        <div className={Styles.parentPlaceholderWrapper}>
                            <ParentPlaceholder
                                header="Parent_Placeholder_Name"
                                //Passes normal text
                                body={this.state.parentPlaceholderNameBody} />
                            <ParentPlaceholder
                                header="Parent_Placeholder_Suffix"
                                //passes normal text
                                body={this.state.parentPlaceholderSuffixBody} />
                            <ParentPlaceholder
                                header="Parent_Placeholder_ListLocKeys"
                                //passes text separated by \r
                                list={this.state.parentPlaceholderListeLocBody} />
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