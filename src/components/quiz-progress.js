import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import Component from './component';
import '../styles/quiz-progress.css';

import * as Constants from '../constants/quiz-constants';
import QuizStore from '../stores/quiz-store';

export default class QuizProgress extends Component {
    constructor(props) {
        super(props, 'onChange');

        this.state = {
            valuesPlaced: null
        };
    }

    componentWillMount() {
        QuizStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        QuizStore.removeChangeListener(this.onChange);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextState.valuesPlaced !== !!this.state.valuesPlaced) {
            return true;
        }

        if (this.state.valuesPlaced) {
            if (this.state.valuesPlaced.length !== nextState.valuesPlaced.length) {
                return true;
            }

            for (let i = 0; i < this.state.valuesPlaced.length; i++) {
                if (this.state.valuesPlaced[i] !== nextState.valuesPlaced[i]) {
                    return true;
                }
            }
        }

        return false;
    }

    onChange(e) {
        switch (e.eventName) {
            case Constants.BEGIN_QUIZ:
            case Constants.UPDATE_PROGRESS:
                this.setState({
                    valuesPlaced: e.valuesPlaced
                });
                break;
            default:
                break;
        }
    }

    render() {
        if (!this.state.valuesPlaced) {
            return null;
        }

        let progressItems = this.state.valuesPlaced.map((pv, i) => {
                let tooltip = pv ? <Tooltip id={ 'progressTooltip' + i }>{ QuizStore.curValues[i].name }</Tooltip> : <div />;
                return (
                    <OverlayTrigger key={ 'progItem' + i } overlay={ tooltip } placement='top'>
                        <div className={'cell' + (pv ? ' placed' : '') } />
                    </OverlayTrigger>
                );
            });

        return (
            <div className='container'>
                <div className='quiz-progress'>
                    { progressItems }
                </div>
            </div>
        );
    }
}