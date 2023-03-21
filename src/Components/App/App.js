import React from "react";
import Header from "../Header/Header";
import SearchInput from "../SearchInput/SearchInput";
import SourceTarget from "../SourceTarget/SourceTarget";
import PlaceholderSearch from "../PlaceholderSearch/PlaceholderSearch";
import ResultsList from "../ResultsList/ResultsList";
import ResultsPreview from "../ResultsPreview/ResultsPreview";
import PlaceholderDefinition from "../PlaceholderDefinition/PlaceholderDefinition";
import "../customproperties.css";

export class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <main>
                    <div>
                        <SearchInput />
                        <SourceTarget />
                    </div>
                    <div>
                        <div>
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