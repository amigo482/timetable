import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/reducers';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
    const logger = createLogger();
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));

    sagaMiddleware.run(saga);

    return store;
}

const store = configureStore();

export default store;
