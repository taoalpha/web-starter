// define the actions we have for this app
import * as types from '../constants/ActionTypes'

/**
 * Init the file
 * @param {object} obj - Object contains basic information about the doc
 * @param {string} obj.name - The name of the doc
 * @param {number} obj.expire - The expire time for this doc (seconds)
 * @param {number} obj.focus - The focus time for this doc (minutes)
 * @param {string} obj.font - The font name will be used in the doc
 * @return {object}
 */
export function initDoc(obj) {
    return { type: types.INIT_DOC, ...obj }
}

/**
 * Save the doc
 * @param {number} id - The id of the doc you want to save
 * @return {object}
 */
export function saveDoc(id,content) {
    return { type: types.SAVE_DOC, id, content}
}

/**
 * Delete the doc
 * @param {number} id - The id of the doc you want to delete
 * @return {object}
 */
export function delDoc(id) {
    return { type: types.DEL_DOC, id }
}
