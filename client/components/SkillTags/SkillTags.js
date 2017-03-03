import React from "react";
import ReactTags from 'reactive-tags';
import styles from './styles.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { changeTags } from '../../actions'

class SkillTagsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            tags: [],
            suggestions: []
        };
    }

    componentDidMount() {
        this.setState({
            tags: this.props.student.skills
        })
    }

    handleDelete(i) {
        let tags = this.props.student.skills || [];
        tags.splice(i,1);
        this.setState({tags})
    }

    handleAddition(tag) {
        let tags = this.props.student.skills || [];
        tags.push(tag);
        this.setState({tags}, function () {
            this.props.changeTags(this.props.student.skills || tags);
        });
    }

    handleInputChange(input) {
        if(!input || input.trim() == '') return 0;
        fetch('https://internify-simply.herokuapp.com/api/skills/'+input)
            .then((result) => {
                return result.json();
            })
            .then((res)=>{
                return this.removeDuplicates(this.state.tags,res);
            })
            .then((final)=>{
                this.setState({ suggestions: final });
            })
            .catch((err)=>console.log(err));
    }

    removeDuplicates(tags,res) {
        if(!tags) return res;
        for(let tag of tags) {
            res.some((skill,i)=>{
                if(skill._id == tag._id) {
                    res.splice(i,1);
                    return skill._id == tag._id;
                }
            });
        }
        return res;
    }

    render() {
        return (
            <ReactTags
                minQueryLength={1}
                placeholder="Add a tag... "
                tags={this.props.student.skills}
                suggestions={this.state.suggestions}
                handleDelete={this.handleDelete.bind(this)}
                handleAddition={this.handleAddition.bind(this)}
                handleInputChange={this.handleInputChange.bind(this)}  />
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
        changeTags: bindActionCreators(changeTags, dispatch)
    };
}

export const SkillTags = connect(matchStateToProps, matchDispatchToProps)(SkillTagsContainer);