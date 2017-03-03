import { routerReducer as routing } from 'react-router-redux';
import student from './student.reducer';
import employer from './employer.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    routing,
    student,
    employer
});
