/** 
 * DocTextField
 * @author Tao <tao@taoalpha.me>
 */
import React, { Component, PropTypes  } from 'react'
import classnames from 'classnames'

/**
 * Define the logic of the main text field, including the update, expire, finish ...etc
 * @class
 * @extend react.Component
 */
class DocTextField extends Component {
    /* @constructor */
    constructor(props, context) {
        super(props,context);
        this.state = {
            focus: this.props.focus*60,
            expire: this.props.expire,
            id: this.props.id,
            content: this.props.content || ''
        }
    }

    /**
     * Timer function, decrease the timer for focus and expire.
     */
    tick() {
        /* don't decrease if nothing has been wrote and focus timer is full */
        if (this.state.content === "" && this.state.focus === this.props.focus*60) {
            return;
        }
        /* if expire timer is down to 0, then clear the content */
        if (this.state.expire == 0) {
            this.handleClear();
            this.refs.textarea.style.color = "rgba(0,0,0,1)";
            return;
        }
        /* set cotent to some degree of transparency when expire timer is keep going down */
        if (this.state.expire <= this.props.expire*0.6) {
            this.refs.textarea.style.color = `rgba(0,0,0,${this.state.expire/this.props.expire})`;
        } else {
            this.refs.textarea.style.color = "rgba(0,0,0,1)";
        }

        /* finish when focus timer is down to 0 */
        if (this.state.focus == 0) {
            this.handleSave();
            clearInterval(this.interval);
            this.interval = setInterval(this.handleSave.bind(this), 1000);
        }

        /* decrese the focus timer and expire timer by 1 per second */
        this.setState({expire: this.state.expire - 1, focus: this.state.focus - 1});
    }

    /* set the timer up after mount the component */
    componentDidMount() {
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    /* reset the expire timer */
    handleTimer() {
        this.setState({expire: this.props.expire});
    }

    /* save the doc content */
    handleSave() {
        const content = this.refs.textarea.value;
        // id?
        this.props.saveDoc(this.state.id,content);
        this.setState({ content:'' })
    }

    /* clear content and reset the focus timer and expire timer */
    handleClear() {
        this.setState({ content: '', focus: this.props.focus*60, expire: this.props.expire });
    }

    /** 
     * update the state - content
     * @param {object} e - the change event, to get the content
     */
    handleChange(e) {
        this.setState({ content: e.target.value })
    }

    handleDel() {
        clearInterval(this.interval);
        this.props.onDel(this.state.id);
    }

    /* save the doc content */
    showTime() {
        return `${parseInt(this.state.focus / 60)} : ${(this.state.focus % 60) > 9 ? (this.state.focus % 60) : "0"+(this.state.focus % 60)}`;
    }

    // main render, will bind all above to proper events
    render() {
        return (
            <div className={classnames("MarkdownEditor",{
                edit: this.props.editing
            })}>
                <textarea
                placeholder={this.props.placeholder}
                ref="textarea"
                onKeyDown={this.handleTimer.bind(this)}
                value={this.state.content}
                onChange={this.handleChange.bind(this)} />
                <span className="timer">{this.showTime()}</span>
                <span className="close" onClick={this.handleDel.bind(this)}>X</span>
            </div>
            )
    }
}

DocTextField.propTypes = {
    content: PropTypes.string,
    editing: PropTypes.bool,
    focus: PropTypes.number,
    expire: PropTypes.number,
    placeholder: PropTypes.string,
    saveDoc: PropTypes.func.isRequired
}

export default DocTextField
