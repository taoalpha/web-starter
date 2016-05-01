// the component for input box: used in header for adding new, in todo item for editing
import React, { Component, PropTypes  } from 'react'
import classnames from 'classnames'

class DocInputBox extends Component {
    // maybe replace with getinitialstat  or getdefaultprops?
    constructor(props, context) {
        super(props,context);
        this.state = {
            name: this.props.name || ''
        }
    }

    handleClick(e) {
        e.stopPropagation();
    }
    // handle submit - add new item
    handleSubmit(e) {
        const name = e.target.value.trim();
        if (e.which === 13) {
            // init the file
            this.props.onInit(name);
            // reset this field to empty
            this.setState({ name:'' })
        }
    }

    // handle change for input box
    handleChange(e) {
        this.setState({ name: e.target.value })
    }

    // main render, will bind all above to proper events
    render() {
        return (
                <input className={classnames({
                    hide: this.props.edit
                })}
                type='text'
                placeholder={this.props.placeholder}
                value={this.state.text}
                onClick={this.handleClick.bind(this)}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleSubmit.bind(this)} />
        )
    }
}

DocInputBox.propTypes = {
    name: PropTypes.string,
    editing: PropTypes.bool,
    placeholder: PropTypes.string,
    onInit: PropTypes.func.isRequired
}

export default DocInputBox
