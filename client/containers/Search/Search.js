import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import styles from './styles.css';

import { InvitationContainer } from  './Invitation'
import { FilterContainer } from  './Filter'
import { Navbar, Toaster } from '../../components';
import { clearInfo, clearStudentInfo } from '../../actions';

export class Search extends Component {

    getInfo = this.getInfo.bind(this);

    constructor(props,context) {
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
            if(this.props.employer.info.msg !== '' && this.props.employer.info.msg) {
                this.getInfo();
                setTimeout(()=>{
                    this.props.clearInfo();
                    this.state = {
                        info:{}
                    }
                },0);
            }
        if(this.props.student.info)
            if(this.props.student.info.msg !== '' && this.props.student.info.msg) {
                this.getInfo();
                setTimeout(()=>{
                    this.props.clearStudentInfo();
                    this.state = {
                        info:{}
                    }
                },0);
            }
    }

    getInfo() {
        if(this.props.student.info)
            if(this.state.info.msg != this.props.student.info.msg)
                this.state = {
                    info: this.props.student.info
                };
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

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h1 className={styles.pageIntro}>Intern Search</h1>
                </div>

                <div className={"col-xs-12 col-sm-12 col-md-12  " + styles.componentContainer}>

                    <div id="filterComponent" className={"col-xs-12 col-sm-12 col-md-6 " + styles.filterComponent}>
                        <FilterContainer/>
                    </div>

                    <div className={"col-xs-12 col-sm-12 col-md-6 " + styles.invitationComponent}>
                        <InvitationContainer/>
                    </div>
                </div>
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

function matchDispatchToProps(dispatch) {
    return {
        clearInfo: bindActionCreators(clearInfo,dispatch),
        clearStudentInfo: bindActionCreators(clearStudentInfo,dispatch)
    }
}

export const SearchContainer = connect(matchStateToProps, matchDispatchToProps)(Search);