import $ from 'jquery';
import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import Component from './component';

import QuizActions from '../actions/quiz-actions';
import QuizStore from '../stores/quiz-store';

export default class QuizQuestion extends Component {
    constructor(props) {
        super(props, 'handleBtnClick');
    }

    handleBtnClick(e) {
        QuizActions.makeComparison($(e.target).closest('button,.btn').data('btn'));
    }

    componentDidMount() {
        $(window).on('keydown', (e) => {
            if (!QuizStore.isDone) {
                switch (e.key) {
                    case 'a':
                        QuizActions.makeComparison(true);
                        break;
                    case 'l':
                        QuizActions.makeComparison(false);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    render() {
        let { option1, option2 } = this.props;

        return (
            <div>
                <Row>
                    <Col xs={12} style={{ textAlign: 'center' }}>
                        <h1>Which is more important to you?</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className='left-col'>
                            <Button bsSize="large" data-btn={1} onClick={this.handleBtnClick}>
                                <h2>{ option1.name }</h2>
                                <p>{ option1.desc}</p>
                            </Button>
                        </div>
                        <div className='or-col'>
                            or
                        </div>
                        <div className='right-col' data-btn={0} onClick={this.handleBtnClick}>
                            <Button bsSize="large">
                                <h2>{ option2.name }</h2>
                                <p>{ option2.desc}</p>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

QuizQuestion.propTypes = {
    option1: React.PropTypes.object.isRequired,
    option2: React.PropTypes.object.isRequired
};