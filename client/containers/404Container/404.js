import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import styles from './styles.css';

export class ErrContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        setTimeout(()=>{
            browserHistory.push('/');
        },5000)
    }

    render() {
        return (
            <div>
                <h1 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" style={{"marginTop":"120px"}}>
                    Looks like you got lost....
                </h1>
                <img src="/img/travolta.gif" alt="Travolta" className={styles.lost}/>
            </div>
        );
    }
}