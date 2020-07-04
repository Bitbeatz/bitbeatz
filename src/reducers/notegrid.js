import {
    UPDATE_GRID_REQUEST,
    UPDATE_GRID_SUCCESS,
    UPDATE_GRID_FAILURE
} from '../actions/notegrid'

export default (
    state = {
        isUpdating: false,
        updateError: false,
        isUpdated: false,
    },
    action,
) => {
    switch(action.type) {
    case UPDATE_GRID_REQUEST:
        return {
            ...state,
            isUpdating: true,
            updateError: false,
            isUpdated: false,
        }
    case UPDATE_GRID_SUCCESS:
        return {
            ...state,
            isUpdating: false,
            updateError: false,
            isUpdated: true,
        }
    case UPDATE_GRID_FAILURE:
        return {
            ...state,
            isUpdating: false,
            updateError: true,
            isUpdated: false,
        }
    default:
        return state
    }
}