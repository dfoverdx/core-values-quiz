import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import QuizStore from '../stores/quiz-store';
import Component from './component';

export default class AlgorithmSelect extends Component {
    constructor(props) {
        super(props, 'handleSelectionChange');
    }

    handleSelectionChange(e) {

    }

    render() {
        return (
            <FormGroup>
                <ControlLabel>Sorting Method</ControlLabel>
                <FormControl componentClass='select' placeholder='Sorting Method'>
                    <option value='qs'>Quicksort -- average of 284 questions, but easier for the mind to process</option>
                    <option value='ms'>Merge sort -- average of 269 questions, but harder for the mind to process</option>
                </FormControl>
            </FormGroup>
        );
    }
};