import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loading from 'react-loading';

import styles from './styles.css';

import { Navbar, Toaster, SkillTags } from '../../components';

import { getStudents, updateStudent, handleChanges, 
         getEmployer, updateEmployer, handleEmployerChanges,
         clearInfo, clearStudentInfo } from '../../actions';

class Profile extends Component {

    getInfo = this.getInfo.bind(this);
    checkStudent = this.checkStudent.bind(this);
    checkEmployer = this.checkEmployer.bind(this);

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
        this.checkStudent();
        this.checkEmployer();
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

    checkStudent() {
        const reqUrl = 'https://internify-simply.herokuapp.com/auth/students/check',
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
                if(res=="isLoggedIn") this.props.getStudents();
            })
            .catch((err)=>{console.log(err)});
    }

    checkEmployer() {
        const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/check',
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
                if(res=="isLoggedIn") this.props.getEmployer();
            })
            .catch((err)=>{console.log(err)});
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

    handleEmployerChange(e) {
        this.props.handleEmployerChanges(e.target.value, e.target.id);
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

    getEmployerObjectFromInputs() {
        const name = this.refs.name.value,
              company = this.refs.company.value,
              email = this.refs.email.value,
              phone = this.refs.phone.value;

        return {
            name,
            company,
            email,
            phone
        };
    }

    whatToRender(nav,top) {
        const isEmployer = this.props.employer.company;
        const isStudent = this.props.student.fbId;

        if(nav && (isEmployer || isStudent))
            return(
                <Navbar/>
            );
        else if(nav) return(<div></div>);

        if(top && (isEmployer || isStudent))
            return(
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <h3 className={styles.pageIntro} style={{"marginTop":"50px"}}>My Profile</h3>
                </div>
            );
        else if(top) return(<div></div>);

        if(isEmployer)
            return(
                <div>
                    <Toaster msg={this.state.info.msg} type={this.state.info.type}/>
                    <form className="form-horizontal">

                        <div className="col-xs-10 col-xs-offset-1 col-sm-9 col-sm-offset-2 col-lg-6 col-lg-offset-3">

                            <div className={'form-group ' + styles.formContainer}>
                                <label className="control-label col-sm-2" htmlFor="company">Company:</label>
                                <div className="col-sm-8">
                                    <input
                                        autoComplete="on"
                                        type="text"
                                        value={this.props.employer.company || ''}
                                        onChange={this.handleEmployerChange.bind(this)}
                                        ref="company"
                                        name="company"
                                        className={'form-control ' + styles.formInput}
                                        maxLength="60"
                                        id="company"/>
                                </div>
                            </div>

                            <br/>

                            <div className={'form-group ' + styles.formContainer}>
                                <label className="control-label col-sm-2" htmlFor="name">Full name:</label>
                                <div className="col-sm-8">
                                    <input
                                        autoComplete="on"
                                        type="text"
                                        value={this.props.employer.name || ''}
                                        onChange={this.handleEmployerChange.bind(this)}
                                        ref="name"
                                        name="name"
                                        className={'form-control ' + styles.formInput}
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
                                        value={this.props.employer.email || ''}
                                        onChange={this.handleEmployerChange.bind(this)}
                                        ref="email"
                                        name="email"
                                        type="email"
                                        className={'form-control ' + styles.formInput}
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
                                        value={this.props.employer.phone || ''}
                                        onChange={this.handleEmployerChange.bind(this)}
                                        ref="phone"
                                        name="phone"
                                        type="tel"
                                        className={'form-control ' + styles.formInput}
                                        maxLength="60"
                                        id="phone"/>
                                </div>
                            </div>

                            <br/>

                            <div className="row text-center">
                                <button
                                    type="button"
                                    onClick={() => this.props.updateEmployer(this.getEmployerObjectFromInputs())}
                                    className={"btn btn-success " + styles.btnSignUp}>
                                    <b>Save</b>
                                </button>
                            </div>

                        </div>

                    </form>
                </div>
            );

        if(isStudent)
            return(
                <div>
                    <Toaster msg={this.state.info.msg} type={this.state.info.type}/>
                    <form className="form-horizontal">

                        <div className="col-xs-10 col-xs-offset-1 col-sm-9 col-sm-offset-2 col-lg-6 col-lg-offset-3">

                            <div className={'form-group ' + styles.formContainer}>
                                <label className="control-label col-sm-2" htmlFor="name">Full name:</label>
                                <div className="col-sm-8">
                                    <input
                                        autoComplete="on"
                                        type="text"
                                        ref="name"
                                        value={this.props.student.name || ''}
                                        className={'form-control ' + styles.formInput}
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
                                        className={'form-control ' + styles.formInput}
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
                                        onChange={this.handleChange.bind(this)}
                                        value={this.props.student.phone || ''}
                                        ref="phone"
                                        type="tel"
                                        className={'form-control ' + styles.formInput}
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
                                        value={this.props.student.university || ''}
                                        className={'form-control ' + styles.formInput}
                                        id="university" >
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
                                        value={this.props.student.year || ''}
                                        className={'form-control ' + styles.formInput}
                                        id="year" >
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
                                    <select
                                        ref="faculty"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.props.student.faculty || ''}
                                        className={'form-control ' + styles.formInput}
                                        id="faculty" >
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
                                    <input
                                        checked={this.props.student.languages
                                            ? this.props.student.languages[0]
                                            : false
                                        }
                                        onChange={this.handleChange.bind(this)}
                                        ref="armenian"
                                        type="checkbox"
                                        name="languages"/> Armenian <br/>
                                    <input
                                        checked={this.props.student.languages
                                            ? this.props.student.languages[1]
                                            : false
                                        }
                                        onChange={this.handleChange.bind(this)}
                                        ref="russian"
                                        type="checkbox"
                                        name="languages"/> Russian <br/>
                                    <input
                                        checked={this.props.student.languages
                                            ? this.props.student.languages[2]
                                            : false
                                        }
                                        onChange={this.handleChange.bind(this)}
                                        ref="english"
                                        type="checkbox"
                                        name="languages"/> English <br/>
                                </div>
                            </div>

                            <br/>

                            <div className={'form-group ' + styles.formContainer}>
                                <label className="control-label col-sm-2" htmlFor="skills">Skills:</label>
                                <div className="col-sm-8">
                                    <SkillTags name="skills" data={this.props.student.skills} />
                                </div>
                            </div>

                        </div>

                        <br/>

                        <div className={'form-group ' + styles.formContainer}>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                                <button type="button" onClick={() => this.props.updateStudent(this.getObjectFromInputs())} className="btn btn-success">Save</button>
                            </div>

                        </div>


                    </form>
                </div>
            );

        return (
            <div className={styles.loading}>
                <Loading type="spin" color="#f5f5f5"/>
            </div>
        );
    }

    render() {

        return (
            <div>
                {this.whatToRender(true, false)}
                {this.whatToRender(false, true)}
                <br/>
                {this.whatToRender()}
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
        handleChanges: bindActionCreators(handleChanges, dispatch),
        getStudents: bindActionCreators(getStudents, dispatch),
        updateStudent: bindActionCreators(updateStudent, dispatch),
        getEmployer: bindActionCreators(getEmployer, dispatch),
        updateEmployer: bindActionCreators(updateEmployer, dispatch),
        handleEmployerChanges: bindActionCreators(handleEmployerChanges, dispatch),
        clearInfo: bindActionCreators(clearInfo,dispatch),
        clearStudentInfo: bindActionCreators(clearStudentInfo,dispatch)
    }
}

export const ProfileContainer = connect(matchStateToProps, matchDispatchToProps)(Profile);