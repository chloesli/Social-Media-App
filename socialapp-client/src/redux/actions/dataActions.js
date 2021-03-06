import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM} from '../types';
import axios from 'axios';

// Get all screams
export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('https://us-central1-socialapp-5cb31.cloudfunctions.net/api/screams')
    .then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })
    });
}

// Like a scream
export const likeScream = (screamId) => dispatch => {
    axios.get(`https://us-central1-socialapp-5cb31.cloudfunctions.net/api/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

// Unlike a scream
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`https://us-central1-socialapp-5cb31.cloudfunctions.net/api/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`https://us-central1-socialapp-5cb31.cloudfunctions.net/api/scream/${screamId}`)
    .then(() => {
        dispatch({type: DELETE_SCREAM, payload: screamId})
    })
    .catch(err => console.log(err))
}