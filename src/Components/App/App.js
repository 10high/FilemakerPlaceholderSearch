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
    render() {
        return (
            <div className={Styles.app__container}>
                <Header />
                <main className={Styles.app__main}>
                    <div className={Styles.searchInput__container}>
                        <SearchInput />
                        <SourceTarget />
                    </div>
                    <div className={Styles.searchResults__container}>
                        <div className={Styles.searchResults__placeholderSearchWrapper}>
                            <PlaceholderSearch />
                            <PlaceholderSearch />
                            <PlaceholderSearch />
                            <PlaceholderSearch />
                            <PlaceholderSearch />
                            <PlaceholderSearch />
                        </div>
                        <ResultsList />
                    </div>
                    <ResultsPreview />
                    <PlaceholderDefinition />
                </main>
            </div>
        );
    }
}