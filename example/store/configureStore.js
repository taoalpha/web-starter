import reducer from '../reducers'
import { createStore } from 'redux'

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState);

    if (module.hot) {
        // enable webpack hot module replacement for reduers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default;
            store.replaceReducer(nextReducer);
        })
    }

    return store
}
