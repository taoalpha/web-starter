// the component for input box: used in header for adding new, in todo item for editing
import React, { Component, PropTypes  } from 'react'
import classnames from 'classnames'

class TodoTextInput extends Component {
    // maybe replace with getinitialstat  or getdefaultprops?
    constructor(props, context) {
        super(props,context);
        this.state = {
            text: this.props.text || ''
        }
    }

    // handle submit - add new item
    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            // save
            this.props.onSave(text);
            if (this.props.newTodo) {
                // reset to empty if is adding new task
                this.setState({ text:'' })
            }
        }
    }

    // handle change for input box
    handleChange(e) {
        this.setState({ text: e.target.value })
    }

    // handle blur for input box
    handleBlur(e) {
        // if editing, store the value when loose the focus
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    // main render, will bind all above to proper events
    render() {
        return (
                <input className={classnames({
                    edit: this.props.editing,
                    'new-todo': this.props.newTodo
                })}
                type='text'
                placeholder={this.props.placeholder}
                autoFocus='true'
                value={this.state.text}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleSubmit.bind(this)} />
        )
    }
}

TodoTextInput.propTypes = {
    newTodo: PropTypes.bool,
    text: PropTypes.string,
    editing: PropTypes.bool,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired
}

export default TodoTextInput
