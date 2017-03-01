import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

import Component from './component';
import QuestionSelectItem from './question-select-item';

import QuizActions from '../actions/quiz-actions';
import Questions from '../classes/questions';


export default class QuestionSelect extends Component {
    constructor(props) {
        super(props, 'handleSubmit');

        this.state = {
            selectedIdx: -1
        };
    }

    handleSelect(key) {
        this.setState({
            selectedIdx: key
        });
    }

    handleSubmit() {
        QuizActions.selectQuestion(Questions[this.state.selectedIdx]);
    }

    render() {
        let items = Questions.map((q, i) =>
            <QuestionSelectItem key={ 'q' + i } active={ i === this.state.selectedIdx } questionIdx={ i } 
                onClick={ this.handleSelect.bind(this, i) } />
        );

        return (
            <div>
                <ListGroup>
                    { items }
                </ListGroup>
                <div style={{ textAlign: 'center' }}>
                    <Button bsSize='large' bsStyle='success' onClick={ this.handleSubmit } disabled={ this.state.selectedIdx === -1 }>
                        Begin quiz
                    </Button>
                </div>
            </div>
        );
    }
}