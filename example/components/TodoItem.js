// component for todoItem
import React, { Component, PropTypes  } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
    constructor(props,context) {
        super(props, context);
        this.state = {
            editing: false
        }
    }
    
    // double click handler
    handleDoubleClick() {
        this.setState({ editing: true })
    }

    // handle Save
    handleSave(id, text) {
        // save with nothing == delete this task
        if (text.length == 0) {
            this.props.delTodo(id);
        } else {
            // otherwise save it
            this.props.editTodo(id,text);
        }
        // either way, you are not editing
        this.setState({ editing: false });
    }

    // main render function
    render() {
        const { todo, completeTodo, delTodo } = this.props;

        let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput text={todo.text} editing={this.state.editing}
                    onSave={text => this.handleSave(todo.id,text)} />
            )
        } else {
            element = (
                <div className="view">
                    <input className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => completeTodo(todo.id)} />
                    <label onDoubleClick={this.handleDoubleClick.bind(this)}>
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={() => delTodo(todo.id)} />
                </div>
            )
        }

        return (
                <li className={classnames({
                    completed: todo.completed,
                    editing: this.state.editing
                })}>
                    {element}
                </li>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
}

export default TodoItem
