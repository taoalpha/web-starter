// component for header part, the input box used to add new task
import React, { PropTypes, Component  } from 'react'
import DocInputBox from './DocInputBox'
import classnames from 'classnames'

class Starter extends Component {
    /* @constructor */
    constructor(props, context) {
        super(props,context);
        this.state = {
            edit: this.props.edit
        }
    }
 
    initDoc(name) {
        if (name.length !== 0) {
            //this.props.initDoc(name);
            this.props.setId(1);
            this.props.goZen();
        }
    }

    hideEdit(e) {
        e.stopPropagation();
        this.setState({edit : false});
    }

    startEdit(e) {
        e.stopPropagation();
        this.setState({edit : true});
    }

    renderStart() {
        if (this.state.edit) {
            return (
                <div className="start">
                    <DocInputBox onInit={this.initDoc.bind(this)} />
                </div>
            )
        } else {
            return (
                <div className="start">
                    <span className="icon" onClick={this.startEdit.bind(this)} /> 
                </div>
            )
        }
    }

    render() {
        return (
            <div className="welcome" onClick={this.hideEdit.bind(this)}>
                {this.renderStart()}
            </div>
        )
    }
}

Starter.propTypes = {
    // addTodo: PropTypes.func.isRequired
}

export default Starter

