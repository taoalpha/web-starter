// component for footer (filters..)
import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/FilterTypes'

const FILTER_TITLES = {
    [SHOW_ALL]: 'All',
    [SHOW_ACTIVE]: 'Active',
    [SHOW_COMPLETED]: 'Complete'
}

class Footer extends Component {
    // render the counter that shows how many items left
    renderTodoCount() {
        // get current count from props
        const { activeCount } = this.props;
        const itemWord = activeCount === 1 ? 'item' : 'items';

        return (
            <span className="todo-count">
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
        )
    }
    // render the filter
    renderFilterLink(filter) {
        const title = FILTER_TITLES[filter];
        // get current filter from props
        // get the click function from props
        const { filter: selectedFilter, onShow } = this.props;

        return (
            <a className={classnames({ selected: filter === selectedFilter })}
                style={{ cursor: 'pointer' }}
                onClick={() => onShow(filter)}>
                {title}
            </a>
        )
    }
    // render the clear button
    renderClearButton() {
        // get the number of completed tasks and clear function for onlick from props
        const { completedCount, onClearCompleted } = this.props;
        // only show this button when we have completed tasks
        if (completedCount > 0) {
            return (
                <button className="clear-completed"
                    onClick={onClearCompleted} >
                    Clear Completed
                </button>
            )
        }
    }
    // main render functions, will call all above
    render() {
        return (
            <footer className="footer">
                {this.renderTodoCount()}
                <ul className="filters">
                    {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter => 
                        <li key={filter}>
                            {this.renderFilterLink(filter)}
                        </li>
                    )}
                </ul>
                {this.renderClearButton()}
            </footer>
         )
    }
}


Footer.propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
}

export default Footer
