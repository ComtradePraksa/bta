import React, { Component } from 'react';
import classes from "./AddNewFeedback.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class AddNewFeedback extends Component {

    render() {
        return (
            <div className={classes.newFeedbackWindow}>
                <div className={classes.newFeedbackPopup}>
                    <div className={classes.newFeedbackHeader}>
                        <FontAwesomeIcon icon="times" onClick={this.props.toggle} />
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}
export default AddNewFeedback
