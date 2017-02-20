import React from 'react';
import Component from './component';
import FileSaver from 'file-saver';
import { Col, Panel, ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';

export default class QuizResults extends Component {
    constructor(props) {
        super(props, 'saveResults');
    }

    saveResults() {
        let str = '',
            array = this.props.array;
        for (let i = 0; i < array.length; i++) {
            str += (i + 1) + '. ' + array[i].name + ' - ' + array[i].desc + '\r\n';
        }

        let blob = new Blob([str], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, 'core values.txt');
    }

    render() {
        let items = this.props.array.map(i => <ListGroupItem><span style={{ fontSize: '24px'}}>{i.name}</span> {i.desc}</ListGroupItem>);

        return (
            <div>
                <Col xs={12} sm={8}>
                    <ListGroup>
                        {items}
                    </ListGroup>
                </Col>
                <Col xs={12} sm={4}>
                    <Panel header="Results">
                        <Button onClick={this.saveResults} style={{width: '100%'}}>
                            <Glyphicon glyph='floppy-save' style={{marginRight: 6}} />
                            Save results to file
                        </Button>
                    </Panel>
                </Col>
            </div>
        );
    }
}