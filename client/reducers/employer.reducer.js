import { REHYDRATE } from 'redux-persist/constants';
import { POST_EMPLOYER, POST_EMPLOYER_SUCCESS, POST_EMPLOYER_FAIL,
         UPDATE_EMPLOYER, UPDATE_EMPLOYER_SUCCESS, UPDATE_EMPLOYER_FAIL,
         LOGIN_EMPLOYER, LOGIN_EMPLOYER_SUCCESS, LOGIN_EMPLOYER_FAIL,
         GET_EMPLOYER, GET_EMPLOYER_SUCCESS, GET_EMPLOYER_FAIL,
         SEARCH_STUDENT, SEARCH_STUDENT_SUCCESS, SEARCH_STUDENT_FAIL,
         RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
         RESEND_PASSWORD, RESEND_PASSWORD_SUCCESS, RESEND_PASSWORD_FAIL,
         DESTROY_EMPLOYER_STATE, DESTROY_EMPLOYER_STATE_FAIL, DESTROY_EMPLOYER_STATE_SUCCESS,
         INVITE_STUDENTS, INVITE_STUDENTS_SUCCESS, INVITE_STUDENTS_FAIL,
         CHANGE_EMPLOYER_VALUE, CLEAR_INFO } from 'constants';

const initialState = {};

export default function (state = initialState, action = {}) {
    const { type, payload } = action;

    switch (type) {
        case POST_EMPLOYER_SUCCESS:
            return {...state, ...payload}
            break;
        case LOGIN_EMPLOYER_SUCCESS:
            return state;
            break;        
        case UPDATE_EMPLOYER_SUCCESS:
            return {...state, ...payload.employer, ...payload.info};
            break;
        case GET_EMPLOYER_SUCCESS:
            return {...state, ...payload.employer};
            break;
        case INVITE_STUDENTS_SUCCESS:
            return {...state, ...payload};
            break;
        case RESET_PASSWORD_SUCCESS:
        case RESEND_PASSWORD_SUCCESS:
            return { ...state, ...payload};
            break;
        case POST_EMPLOYER_FAIL:
        case UPDATE_EMPLOYER_FAIL:
        case LOGIN_EMPLOYER_FAIL:
        case GET_EMPLOYER_FAIL:
        case RESET_PASSWORD_FAIL:
        case INVITE_STUDENTS_FAIL:
        case RESEND_PASSWORD_FAIL:
            return { ...state, ...payload};
            break;            
        case CHANGE_EMPLOYER_VALUE:
        case CLEAR_INFO:        
            return {...state, ...payload};
            break;
        case DESTROY_EMPLOYER_STATE:
            return payload;
            break;
        case REHYDRATE:
            const incoming = action.payload.myReducer;
            if(incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)};
            return state;
        default:
            return state;
            break;
    }
}