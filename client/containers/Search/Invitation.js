import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from './styles.css';

import {inviteStudents} from '../../actions';

class Invitation extends Component {

    getObjectFromInputs() {
        const name = this.props.student.name,
              email = this.props.student.email,
              phone = this.props.student.phone,
              university = this.props.student.university,
              year = this.props.student.year,
              faculty = this.props.student.faculty,
              skills = this.props.student.skills,
              languages = this.props.student.languages,
              message = this.refs.message.value;
        return {
            name,
            email,
            phone,
            university,
            year,
            faculty,
            skills,
            languages,
            message
        };
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12">

                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <h2 className={" " + styles.textNowrap + " "}>
                            Total students {
                                this.props.student
                                ? this.props.student.count
                                : 0
                            }
                        </h2>
                    </div>

                    <br/><br/><br/>

                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <h3  className={styles.pageIntro}>Message</h3>
                    </div>

                    <div className="form-group col-xs-12 col-sm-12 col-md-12 text-center">
                        <textarea
                            placeholder="Start typing your message here"
                            ref="message"
                            className={" form-control " + styles.formInput + " " + styles.textarea}
                            name="message"
                            maxLength="4000"
                            rows="15"
                            id="message"/>
                    </div>


                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                this.props.inviteStudents(this.getObjectFromInputs());
                                this.refs.message.value = "";
                            }}
                            className={'btn btn-success '+styles.formContainer}>
                                <span className="glyphicon glyphicon-envelope"></span>
                                &nbsp;Send invitation
                        </button>
                    </div>


            </div>

        );
    }
}

function matchStateToProps(state) {
    return {
        student: state.student
    }
}

function matchDispatchToProps(dispatch) {
    return {
        inviteStudents: bindActionCreators(inviteStudents, dispatch)
    }
}

export const InvitationContainer = connect(matchStateToProps, matchDispatchToProps)(Invitation);
