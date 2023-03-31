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
            placeholders: ["", "", "", "", "", ""],
            searchInputValue: "Paste your string here"
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    extractPlaceholders(input) {
        const placeholderArr = input.match(/(\('.*?\))/g) || [];
        for (let i = 0; i < 6; i++) {
            placeholderArr[i] ?
                placeholderArr[i] = placeholderArr[i].match(/\('(\w+)'/)[1] :
                placeholderArr[i] = "";
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

    render() {
        return (
            <div className={Styles.app__container}>
                <Header />
                <main className={Styles.app__main}>
                    <div className={Styles.searchInput__container}>
                        <SearchInput
                            value={this.state.searchInputValue}
                            onChange={this.handleOnChange}
                        />
                        <SourceTarget />
                    </div>
                    <div className={Styles.searchResults__container}>
                        <div className={Styles.searchResults__placeholderSearchWrapper}>
                            <PlaceholderSearch number="1" placeholder={this.state.placeholders[0]} />
                            <PlaceholderSearch number="2" placeholder={this.state.placeholders[1]} />
                            <PlaceholderSearch number="3" placeholder={this.state.placeholders[2]} />
                            <PlaceholderSearch number="4" placeholder={this.state.placeholders[3]} />
                            <PlaceholderSearch number="5" placeholder={this.state.placeholders[4]} />
                            <PlaceholderSearch number="6" placeholder={this.state.placeholders[5]} />
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