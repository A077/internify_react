import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './styles.css';

import {Navbar} from '../../components';

export class Welcome extends Component {

	showButton = this.showButton.bind(this)
	
	constructor(props, context) {
		super(props, context);
	}

	showButton() {
		if(!this.props.student.fbId && !this.props.employer.company)
			return(
				<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" style={{"margin":"10px 0px"}}>
                    <a href="https://internify-simply.herokuapp.com/auth/students/signup" className="btn btn-primary btn-sign-up"><b>Sign up with Facebook</b></a>
                </div>
			);
		return(<div></div>);
	}

	render() {
		return (
			<div>
				<Navbar/>

                <h1 id="h1" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" style={{"marginTop":"120px"}}>
                    Discover the best internship programs
                </h1>

				<br/>
				<h3 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
					Are you a student and looking for internship programs?
				</h3>

				<h3 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
					Sign up and let employers find You!
				</h3>

				<br/>

                {this.showButton()}

			</div>
		);
	}
}

function matchStateToProps(state) {
    return {
    	student: state.student,
        employer: state.employer
    };
}

export const WelcomeContainer = connect(matchStateToProps)(Welcome);