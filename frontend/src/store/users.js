import jwtFetch from "./jwt"


const RECEIVE_USERS = '/api/RECEIVE_USERS'

const receiveUsers = (users) => {
    return ({
        type: RECEIVE_USERS,
        users
    })
}

const usersReducer = (state={}, action) => {
    Object.freeze(state)
    let nextState = { ...state }

    switch(action.type) {
        case RECEIVE_USERS:
            let users = {}
            let payload = Object.values(action.users)
            for (let i=0; i<payload.length; i++) {
                users[payload[i]._id] = payload[i]
            }
            nextState = {...state, ...users}
            return nextState
        default:
            return state
    }
}

export const fetchAllUsers = () => async (dispatch) => {
    const res = await jwtFetch('/api/users/')

    const data = await res.json()
    dispatch(receiveUsers(data))
}

export default usersReducer