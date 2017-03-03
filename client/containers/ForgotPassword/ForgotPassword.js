import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Navbar, Toaster } from '../../components';
import styles from './styles.css';

import { resetPassword, clearInfo } from '../../actions';

class ForgotPassword extends Component {

    getEmail = this.getEmail.bind(this);
    getInfo = this.getInfo.bind(this);

    constructor(props,context) {
        super(props,context);
        this.state = {
            info: {
                msg: '',
                type: ''
            }
        }
    }

    componentDidUpdate() {
        if(this.props.employer.info)
            if(this.props.employer.info.msg !== '' && this.props.employer.info.msg){
                this.getInfo();
                setTimeout(()=>{
                    this.props.clearInfo();
                    this.state = {
                        info:{}
                    }
                },0);
            }
    }

    getInfo() {
        if(this.props.employer.info)
            if(this.state.info.msg != this.props.employer.info.msg)
                this.state = {
                    info: this.props.employer.info
                };
    }

    getEmail() {
        const email = this.refs.email.value;
        return email;
    }

    render() {
        return (
            <div>
                <Navbar/>

                <Toaster msg={this.state.info.msg} type={this.state.info.type}/>                

                <div className="conatiner">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <h3 style={{"marginTop":"50px"}}>Forgot Password</h3>
                    </div>

                    <form className="col-xs-10 col-xs-offset-1 col-sm-9 col-sm-offset-2 col-lg-6 col-lg-offset-3">
                        <div className="form-group">
                            <label htmlFor="email" className="control-label">Email:</label>
                            <input
                                autoComplete="on"
                                ref="email"
                                defaultValue=""
                                className="form-control"
                                id="email"
                                type="email"/>
                        </div>


                        <br/>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                            <button 
                                type="button"
                                onClick={() => {this.props.resetPassword(this.getEmail())}} 
                                className={"btn btn-success " + styles.btnLogIn}>
                                    Send email
                            </button>
                        </div>

                    </form>



                </div>
            </div>
        );
    }
}

function matchStateToProps(state) {
    return {
        employer: state.employer
    };
}

function matchDispatchToProps(dispatch) {
    return {
        resetPassword: bindActionCreators(resetPassword, dispatch),
        clearInfo: bindActionCreators(clearInfo, dispatch)
    };
}

export const ForgotPasswordContainer = connect(matchStateToProps, matchDispatchToProps)(ForgotPassword);