// reducer for todo items
import { ADD_TODO, DEL_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const initialState = [
    {
        text: "USE Redux",
        completed: false,
        id: 0
    }
]

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return [
            ...state,
            {
                id : state.reduce( (maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                completed: false,
                text: action.text
            }
            ]
        case EDIT_TODO:
            return state.map((todo) =>
                todo.id === action.id ? Object.assign({}, todo, { text: action.text }) : todo
            )
        case DEL_TODO:
            return state.filter(todo => 
                todo.id !== action.id
            )
        case COMPLETE_TODO:
            return state.map(todo =>
                todo.id === action.id ? Object.assign({}, todo, {completed: !todo.completed}) : todo
            )
        case COMPLETE_ALL:
            const areAllMarked = state.every(todo => todo.completed)
            return state.map(todo => 
                Object.assign({}, todo, {completed: !areAllMarked})
            )
        case CLEAR_COMPLETED:
            return state.filter(todo => !todo.completed)
        default:
            return state
    }
}
