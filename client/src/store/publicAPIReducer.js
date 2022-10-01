import {GetPublicAPI} from "../api/api";

const SET_PUBLIC_API = "SET_PUBLIC_API"

let initialState = {
    publicAPI : []
}

const publicAPIReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PUBLIC_API: {
            return {
                ...state,
                publicAPI: action.payload
            }
        }
        default:
            return state
    }
}

export const getPublicAPI = (search) => {
    return async (dispatch) => {
        const data = await GetPublicAPI(search)
        dispatch({type: SET_PUBLIC_API, payload: data})
    }
}

export default publicAPIReducer