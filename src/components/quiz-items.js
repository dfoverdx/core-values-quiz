import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import Component from './component';
import QuizQuestion from './quiz-question';
import QuizMiddleQuestion from './quiz-middle-question';
import QuizProgress from './quiz-progress';
import '../styles/quiz-items.css';

import * as Constants from '../constants/quiz-constants';
import QuizActions from '../actions/quiz-actions';
import QuizStore from '../stores/quiz-store';

export default class QuizItems extends Component {
    constructor(props) {
        super(props, 'onChange');
        this.state = {
            leftOption: null,
            leftIdx: null,
            midOption: null,
            midIdx: null,
            rightOption: null,
            rightIdx: null,
            comparisons: 0,
            isNewPivot: false,
            averageQuestions: -1
        };
    }

    componentDidMount() {
        QuizStore.addChangeListener(this.onChange);
        QuizActions.beginQuiz();
    }

    componentDidUpdate(prevProps, prevState) {
        setTimeout(() => {
            if (prevState.rightOption &&
                (this.state.midOption || this.state.rightOption.name !== prevState.rightOption.name)) {
                this.setState({
                    isNewPivot: true
                });
            }
        }, 10);
    }

    onChange(e) {
        switch (e.eventName) {
            case Constants.BEGIN_QUIZ:
                if (e.algorithm === 'qs') {
                    this.setState({
                        averageQuestions: 284
                    });
                } else {
                    this.setState({
                        averageQuestions: 267
                    });
                }

                break;

            case Constants.PROMPT_USER:
                this.setState({
                    leftOption: e.left,
                    rightOption: e.right,
                    midOption: null,
                    leftIdx: null,
                    midIdx: null,
                    rightIdx: null,
                    comparisons: e.comparisons,
                    isNewPivot: false,
                });

                break;

            case Constants.PROMPT_USER_FOR_MID:
                this.setState({
                    leftOption: e.left,
                    leftIdx: e.leftIdx,
                    midOption: e.mid,
                    midIdx: e.midIdx,
                    rightOption: e.right,
                    rightIdx: e.rightIdx,
                    comparisons: e.comparisons,
                    isNewPivot: false,
                });

                break;

            default:
                break;
        }
    }

    render() {
        let isChoosePivot = !!this.state.midOption,
            qq = null;

        if (this.state.leftOption) { // check if we even have a prompt
            if (!isChoosePivot) {
                qq = <QuizQuestion left={ this.state.leftOption } right={ this.state.rightOption } 
                        prompt='Which is more important to you?' />;
            } else {
                qq = <QuizMiddleQuestion left={ this.state.leftOption } leftIdx={ this.state.leftIdx }
                        mid={ this.state.midOption } midIdx={ this.state.midIdx }
                        right={ this.state.rightOption } rightIdx={ this.state.rightIdx }
                        prompt={ <span>Which of these three is the <i>second</i> most important to you?</span> } />;
            }
        }

        let lgiClass = this.state.isNewPivot ? 'fadeBg' : '',
            divBtnMsg;

        if (QuizStore.algorithmName === 'qs') {
            divBtnMsg = (
                <span>
                    Tip: You can press <span className='kbd'>A</span> to select the left 
                        option, <span className='kbd'>L</span> to select the right option, 
                        and <span className='kbd'>F</span> to select the middle option (when there is one).
                </span>);
        } else {
            divBtnMsg = (
                <span>
                    Tip: You can press <span className='kbd'>A</span> to select the left 
                        option and <span className='kbd'>L</span> to select the right option.
                </span>);
        }

        return (
            <div>
                <ListGroup>
                    <ListGroupItem className={ lgiClass }>
                        { qq }
                        <QuizProgress />
                        <h3 style={{ textAlign: 'center' }}>Questions answered: { this.state.comparisons }</h3>
                        <p style={{ textAlign: 'center' }}>On average, this quiz is { this.state.averageQuestions } questions long, but it depends a little bit on your answers.</p>
                    </ListGroupItem>
                </ListGroup>
                <div className='text-muted container' style={{textAlign: 'center'}}>
                    { divBtnMsg }                    
                </div>
            </div>
        );
    }
}