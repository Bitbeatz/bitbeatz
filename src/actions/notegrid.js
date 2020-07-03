import { myFirebase } from '../firebase/firebase'

export const UPDATE_GRID_REQUEST = 'UPDATE_GRID_REQUEST'
export const UPDATE_GRID_SUCCESS = 'UPDATE_GRID_SUCCESS'
export const UPDATE_GRID_FAILURE = 'UPDATE_GRID_FAILURE'

/*
Since the grid is a real-time collaboration component, it needs to update the other
clients that are connected through websockets, as well as update the database when
changes are made to the grid.

Version 1: Use firebase cloud firestore to sync data in real time

*/
const requestGridUpdate = () => {
    return {
        type: UPDATE_GRID_REQUEST,
    }
}

const gridUpdateSuccess = (grid) => {
    return {
        type: UPDATE_GRID_SUCCESS,
        grid,
    }
}

const gridUpdateError = () => {
    return {
        type: UPDATE_GRID_FAILURE,
    }
}

export const updateGrid = (grid) => {
    // Update grid by project UID in firebase
    
    // Send websocket grid update to all other clients 
}