import React from 'react';
import { Row, Col } from 'react-bootstrap';

import QuizActions from '../actions/quiz-actions';
import QuizButton from './quiz-button';

export default class QuizMiddleQuestion extends React.Component {
    render() {
        let { left, leftIdx, mid, midIdx, right, rightIdx, prompt } = this.props;

        return (
            <div>
                <Row>
                    <Col xs={12} style={{ textAlign: 'center' }}>
                        <h1>{ prompt }</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='three-cols'>
                        <div className='left-col'>
                            <QuizButton name={ left.name } desc={ left.desc } keyShortcut='A' btnVal={ leftIdx }
                                quizAction={ QuizActions.chooseMiddle } />
                        </div>
                        <div className='mid-col'>
                            <QuizButton name={ mid.name } desc={ mid.desc } keyShortcut='F' btnVal={ midIdx }
                                quizAction={ QuizActions.chooseMiddle } />
                        </div>
                        <div className='right-col'>
                            <QuizButton name={ right.name } desc={ right.desc } keyShortcut='L' btnVal={ rightIdx }
                                quizAction={ QuizActions.chooseMiddle } />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='text-muted' style={{ textAlign: 'center', marginTop: 4 }}>
                        <b>What's this?</b> Correctly choosing the second most important option does not affect the 
                        ordering, but reduces the number of questions needed by an average of 27 questions.
                    </Col>
                </Row>
            </div>
        );
    }
}

QuizMiddleQuestion.propTypes = {
    left: React.PropTypes.object.isRequired,
    leftIdx: React.PropTypes.number.isRequired,
    mid: React.PropTypes.object.isRequired,
    midIdx: React.PropTypes.number.isRequired,
    right: React.PropTypes.object.isRequired,
    rightIdx: React.PropTypes.number.isRequired,
    prompt: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element,
            React.PropTypes.object,
        ]).isRequired,
};