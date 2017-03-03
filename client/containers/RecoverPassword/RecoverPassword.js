import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar,Toaster } from '../../components';
import styles from './styles.css';

import { resendPassword, clearInfo } from '../../actions';

class RecoverPassword extends Component {

    getInfo = this.getInfo.bind(this);

    constructor(props, context) {
        super(props, context);
        this.state = {
            info: {
                msg: '',
                type: ''
            }
        }
    }

    componentDidUpdate(){
        if(this.props.employer.info)
            if(this.props.employer.info.msg !== '' && this.props.employer.info.msg) {
                this.getInfo();
                setTimeout(()=>{
                    this.props.clearInfo();
                    this.state = {
                        info:{}
                    }
                },0);
            }
    }

    getObjectFromInputs() {
        const newPassword = this.refs.newPassword.value;
        const passwordConf = this.refs.passwordConf.value;

        return { newPassword, passwordConf };
    }

    getInfo() {
        if(this.props.employer.info)
            if(this.state.info.msg != this.props.employer.info.msg)
                this.state = {
                    info: this.props.employer.info
                };
    }

    render() {
        return (
            <div>
                <Navbar/>

                <Toaster msg={this.state.info.msg} type={this.state.info.type}/>

                <div className="conatiner">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <h3 style={{"marginTop":"50px"}}>Set your new password</h3>
                    </div>

                    <form className="col-xs-10 col-xs-offset-1 col-sm-9 col-sm-offset-2 col-lg-6 col-lg-offset-3">
                        <div className="form-group">
                            <label htmlFor="newPassword" className="control-label">New password:</label>
                            <input
                                ref="newPassword"
                                defaultValue=""
                                className="form-control"
                                id="newPassword"
                                type="password"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="passwordConf" className="control-label">Confirm new password:</label>
                            <input
                                ref="passwordConf"
                                defaultValue=""
                                className="form-control"
                                id="passwordConf"
                                type="password"/>
                        </div>


                        <br/>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                            <button
                                type="button"
                                onClick={() => {this.props.resendPassword(this.getObjectFromInputs())}}
                                className={"btn btn-success " + styles.btnLogIn}>
                                Save new password
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
        resendPassword: bindActionCreators(resendPassword, dispatch),
        clearInfo: bindActionCreators(clearInfo,dispatch)
    };
}

export const RecoverPasswordContainer = connect(matchStateToProps, matchDispatchToProps)(RecoverPassword);