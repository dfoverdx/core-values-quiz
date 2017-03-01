import React from 'react';
import { Button } from 'react-bootstrap';

import Component from './component';

import QuizActions from '../actions/quiz-actions';

export default class AlgorithmSelectButton extends Component {
    constructor(props) {
        super(props, 'handleClick');
    }

    handleClick(e) {
        QuizActions.selectAlgorithm(this.props.btnVal);
    }

    render() {
        return (
            <Button onClick={ this.handleClick } style={{ marginRight: 8, width: 300, marginBottom: 8 }} bsStyle={ this.props.bsStyle} >
                { this.props.children }
            </Button>
        );
    }
}

AlgorithmSelectButton.propTypes = {
    btnVal: React.PropTypes.string.isRequired,
    bsStyle: React.PropTypes.string
};