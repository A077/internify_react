import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import styles from './styles.css';
import { Navbar, Toaster, SkillTags } from '../../components';

import { getStudents, postStudent, handleChanges, clearStudentInfo } from '../../actions'

class Signups extends Component {

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

    componentDidMount() {
        this.props.getStudents();
    }

    componentDidUpdate() {
        if(this.props.student.info)
            if(this.props.student.info.msg !== '' && this.props.student.info.msg){
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
    }

    handleChange(e) {
        if(e.target.name==='languages') {
            let arr = [
                this.refs.armenian.checked ? 1 : 0,
                this.refs.russian.checked ? 1 : 0,
                this.refs.english.checked ? 1 : 0,
            ];
            this.props.handleChanges(arr, e.target.name);
        }

        else this.props.handleChanges(e.target.value, e.target.id);
    }

    getObjectFromInputs() {
        const id = this.props.student._id,
              name = this.refs.name.value,
              email = this.refs.email.value,
              phone = this.refs.phone.value,
              university = this.refs.university.value,
              year = this.refs.year.value,
              faculty = this.refs.faculty.value,
              skills = this.props.student.skills;
        const languages = [
            this.refs.armenian.checked ? 1 : 0,
            this.refs.russian.checked ? 1 : 0,
            this.refs.english.checked ? 1 : 0,
        ];

        return {
            id,
            name,
            email,
            phone,
            university,
            year,
            faculty,
            skills,
            languages
        };
    }

    render () {
        return (
            <div>
                <Navbar/>

                <Toaster msg={this.state.info.msg} type={this.state.info.type}/>

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <h3 className={styles.pageIntro} style={{"marginTop":"50px"}}>Complete sign up</h3>
                </div>

                <br/><br/><br/><br/>

                <form className="form-horizontal">

                <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-2 col-lg-7 col-lg-offset-3">

                <div className={'form-group ' + styles.formContainer}>
                    <label className="control-label col-sm-2" htmlFor="name">Full name:</label>
                    <div className="col-sm-8">
                        <input
                            autoComplete="on"
                            type="text"
                            ref="name" 
                            value={this.props.student.name || ''}
                            className="form-control"
                            onChange={this.handleChange.bind(this)}
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
                            ref="email" 
                            value={this.props.student.email || ''}
                            type="email" 
                            className="form-control"
                            onChange={this.handleChange.bind(this)}
                            maxLength="60"
                            id="email"/>
                    </div>
                </div>

                <br/>

                <div className={'form-group ' + styles.formContainer}>
                    <label className="control-label col-sm-2" htmlFor="phone">Phone:</label>
                    <div className="col-sm-8">
                        <input
                            autoComplete="on"
                            ref="phone"
                            type="tel"
                            className="form-control"
                            onChange={this.handleChange.bind(this)}
                            maxLength="60"
                            id="phone"/>
                    </div>
                </div>

                <br/>
                <br/>

                <div className={'form-group ' + styles.formContainer}>
                    <label className="control-label col-sm-2" htmlFor="university">University:</label>
                    <div className="col-sm-8">
                        <select
                            ref="university"
                            onChange={this.handleChange.bind(this)}
                            className="form-control"
                            id="university">
                            <option value="">Select university</option>
                            <option value="AUA">AUA</option>
                            <option value="YSU">YSU</option>
                        </select>
                    </div>
                </div>

                <br/>

                <div className={'form-group ' + styles.formContainer}>
                    <label className="control-label col-sm-2" htmlFor="year">Year:</label>
                    <div className="col-sm-8">
                        <select
                            ref="year"
                            onChange={this.handleChange.bind(this)}
                            className="form-control"
                            id="year">
                            <option value="">Select year</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>

                <br/>

                <div className={'form-group ' + styles.formContainer}>
                    <label className="control-label col-sm-2" htmlFor="faculty">Faculty:</label>
                    <div className="col-sm-8">
                        <select ref="faculty" onChange={this.handleChange.bind(this)} className={'form-control ' + styles.formInput} id="faculty">
                            <option value="">Select faculty</option>
                            <option value="CS">Computer Science</option>
                            <option value="Business">Business</option>
                            <option value="EC">English and Communications</option>
                        </select>
                    </div>
                </div>

                <br/>

                <div className={'form-group ' + styles.formContainer}>
                    <label className="control-label col-sm-2" htmlFor="languages">Languages:</label>
                    <div className="col-sm-8">
                        <input onChange={this.handleChange.bind(this)} ref="armenian" type="checkbox" name="languages"/> Armenian <br/>
                        <input onChange={this.handleChange.bind(this)} ref="russian" type="checkbox" name="languages"/> Russian <br/>
                        <input onChange={this.handleChange.bind(this)} ref="english" type="checkbox" name="languages"/> English <br/>
                    </div>
                </div>

                <br/>

                <div className={'form-group ' + styles.formContainer}>
                    <label className="control-label col-sm-2" htmlFor="skills">Skills:</label>
                    <div className="col-sm-8">
                        <SkillTags name="skills"/>
                    </div>
                </div>

                </div>

                <br/>

                <div className={'form-group ' + styles.formContainer}>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <button type="button" onClick={() => this.props.postStudent(this.getObjectFromInputs())} className="btn btn-success">Submit</button>
                    </div>

                </div>


                </form>

            </div>
        );
    }

}

function matchStateToProps(state) {
    return {
        student: state.student
    };
}

function matchDispatchToProps(dispatch) {
    return {
        handleChanges: bindActionCreators(handleChanges, dispatch),
        getStudents: bindActionCreators(getStudents, dispatch),
        postStudent: bindActionCreators(postStudent, dispatch),
        clearStudentInfo: bindActionCreators(clearStudentInfo, dispatch)
    };
}

export const SignupContainer = connect(matchStateToProps, matchDispatchToProps)(Signups);