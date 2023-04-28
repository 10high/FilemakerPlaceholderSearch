import React from "react";
import Styles from "./ParentPlaceholder.module.css"

export default class ParentPlaceholder extends React.Component {

    //If props "body" is passed in, displays text as is. 
    //If props "list" is passed in, displays array as list
    render() {
        return (
            <div className={Styles.parentPlaceholder__Wrapper}>
                <section className={Styles.parentPlaceholder}>
                    <div className={Styles.parentPlaceholder__HeaderWrapper}>
                        <h2 className={Styles.parentPlaceholder__Header}>{this.props.header}</h2>
                    </div>
                    <div className={Styles.parentPlaceholder__BodyTextWrapper}>
                        {
                            this.props.body ?
                                <p className={Styles.parentPlaceholder__BodyText}>
                                    {this.props.body}
                                </p> :
                                <ul className={Styles.parentPlaceholder__List}>
                                    {this.props.list ?
                                        this.props.list.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        )) :
                                        <li></li>}
                                </ul>
                        }
                    </div>
                </section>
            </div>
        )
    }
}