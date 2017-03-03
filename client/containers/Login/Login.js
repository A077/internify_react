import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Navbar, Toaster } from '../../components';
import styles from './styles.css';

import { loginEmployer, clearInfo } from '../../actions';

class Login extends Component {

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
        const email = this.refs.email.value,
              password = this.refs.password.value;
        return {
            email,
            password
        }
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

                <div className="conatiner">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <h3 style={{"marginTop":"50px"}}>Employers Login</h3>
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

                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Password:</label>
                        <input
                            ref="password"
                            defaultValue=""
                            className="form-control"
                            id="password"
                            type="password"/>
                    </div>
                    <br/>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <button
                        type="button"
                        onClick={() => {this.props.loginEmployer(this.getObjectFromInputs())}}
                        className={"btn btn-success " + styles.btnLogIn}>
                        Sign in
                    </button>
                        <br/>
                        <Link to="/forgot-password" className={styles.itemLink}>Forgot Password ?</Link>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <h3>Students Login</h3>
                        <br/>
                        <a href="https://internify-simply.herokuapp.com/auth/students/login" className={"btn btn-primary " + styles.btnLogIn}>
                            <b>Login with Facebook</b>
                        </a>
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
        loginEmployer: bindActionCreators(loginEmployer, dispatch),
        clearInfo: bindActionCreators(clearInfo,dispatch)
    };
}

export const LoginContainer = connect(matchStateToProps, matchDispatchToProps)(Login);