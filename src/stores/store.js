import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/dispatcher';

let _handledSources = {};

export default class Store extends EventEmitter {
    constructor(handledSources, handleDispatch) {
        super();

        if (!handledSources) {
            throw new Error('Argument handledSources must be specified.');
        }

        if (!(handledSources instanceof Set)) {
            if (handledSources instanceof Array) {
                handledSources = new Set(handledSources);
            } else if (typeof handledSources === 'string') {
                handledSources = new Set([handledSources]);                
            } else {
                throw new Error('Argument handledSources must be a String, a Set, or an Array.');
            }
        }

        if (!handleDispatch) {
            throw new Error('Argument handleDispatch must be specified and must be a function.  It was ' + handleDispatch + '.');
        } else if (!handleDispatch instanceof Function) {
            throw new Error('Argument handleDispatch must be specified and must be a function.  Its type was ' + typeof handleDispatch + '.');
        }

        let handleDispatchWrapper = (payload) => {
            if (_handledSources[this.dispatcherIndex].has(payload.source)) {
                // try {
                    handleDispatch.call(this, payload);
                // } catch (ex) {
                //     if (ex instanceof UserError) {
                //         this.emitError({
                //             source: payload.source, 
                //             errorMessage: ex.message,
                //             fn: payload.action.actionType
                //         });
                //     } else {
                //         throw ex;
                //     }
                // }
            }
        };

        this.dispatcherIndex = AppDispatcher.register(handleDispatchWrapper);
        _handledSources[this.dispatcherIndex] = handledSources;

    }

    /* 
    // used for listening to changes
    */
    emitChange(args) {
        this.emit('change', args);
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

    /* 
    // used for listening for errors
    */
    emitError(args) {
        this.emit('error', args);
    }

    addErrorListener(callback) {
        this.on('error', callback);
    }

    removeErrorListener(callback) {
        this.removeListener('error', callback);
    }

    // _addEmitMethods(eventName) {
    //     let capEventName = eventName.charAt(0) + eventName.slice(1);

    //     this['emit' + capEventName] = (function (args) {
    //         this.emit(eventName, args);
    //     }).bind(this);

    //     this['add' + capEventName + 'Listener'] = (function (callback) {
    //         this.on(eventName, callback)
    //     }).bind(this);

    //     this['remove' + capEventName + 'Listener'] = (function (callback) {
    //         this.removeListener(eventName, callback);
    //     }).bind(this);
    // }
}