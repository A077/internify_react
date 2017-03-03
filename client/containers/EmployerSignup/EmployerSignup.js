import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Navbar, Toaster } from '../../components';
import styles from './styles.css';

import { postEmployer,clearInfo } from '../../actions';

class EmployerSignup extends Component {

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

    componentDidUpdate() {
        if(this.props.employer.info)
            if(this.props.employer.info.msg !== '' && this.props.employer.info.msg)
                setTimeout(this.props.clearInfo,0);
    }

    getObjectFromInputs() {
        const company = this.refs.company.value,
              name = this.refs.name.value,
              email = this.refs.email.value,
              password = this.refs.password.value,
              passwordConf = this.refs.passwordConf.value,
              phone = this.refs.phone.value;
        return {
            company,
            name,
            email,
            password,
            passwordConf,
            phone
        };
    }

    getInfo() {
        if(this.props.employer.info)
            if(this.state.info.msg != this.props.employer.info.msg)
                this.state = {
                    info: this.props.employer.info
                };
    }

    render() {
        this.getInfo();
        return (
            <div>
                <Navbar/>

                <Toaster msg={this.state.info.msg} type={this.state.info.type}/>

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <h3 style={{"marginTop":"50px"}}>Sign up as an employer</h3>
                </div>

                <div className={styles.space}></div>

                <br/>

                <form className="form-horizontal">

                    <div className="col-xs-10 col-xs-offset-1 col-sm-9 col-sm-offset-2 col-lg-6 col-lg-offset-3">

                        <div className={"form-group " + styles.formContainer}>
                            <label className="control-label col-sm-2" htmlFor="company">Company:</label>
                            <div className="col-sm-8">
                                <input
                                    autoComplete="on"
                                    type="text"
                                    defaultValue=""
                                    ref="company"
                                    className="form-control"
                                    maxLength="60"
                                    id="company"/>
                            </div>
                        </div>

                        <br/>

                        <div className={"form-group " + styles.formContainer}>
                            <label className="control-label col-sm-2" htmlFor="name">Full name:</label>
                            <div className="col-sm-8">
                                <input
                                    autoComplete="on"
                                    type="text"
                                    defaultValue=""
                                    ref="name"
                                    className="form-control"
                                    maxLength="60"
                                    id="name"/>
                            </div>
                        </div>

                        <br/>

                        <div className={'form-group ' + styles.formContainer}>
                            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                            <div className="col-sm-8">
                                <input
                                    autoComplete="on"
                                    defaultValue=""
                                    ref="email"
                                    type="email"
                                    className="form-control"
                                    maxLength="60"
                                    id="email"/>
                            </div>
                        </div>


                        <br/>

                        <div className={"form-group " + styles.formContainer}>
                            <label className="control-label col-sm-2" htmlFor="phone">Phone:</label>
                            <div className="col-sm-8">
                                <input
                                    autoComplete="on"
                                    defaultValue=""
                                    ref="phone"
                                    type="tel"
                                    className="form-control"
                                    maxLength="60"
                                    id="phone"/>
                            </div>
                        </div>

                        <br/>

                        <div className={"form-group " + styles.formContainer}>
                            <label className="control-label col-sm-2" htmlFor="password">Password:</label>
                            <div className="col-sm-8">
                                <input
                                    defaultValue=""
                                    ref="password"
                                    type="password"
                                    className="form-control"
                                    maxLength="60"
                                    id="password"/>
                            </div>
                        </div>


                        <br/>

                        <div className={"form-group " + styles.formContainer}>
                            <label className="control-label col-sm-2" htmlFor="passwordConf">Confirm Password:</label>
                            <div className="col-sm-8">
                                <input
                                    defaultValue=""
                                    ref="passwordConf"
                                    type="password" 
                                    className="form-control"
                                    maxLength="60"
                                    id="passwordConf"/>
                            </div>
                        </div>



                        <br/>

                        <div className="text-center">
                            <button type="button" onClick={() => this.props.postEmployer(this.getObjectFromInputs())} className={"btn btn-success " + styles.btnSignUp}>
                                <b>Submit</b>
                            </button>
                        </div>

                        <div className={styles.space}></div>

                    </div>

                </form>

            </div>
        )
    };
}

function matchStateToProps(state) {
    return {
        employer: state.employer
    };
}

function matchDispatchToProps(dispatch) {
    return {
        postEmployer: bindActionCreators(postEmployer, dispatch),
        clearInfo: bindActionCreators(clearInfo,dispatch)
    };
}

export const EmployerSignupContainer = connect(matchStateToProps, matchDispatchToProps)(EmployerSignup);