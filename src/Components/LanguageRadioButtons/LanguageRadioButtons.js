import React from "react";
import Styles from "./LanguageRadioButtons.module.css"


export default class LanguageRadioButtons extends React.Component {
    constructor(props) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(event) {
        this.props.languageButtonsHandleOptionChange(event.target.value);
    }

    render() {
        return (
            <form className={Styles.form} action="" name="languages">
                <fieldset className={Styles.form__wrapper}>
                    <label className={Styles.form__item}>
                        <input
                            type="radio"
                            name="languages"
                            value="French"
                            checked={this.props.languageButtonsSelectedOption === "French"}
                            onChange={this.handleOptionChange}
                        />
                        French
                    </label>

                    <label className={Styles.form__item}>
                        <input
                            type="radio"
                            name="languages"
                            value="German"
                            checked={this.props.languageButtonsSelectedOption === "German"}
                            onChange={this.handleOptionChange}
                        />
                        German
                    </label>

                    <label className={Styles.form__item}>
                        <input
                            type="radio"
                            name="languages"
                            value="Korean"
                            checked={this.props.languageButtonsSelectedOption === "Korean"}
                            onChange={this.handleOptionChange}
                        />
                        Korean
                    </label>

                    <label className={Styles.form__item}>
                        <input
                            type="radio"
                            name="languages"
                            value="Russian"
                            checked={this.props.languageButtonsSelectedOption === "Russian"}
                            onChange={this.handleOptionChange}
                        />
                        Russian
                    </label>

                    <label className={Styles.form__item}>
                        <input
                            type="radio"
                            name="languages"
                            value="Simp Chinese"
                            checked={this.props.languageButtonsSelectedOption === "Simp Chinese"}
                            onChange={this.handleOptionChange}
                        />
                        Simp Chinese
                    </label>

                    <label className={Styles.form__item}>
                        <input
                            type="radio"
                            name="languages"
                            value="Spanish"
                            checked={this.props.languageButtonsSelectedOption === "Spanish"}
                            onChange={this.handleOptionChange}
                        />
                        Spanish
                    </label>

                </fieldset>
            </form>
        )
    }

}