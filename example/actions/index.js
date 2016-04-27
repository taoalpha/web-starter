// define the actions we have for this app
import * as types from '../constants/ActionTypes'

export function addTodo(text) {
    return { type: types.ADD_TODO, text }
}

export function editTodo(id, text) {
    return { type: types.EDIT_TODO, id, text }
}
export function delTodo(id) {
    return { type: types.DEL_TODO, id }
}
export function completeTodo(id) {
    return { type: types.COMPLETE_TODO, id }
}
export function completeAllTodo() {
    return { type: types.COMPLETE_ALL }
}
export function clearCompleteTodo() {
    return { type: types.CLEAR_COMPLETED }
}
