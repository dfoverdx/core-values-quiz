import React from 'react';

export default class Component extends React.Component {
    constructor(props, ...methods) {
        super(props);

        for (let name of methods) {
            this[name] = this[name].bind(this);
        }
    }
}