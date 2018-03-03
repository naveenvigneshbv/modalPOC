import { combineReducers } from 'redux';

import { DATA_AVAILABLE, MODAL_TRIGGER } from '../actions/'; // Importing actions types constant we defined in our action file

let dataState = { data: [], loading: true };
const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading: false});
            return state;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    dataReducer,
});

export default rootReducer;