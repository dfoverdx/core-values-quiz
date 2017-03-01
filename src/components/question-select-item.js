import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';

import Questions from '../classes/questions';

export default class QuestionSelectItem extends Component {
    render() {
        return (
            <ListGroupItem onClick={ this.props.onClick.bind(this, this.props.questionIdx) } active={ this.props.active }>
                { Questions[this.props.questionIdx].plural }
            </ListGroupItem>
        );
    }
}

QuestionSelectItem.propTypes = {
    active: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    questionIdx: React.PropTypes.number.isRequired
};