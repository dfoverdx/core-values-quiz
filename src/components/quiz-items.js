import React from 'react';
import $ from 'jquery';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import * as Constants from '../constants/quiz-constants';
import Component from './component';
import QuizQuestion from './quiz-question';
import '../styles/quiz-items.css';

import QuizActions from '../actions/quiz-actions';
import QuizStore from '../stores/quiz-store';

export default class QuizItems extends Component {
    constructor(props) {
        super(props, 'onChange');
        this.state = {
            leftOption: {},
            rightOption: {},
            comparisons: 0,
            isNewPivot: false
        };
    }

    componentDidMount() {
        $(window).on('resize', this.resizeTable);
        this.resizeTable();

        QuizStore.addChangeListener(this.onChange);
        QuizActions.beginQuiz();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.rightOption.name && this.state.rightOption.name !== nextState.rightOption.name) {
            this.setState({
                isNewPivot: true
            });

            setTimeout(() => this.setState({ isNewPivot: false }), 1000);
        }
    }

    onChange(e) {
        if (e.eventName === Constants.PROMPT_USER) {
            this.setState({
                leftOption: e.left,
                rightOption: e.right,
                comparisons: e.comparisons,
            });
        }
    }

    resizeTable() {
        if (window.innerWidth >= 768) {
            let par = $('.left-col').parent(),
                width = par.width(),
                usableWidth = width - $('.or-col').width(),
                colWidth = usableWidth / 2;
            $('.left-col, .right-col').width(colWidth);
        } else {
            $('.left-col, .right-col').css('width', '');
        }
    }

    render() {
        let lgiClass = this.state.isNewPivot ? 'fadeBg' : '';
        return (
            <div>
                <ListGroup>
                    <ListGroupItem className={lgiClass}>
                        <QuizQuestion option1={ this.state.leftOption } option2={ this.state.rightOption } />
                        <h3 style={{ textAlign: 'center' }}>Questions answered: {this.state.comparisons}</h3>
                        <p style={{textAlign: 'center'}}>On average, this quiz is 311 questions long, but it depends on your answers.</p>
                    </ListGroupItem>
                </ListGroup>
                <div className='text-muted' style={{textAlign: 'center'}}>
                    Hint: You can press <kbd>A</kbd> to select the left option and <kbd>L</kbd> to select the right one.
                </div>
            </div>
        );
    }
}