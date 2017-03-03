import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastr';

import styles from './styles.css';

export class Toaster extends Component {

    addAlert = this.addAlert.bind(this);

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const msg = this.props.msg,
            type = this.props.type;
        if(msg)
            if(msg.trim() !== "" && msg) this.addAlert(msg,type);
    }

    componentDidUpdate() {
        const msg = this.props.msg,
             type = this.props.type;
        if(msg)
            if(msg.trim() !== "" && msg) this.addAlert(msg,type);
    }

    addAlert(msg, type) {
        if(type=='success')
            this.refs.container.success("", msg);
        else if(type=='info')
            this.refs.container.info("", msg);
        else if(type=='warn')
            this.refs.container.warning("", msg);
        else
            this.refs.container.error("", msg);
        setTimeout(()=>{
            if(this)
                if(this.refs)
                    if(this.refs.container)
                        this.refs.container.setState({toasts:[], messageList:[]});
        },2500);
    }

    render() {
        return (
            <ToastContainer ref="container" className="toast-top-right"/>
        );
    }
}