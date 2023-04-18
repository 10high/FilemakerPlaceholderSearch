import React from "react";
import Header from "../Header/Header";
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
            tableData: []
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleClearOnClick = this.handleClearOnClick.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.updateplaceholdersearchvalue = this.updateplaceholdersearchvalue.bind(this);
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

    getUsername() {
        let username = prompt("Please enter your username:");
        this.setState({
            username: username
        })
        return username;
    }

    getPassword() {
        let password = prompt("Please enter your password:");
        this.setState({
            password: password
        })
        return password;
    }

    async fetchSetGlobalField() {
        let username = this.state.username;
        if (!username) {
            username = this.getUsername()
        }
        let password = this.state.password;
        if (!password) {
            password = this.getPassword()
        }
        const searchInput = encodeURIComponent(this.state.searchInputValue)
        fetch("../../build/php/setGlobalField.php?url=nativeprime-fm.dyndns.org", {
            headers: {
                "User": username,
                "Password": password,
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
        await this.fetchSetGlobalField()
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
        /* const placeholderSearchValue = this.state.placeholders[value - 1];
         let updatedSearchInputValue = this.state.searchInputValue;
         const outerPlaceholderRegEx = new RegExp(`${placeholderSearchValue[0]}`);
         updatedSearchInputValue = updatedSearchInputValue.replace(outerPlaceholderRegEx, `<span className={Styles.outerPlaceholderHighlight}>${outerPlaceholderRegEx}</span>`)
         this.setState({
             searchInputValue: updatedSearchInputValue
         }) */
        //This is for highlighting the searched placeholder in the text area
        //But this is not possible in textarea and requires faking it

        const updatedIsSelected = [];
        for (let i = 0; i < 6; i++) {
            if (i === number - 1) {
                updatedIsSelected[i] = true;
            } else {
                updatedIsSelected[i] = false;
            }
        }

        const recordData = await this.fetchGetRecord(recordID);
        console.log(recordData);
        const placeholderName = recordData.data[0].fieldData.Placeholder_Name_view;
        const placeholderDefinition = recordData.data[0].fieldData.Placeholder_Definition_view;
        const formattedDefinition = placeholderDefinition.replace(/\n/g, '<br>');
        const tableData = recordData.data[0].portalData.placeholderfromcustomfile_LOCKEYSFORCUSTOMPLACEHOLDER;
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
                        <SourceTarget />
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