import React from 'react';
import { store } from 'store';
import {
    ErrContainer,
	WelcomeContainer,
	SignupContainer,
    EmployerSignupContainer,
	ProfileContainer,
	LoginContainer,
    SearchContainer,
    ForgotPasswordContainer,
    RecoverPasswordContainer
} from './containers';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);

export const Routes = (
	<Router history={history}>
		<Route path="/" component={WelcomeContainer} />
        <Route path="/search" component={SearchContainer} onEnter={isAuthenticated} />
        <Route path="/forgot-password" component={ForgotPasswordContainer} onEnter={isLogged} />
		<Route path="/signup" component={SignupContainer} onEnter={isSigned} />
		<Route path="/employer-signup" component={EmployerSignupContainer} onEnter={isLogged} />
		<Route path="/profile" component={ProfileContainer} onEnter={isAuthenticated} />
		<Route path="/login" component={LoginContainer} onEnter={isLogged} />
        <Route path="/recover" component={RecoverPasswordContainer} onEnter={isForgotPassword}/>
        <Route path="*" component={ErrContainer}/>
    </Router>
);

function isForgotPassword(nextState,replace,next) {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/forgot/check',
        reqConf = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        };

    fetch(reqUrl, reqConf)
        .then((response)=>{
            return response.text();
        })
        .then((res) => {
            if(res=="true")
                next();

            else {
                replace('/');
                next();
            }
        })
        .catch((err)=>{console.log(err)});
}

function isAuthenticated(nextState,replace,next) {
	checkStudent()
        .then((response)=>{
	        if(!response) {
	            replace('/login');
	            next();
            }
            if(response=="signup") {
                replace('/signup');
                next();
            }
            else next();
        })
        .catch((err)=>{console.log(err)});
	next();
}

function isSigned(nextState,replace,next) {
    const {student} = store.getState();
    const check = (student.fbId) && (student.signed);

    const local = localStorage,
          studentStorage = JSON.parse(local.getItem('reduxPersist:student'));

    if(local)
        if(studentStorage)
            if(studentStorage.signed==false) {
                replace('/profile');
                next();
            }
    if(!check) isAuthenticated(nextState, replace, next);
    else {
        replace('/profile');
        next();
    }
}

function isLogged(nextState,replace,next) {
    checkStudent()
        .then((response)=>{
            if(response) {
                replace('/profile');
                next();
            }
            else next();
        })
        .catch((err)=>{console.log(err)});
    next();
}

function checkStudent(replace,next) {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/students/check',
          reqConf = {
        	method: 'GET',
        	mode: 'cors',
        	credentials: 'include'
   		  };
	return fetch(reqUrl, reqConf)
        .then((response)=>{
            return response.text();
        })
        .then((res) => {
	        if(res=="signup") return "signup";
        	if(res=="isLoggedIn") return true;
        	else return checkEmployer();
        })
        .catch((err)=>{console.log(err)});
}

function checkEmployer(replace,next) {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/check',
		  reqConf = {
        	method: 'GET',
        	mode: 'cors',
        	credentials: 'include'
    	  };
    return fetch(reqUrl, reqConf)
        .then((response)=>{
            return response.text();
        })
        .then((res) => {
            return res=="isLoggedIn";
        })
        .catch((err)=>{console.log(err)});
}