// reducer for todo items
import { INIT_DOC, DOWNLOAD_DOC, SAVE_DOC, DEL_DOC } from '../constants/ActionTypes'

const initialState = [
    {
        name : "Demo",
        content: "Hi, I will disappear in 5 seconds, if you do nothing!",
        expire: 5,
        focus: 15,
        completed: true,
        id: 0
    }
]

export default function docs(state = initialState, action) {
    switch (action.type) {
        case INIT_DOC:
            return [
            ...state,
            {
                id : state.length,
                completed: false,
                ...action
            }
            ]
        case SAVE_DOC:
            return state.filter(doc => 
                doc.id === action.id ? Object.assign({}, doc, { content: action.content, completed: true }) : doc
            )
        case DEL_DOC:
            return state.filter(doc =>
                doc.id !== action.id
            )
        default:
            return state
    }
}
