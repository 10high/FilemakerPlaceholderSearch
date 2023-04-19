import React from "react";
import Styles from "./SourceTarget.module.css";

export default class SourceTarget extends React.Component {
    constructor(props) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(event) {
        this.props.sourceTargetHandleOptionChange(event.target.value);
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
                            checked={this.props.sourceTargetSelectedOption === "source"}
                            onChange={this.handleOptionChange}
                        />
                        Source
                    </label>

                    <label className={Styles.form__item}>
                        <input
                            type="radio"
                            name="sourceTarget"
                            value="target"
                            checked={this.props.sourceTargetSelectedOption === "target"}
                            onChange={this.handleOptionChange}
                        />
                        Target
                    </label>
                </fieldset>
            </form>
        )
    }
}

