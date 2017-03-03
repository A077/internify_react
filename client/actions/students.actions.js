import { browserHistory } from 'react-router';
import { getConfig } from '../functions'
import { POST_STUDENT, POST_STUDENT_SUCCESS, POST_STUDENT_FAIL,
         UPDATE_STUDENT, UPDATE_STUDENT_SUCCESS, UPDATE_STUDENT_FAIL,
         GET_STUDENTS, GET_STUDENTS_SUCCESS, GET_STUDENTS_FAIL,
         DESTROY_STUDENT_STATE, DESTROY_STUDENT_STATE_FAIL, DESTROY_STUDENT_STATE_SUCCESS,
         CLEAR_STUDENT_INFO, CHANGE_VALUE, CHANGE_TAGS,
         SEARCH_STUDENT, SEARCH_STUDENT_SUCCESS, SEARCH_STUDENT_FAIL} from 'constants';

// post/register student ===========================
export const postStudent = (student) => {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/students/register',
          newStudent = JSON.stringify(student),
          reqConf = getConfig('POST', false, newStudent);
    return (dispatcher) => {
        fetch(reqUrl, reqConf)
            .then((response) => {
                return response.json().then((data)=>{
                    return {
                        status:response.status,
                        json: data
                    };
                });
            })
            .then((response)=>{
                dispatcher(postStudentDispatch({
                    status: response.status,
                    json: response.json,
                    student: newStudent
                }));
            })
            .catch((err)=>{
                console.log(err);
                dispatcher(postStudentDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    }
};

export const postStudentDispatch = (response) => {
    if(response.status == '201') {
        setTimeout(()=>{browserHistory.push('/profile')},2000);
        const successToaster = {
            type: "success",
            msg: response.json.msg
        };
        return {
            type: POST_STUDENT_SUCCESS,
            payload: {
                student: JSON.parse(response.student),
                info: {info:successToaster}
            }
        };
    }
    const toaster = {
        type: "error",
        msg: response.json.errors 
             ? response.json.errors[0].msg 
             : response.json.message
             ? response.json.message
             : response.json.msg
    }
    return {
        type: POST_STUDENT_FAIL,
        payload: {info:toaster}
    }
};

// update student ===========================
export const updateStudent = (student) => {    
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/students/update',
          newStudent = JSON.stringify(student),
          reqConf = getConfig('POST', false, newStudent);
    return (dispatcher) => {
        fetch(reqUrl, reqConf)
            .then((response) => {
                return response.json().then((data)=>{
                    return {
                        status:response.status,
                        json: data
                    };
                });
            })
            .then((response)=>{
                dispatcher(updateStudentDispatch({
                    status: response.status,
                    json: response.json,
                    student: newStudent
                }));
            })
            .catch((err)=>{
                dispatcher(updateStudentDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    }
};

export const updateStudentDispatch = (response) => {
    if(response.status=='200') {
        const successToaster = {
            type: "success",
            msg: response.json.msg
        };
        return {
            type: UPDATE_STUDENT_SUCCESS,
            payload: {
                student: JSON.parse(response.student),
                info: {info:successToaster}
            }
        };
    }
    const toaster = {
        type: "error",
        msg: response.json.errors 
             ? response.json.errors[0].msg 
             : response.json.msg
    };
    return {
        type: UPDATE_STUDENT_FAIL,
        payload: {info:toaster}
    };
};

// get student ===========================
export const getStudents = () => {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/students/student',
          reqConf = getConfig('GET', false);
    return (dispatcher) => {
        fetch(reqUrl, reqConf)
            .then((response)=>{
                return response.json().then((data)=>{
                    return {
                        status:response.status,
                        json: data
                    };
                });
            })
            .then((response) => {
                dispatcher(getStudentsDispatch({
                    status: response.status,
                    json: response.json
                }));
            })
            .catch((err)=>{
                dispatcher(getStudentsDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    }
};

export const getStudentsDispatch = (response) => {
    if(response.status=='200') 
        return {
            type: GET_STUDENTS_SUCCESS,
            payload: response.json
        };
    const toaster = {
        type: "error",
        msg: response.json.msg
    };
    return {
        type: GET_STUDENTS_FAIL,
        payload: {info:toaster}
    };

};

// handle changes on student input fields =====================
export const handleChanges = (value,prop) => {
    return {
      type: CHANGE_VALUE,
      payload: {[prop]: value}
    };
};

// handle changes on skill tags ==========================
export const changeTags = (tags) => {
    return {
        type: CHANGE_TAGS,
        payload: {skills: tags}
    }
};

// clear toaster info =======================
export const clearStudentInfo = () => {
    return {
        type: CLEAR_STUDENT_INFO,
        payload: {info:{}}
    };
};

// search students =========================================
export const searchStudents = (query) => {
    const reqUrl = `https://internify-simply.herokuapp.com/api/students/search?${query}`,
          reqConf = getConfig('GET', true);
    return (dispatcher) => {
        fetch(reqUrl, reqConf)
            .then((response)=>{
                return response.json().then((data)=>{
                    return {
                        status:response.status,
                        json: data
                    };
                });
            })
            .then((response) => {
                dispatcher(searchStudentsDispatch({
                    status: response.status,
                    json: response.json
                }));
            })
            .catch((err)=>{
                console.log(err);
                dispatcher(searchStudentsDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    };
};

export const searchStudentsDispatch = (response) => {
    if(response.status=='200')
        return {
            type: SEARCH_STUDENT_SUCCESS,
            payload: {count:response.json.msg}
        };
    const toaster = {
        type: "error",
        msg: response.json.msg
    };
    return {
        type: SEARCH_STUDENT_FAIL,
        payload: {info:toaster}
    };
};

export const destroyStudentState = () => {
    setTimeout(()=>{location.assign('https://internify-simply.herokuapp.com/auth/students/logout')},500);
    return {
        type: DESTROY_STUDENT_STATE,
        payload: {}
    }
};