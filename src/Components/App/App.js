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
            isSelected: [false, false, false, false, false, false,]
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
    handleOnBlur(event) {
        //this will be used to send server request
    }

    handleClearOnClick() {
        this.setState({
            searchInputValue: "Paste your string here",
            placeholders: ["", "", "", "", "", ""]
        })
    }

    updateplaceholdersearchvalue(value) {
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
            if (i === value - 1) {
                updatedIsSelected[i] = true;
            } else {
                updatedIsSelected[i] = false;
            }
        }
        this.setState({ isSelected: updatedIsSelected })
    }


    render() {
        return (
            <div className={Styles.app__container}>
                <Header />
                <main className={Styles.app__main}>
                    <div className={Styles.searchInput__container}>
                        <SearchInput
                            onClick={this.handleClearOnClick}
                            value={this.state.searchInputValue}
                            onChange={this.handleOnChange}
                            placeholdersearchvalue={this.state.placeholderSearchValue}
                        />
                        <SourceTarget />
                    </div>
                    <div className={Styles.searchResults__container}>
                        <div className={Styles.searchResults__placeholderSearchWrapper}>
                            <PlaceholderSearch
                                number="1"
                                placeholder={this.state.placeholders[0][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[0]} />
                            <PlaceholderSearch
                                number="2"
                                placeholder={this.state.placeholders[1][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[1]} />
                            <PlaceholderSearch
                                number="3"
                                placeholder={this.state.placeholders[2][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[2]} />
                            <PlaceholderSearch
                                number="4"
                                placeholder={this.state.placeholders[3][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[3]} />
                            <PlaceholderSearch
                                number="5"
                                placeholder={this.state.placeholders[4][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[4]} />
                            <PlaceholderSearch
                                number="6"
                                placeholder={this.state.placeholders[5][1]}
                                updateplaceholdersearchvalue={this.updateplaceholdersearchvalue}
                                isselected={this.state.isSelected[5]} />
                        </div>
                        <ResultsList />
                    </div>
                    <div className={Styles.previewDefinitionWrapper}>

                        <div className={Styles.resultsPreview}>
                            <ResultsPreview />
                        </div>
                        <div className={Styles.placeholderDefinition}>
                            <PlaceholderDefinition />
                        </div>
                    </div>
                    <div className={Styles.placeholderDefinition2}>
                        <PlaceholderDefinition />
                    </div>

                </main>
            </div>
        );
    }
}