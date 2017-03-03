import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styles from './styles.css';
import {SkillTags} from '../../components';


import { handleChanges, searchStudents } from '../../actions';

class Filter extends Component {

    getObjectFromInputs = this.getObjectFromInputs.bind(this);


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
        const university = this.refs.university.value,
              year = this.refs.year.value,
              faculty = this.refs.faculty.value,
              skills = this.props.student.skills;
        const languages = [
            this.refs.armenian.checked ? 1 : 0,
            this.refs.russian.checked ? 1 : 0,
            this.refs.english.checked ? 1 : 0,
        ];
        return this.encodeComponents({
            university,
            year,
            faculty,
            skills,
            languages
        });
    }

    encodeComponents(obj) {
        let query = "";
        for (let i in obj) {
            if (obj[i]) {
                if(i=='languages') {
                    query += `${i}=[${obj[i]}]&`;
                }
                else if(i=='skills') {
                    if(obj[i].length > 0)
                        query += `${i}=${JSON.stringify(obj[i])}&`;
                }
                else query += `${i}=${obj[i]}&`;
            }
        }
        return query;
    }

    render() {
        return (
            <div>

                <div>
                    <h2 className="col-xs-12 col-sm-12 col-md-12">Filter</h2>
                    <br/><br/><br/><br/>

                    <div className={styles.filterForm}>
                        <form className={"form-horizontal"}>
                            <div className="col-sm-10">

                                <div className={'form-group ' + styles.formContainer}>
                                    <label className={"control-label col-sm-2 col-md-2 " + styles.label} htmlFor="university">University: </label>
                                    <div className="col-sm-10 col-md-10 ">
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
                                    <label className={"control-label col-sm-2 col-md-2 " + styles.label} htmlFor="year">Year: </label>
                                    <div className="col-sm-10 col-md-10 ">
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
                                    <label className={"control-label col-sm-2 col-md-2 " + styles.label} htmlFor="faculty">Faculty: </label>
                                    <div className="col-sm-10 col-md-10 ">
                                        <select
                                            ref="faculty"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.props.student.faculty || 'cs'}
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
                                    <label className={"control-label col-sm-2 col-md-2 " + styles.label} htmlFor="languages">Languages: </label>
                                    <div className="col-sm-10 col-md-10 ">
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
                                    <label className={"control-label col-sm-2 col-md-2 " + styles.label} htmlFor="skills">Skills:</label>
                                    <div className="col-sm-10">
                                        <SkillTags name="skills" data={ this.props.student.skills || [] } />
                                            <br/>
                                        <div className={"text-center"}>
                                            <button 
                                                type="button"
                                                onClick={() => this.props.searchStudents(this.getObjectFromInputs())} 
                                                className={"btn btn-success "}>
                                                <span className="glyphicon glyphicon-refresh"></span>
                                                    &nbsp;Update
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );                            
    }
}            

function matchStateToProps(state) {
    return {
        student: state.student
    }
}

function matchDispatchToProps(dispatch) {
    return {
        handleChanges: bindActionCreators(handleChanges, dispatch),
        searchStudents: bindActionCreators(searchStudents, dispatch)
    }
}

export const FilterContainer = connect(matchStateToProps, matchDispatchToProps)(Filter);