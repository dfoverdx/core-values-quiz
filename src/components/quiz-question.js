import React from 'react';
import { Col, Row } from 'react-bootstrap';

import QuizButton from './quiz-button';
import QuizActions from '../actions/quiz-actions';

export default class QuizQuestion extends React.Component {
    render() {
        let { left, right, prompt } = this.props;

        return (
            <div>
                <Row>
                    <Col xs={12} style={{ textAlign: 'center' }}>
                        <h1>{ prompt }</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='two-cols'>
                        <div className='left-col'>
                            <QuizButton name={ left.name } desc={ left.desc } keyShortcut='A' btnVal={ true }
                                quizAction={ QuizActions.makeComparison } />
                        </div>
                        <div className='or-col'>
                            or
                        </div>
                        <div className='right-col'>
                            <QuizButton name={ right.name } desc={ right.desc } keyShortcut='L' btnVal={ false }
                                quizAction={ QuizActions.makeComparison } />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

QuizQuestion.propTypes = {
    left: React.PropTypes.object.isRequired,
    right: React.PropTypes.object.isRequired,
    prompt: React.PropTypes.string.isRequired,
};