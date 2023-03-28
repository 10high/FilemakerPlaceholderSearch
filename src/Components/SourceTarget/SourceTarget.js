import React from "react";
import Styles from "./Styles.module.css";

export default class SourceTarget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedOption: "source" };
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(event) {
        this.setState({ selectedOption: event.target.value });
    }

    render() {
        return (
            <form className={Styles.form} action="" name="sourceTarget">
                <fieldset className={Styles.form__wrapper}>
                    <label className={Styles.form__item}>
                        <input
                            type="radio"
                            name="sourceTarget"
                            value="source"
                            checked={this.state.selectedOption === "source"}
                            onChange={this.handleOptionChange}
                        />
                        Source
                    </label>

                    <label className={Styles.form__item}>
                        <input
                            type="radio"
                            name="sourceTarget"
                            value="target"
                            checked={this.state.selectedOption === "target"}
                            onChange={this.handleOptionChange}
                        />
                        Target
                    </label>
                </fieldset>
            </form>
        )
    }
}

