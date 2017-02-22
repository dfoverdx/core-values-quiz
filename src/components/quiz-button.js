import React from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

import Component from './component';
import QuizStore from '../stores/quiz-store';

export default class QuizButton extends Component {
    constructor(props) {
        super(props, 'handleClick', 'handleKeyDown');
    }

    handleClick() {
        this.props.quizAction(this.props.btnVal);
    }

    handleKeyDown(e) {
        if (!QuizStore.isDone && e.key === this.props.keyShortcut.toLowerCase()) {
            this.props.quizAction(this.props.btnVal);
        }
    }

    componentDidMount() {
        $(window).on('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        $(window).off('keydown', this.handleKeyDown);
    }

    render() {
        let { name, desc, keyShortcut } = this.props;
        let kbd = keyShortcut ? <span className='kbd'>{ keyShortcut }</span> : null;
        return (
            <Button bsSize='large' className='quiz-btn' onClick={ this.handleClick }>
                { kbd }
                <h2>{ name }</h2>
                <p>{ desc }</p>
            </Button>
        );
    }
}

QuizButton.propTypes = {
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string,
    keyShortcut: React.PropTypes.string,
    btnVal: React.PropTypes.any.isRequired,
    quizAction: React.PropTypes.func.isRequired,
};