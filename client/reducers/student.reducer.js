import { REHYDRATE } from 'redux-persist/constants';
import { POST_STUDENT, POST_STUDENT_SUCCESS, POST_STUDENT_FAIL,
         UPDATE_STUDENT, UPDATE_STUDENT_SUCCESS, UPDATE_STUDENT_FAIL,
         GET_STUDENTS, GET_STUDENTS_SUCCESS, GET_STUDENTS_FAIL,
         DESTROY_STUDENT_STATE, DESTROY_STUDENT_STATE_FAIL, DESTROY_STUDENT_STATE_SUCCESS,
         CLEAR_STUDENT_INFO, CHANGE_VALUE, CHANGE_TAGS,
         SEARCH_STUDENT, SEARCH_STUDENT_SUCCESS, SEARCH_STUDENT_FAIL} from 'constants';

const initialState = {};

export default function (state = initialState, action = {}) {
    const { type, payload } = action;

    switch (type) {
        case POST_STUDENT_SUCCESS:
            return {...state, ...payload.student, ...payload.info};
            break;
        case UPDATE_STUDENT_SUCCESS:
            return {...state, ...payload.student, ...payload.info};
            break;
        case GET_STUDENTS_SUCCESS:
            return {...state, ...payload.student};
            break;
        case SEARCH_STUDENT_SUCCESS:
            return {...state, ...payload};
            break;
        case POST_STUDENT_FAIL:
        case UPDATE_STUDENT_FAIL:
        case GET_STUDENTS_FAIL:
        case SEARCH_STUDENT_FAIL:
            return {...state, ...payload};
            break;
        case CHANGE_VALUE:
        case CHANGE_TAGS:
        case CLEAR_STUDENT_INFO:
            return {...state, ...payload};
            break;
        case DESTROY_STUDENT_STATE:
            return payload;
            break;
        case REHYDRATE:
            const incoming = action.payload.myReducer;
            if(incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)};
            return state;
        default:
            return state;
    }
}