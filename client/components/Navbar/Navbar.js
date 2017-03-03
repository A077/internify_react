import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles.css';

import { destroyEmployerState, destroyStudentState } from '../../actions';

class NavbarComponent extends Component {

    studentSignup() {
        if(!this.props.student.signed)
            return(
                <li className={styles.navItem}><Link to="/signup" className={styles.navItemLink}>Signup</Link></li>
            );
        return(
            <li className={styles.navItem}><Link to="/profile" className={styles.navItemLink}>Profile</Link></li>
        );
    }

    whatToRender() {
        const isEmployer = this.props.employer.company,
              isStudent  = this.props.student.fbId;

        if(isEmployer)
            return(
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-left">
                        <li className={styles.navItem}><Link to="/" className={styles.navItemLink}>Home</Link></li>
                        <li className={styles.navItem}><Link to="/profile" className={styles.navItemLink}>Profile</Link></li>
                        <li className={styles.navItem}><Link to="/search" className={styles.navItemLink}>Search</Link></li>
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        <li className={styles.navItem}>
                            <a href="javascript:void(0)" onClick={() => {this.props.destroyEmployerState()}} className={styles.navItemLink}>
                                Log Out
                            </a>
                        </li>
                    </ul>
                </div>
            );

        if(isStudent)
            return(
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-left">
                        <li className={styles.navItem}><Link to="/" className={styles.navItemLink}>Home</Link></li>
                        {this.studentSignup.bind(this)()}
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        <li className={styles.navItem}>
                            <a href="javascript:void(0)" onClick={() => {this.props.destroyStudentState()}} className={styles.navItemLink}>
                                Log Out
                            </a>
                        </li>
                    </ul>
                </div>
            );

        return(
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-left">
                    <li className={styles.navItem}><Link to="/" className={styles.navItemLink}>Home</Link></li>
                    <li className={styles.navItem}><Link to="/employer-signup" className={styles.navItemLink}>For Employers</Link></li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li className={styles.navItem}><Link to="/login" className={styles.navItemLink}>Log In</Link></li>
                </ul>
            </div>
        );
    }

    render () {

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className={'navbar-brand ' + styles.navbarBrand}>Internify</Link>
                    </div>
                    {this.whatToRender()}
                </div>
            </nav>
        );
    }
}

function matchStateToProps(state) {
    return {
        student: state.student,
        employer: state.employer
    }
}

function matchDispatchToProps(dispatch) {
    return {
        destroyEmployerState: bindActionCreators(destroyEmployerState, dispatch),
        destroyStudentState: bindActionCreators(destroyStudentState, dispatch)
    };
};

export const Navbar = connect(matchStateToProps, matchDispatchToProps)(NavbarComponent);