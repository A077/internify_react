import { browserHistory } from 'react-router';
import { getConfig } from '../functions'
import { POST_EMPLOYER, POST_EMPLOYER_SUCCESS, POST_EMPLOYER_FAIL,
         UPDATE_EMPLOYER, UPDATE_EMPLOYER_SUCCESS, UPDATE_EMPLOYER_FAIL,
         LOGIN_EMPLOYER, LOGIN_EMPLOYER_SUCCESS, LOGIN_EMPLOYER_FAIL,
         GET_EMPLOYER, GET_EMPLOYER_SUCCESS, GET_EMPLOYER_FAIL,
         RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
         RESEND_PASSWORD, RESEND_PASSWORD_SUCCESS, RESEND_PASSWORD_FAIL,
         DESTROY_EMPLOYER_STATE, DESTROY_EMPLOYER_STATE_FAIL, DESTROY_EMPLOYER_STATE_SUCCESS,
         INVITE_STUDENTS, INVITE_STUDENTS_SUCCESS, INVITE_STUDENTS_FAIL,
         CHANGE_EMPLOYER_VALUE, CLEAR_INFO } from 'constants';

// post/register Employer ========================
export const postEmployer = (employer) => {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/register',
          newEmployer = JSON.stringify(employer),
          reqConf = getConfig('POST', false, newEmployer);
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
                dispatcher(postEmployerDispatch({
                    status: response.status,
                    json: response.json
                }));
            })
            .catch((err)=>{
                console.log(err);
                dispatcher(postEmployerDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    };
};

export const postEmployerDispatch = (response) => {
    if(response.status=='201') {
        setTimeout(()=>{browserHistory.push('/login')},2000);
        const successToaster = {
            type: "success",
            msg: response.json.msg
        };
        return {
            type: POST_EMPLOYER_SUCCESS,
            payload: {info:successToaster}
        };
    }
    const toaster = {
        type: "error",
        msg: response.json.errors
            ? response.json.errors[0].msg
            : response.json.message
                ? response.json.message
                : response.json.msg
    };
    return {
        type: POST_EMPLOYER_FAIL,
        payload: {info:toaster}
    };
};

// update employer =================================
export const updateEmployer = (employer) => {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/update',
          newEmployer = JSON.stringify(employer),          
          reqConf = getConfig('POST', false, newEmployer);
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
            .then((response) => {
                dispatcher(updateEmployerDispatch({
                    status: response.status,
                    json: response.json,
                    employer: newEmployer
                }));
            })
            .catch((err)=>{
                console.log(err)
                dispatcher(updateEmployerDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    };
};

export const updateEmployerDispatch = (response) => {
    if(response.status == '200') {
        const successToaster = {
            type: "success",
            msg: response.json.msg
        };
        return {
            type: UPDATE_EMPLOYER_SUCCESS,
            payload: {
                employer: JSON.parse(response.employer),
                info: {info: successToaster}
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
        type: UPDATE_EMPLOYER_FAIL,
        payload: {info:toaster}
    }
};

// login employer ======================================
export const loginEmployer = (payload) => {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/login',
          body = JSON.stringify({
            email: payload.email,
            password: payload.password
          }),
          reqConf=getConfig('POST', false, body);
    return (dispatcher) => {
        fetch(reqUrl, reqConf)
            .then(response => {
                return response.json().then((data)=>{
                    return {
                        status:response.status,
                        json: data
                    };
                });
            })
            .then((response) => {
                dispatcher(loginEmployerDispatch({
                    status: response.status,
                    json: response.json,
                }));
            })
            .catch((err)=>{
                console.log(err);
                dispatcher(loginEmployerDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    };
};

export const loginEmployerDispatch = (response) => {
    if(response.status=='200') {
        browserHistory.push('/profile');
        return {
            type: LOGIN_EMPLOYER_SUCCESS,
            payload: response.json.msg
        };
    }
    else if(response.status=='401') {
        return {
            type: LOGIN_EMPLOYER_FAIL,
            payload: {info:{type:"warn",msg:response.json.msg}}
        };
    }
    const toaster = {
        type: "error",
        msg: response.json.msg
    };
    return {
        type: LOGIN_EMPLOYER_FAIL,
        payload: {info:toaster}
    };
};

// get employer ===================================
export const getEmployer = () => {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/employer',
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
                dispatcher(getEmployerDispatch({
                    status: response.status,
                    json: response.json
                }));
            })
            .catch((err)=>{
                console.log(err);
                dispatcher(getEmployerDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    };
};

export const getEmployerDispatch = (response) => {
    if(response.status=='200')
        return {
            type: GET_EMPLOYER_SUCCESS,
            payload: response.json
        };
    const toaster = {
        type: "error",
        msg: response.json.msg
    };
    return {
        type: GET_EMPLOYER_FAIL,
        payload: {info:toaster}
    };
};

// handle changes on employer input fields =====================
export const handleEmployerChanges = (value, prop) => {
    return {
        type: CHANGE_EMPLOYER_VALUE,
        payload: {[prop]: value}
    };
};

// clear toaster info =======================
export const clearInfo = () => {
    return {
        type: CLEAR_INFO,
        payload: {info:{}}
    };
};

// reset password ======================================
export const resetPassword = (email) => {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/forgot/send',
          body = JSON.stringify({ email }),
          reqConf=getConfig('POST', false, body);
    return (dispatcher) => {
        fetch(reqUrl, reqConf)
            .then(response => {
                return response.json().then((data)=>{
                    return {
                        status:response.status,
                        json: data
                    };
                });
            })
            .then((response) => {
                dispatcher(resetPasswordDispatch({
                    status: response.status,
                    json: response.json
                }));
            })
            .catch((err)=>{
                console.log(err);
                dispatcher(resetPasswordDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    };
};

export const resetPasswordDispatch = (response) => {
    if(response.status=='200') {
        setTimeout(()=>{browserHistory.push('/login')},2000);
        const successToaster = {
            type: "success",
            msg: response.json.msg
        };
        return {
            type: RESET_PASSWORD_SUCCESS,
            payload: {info:successToaster}
        };
    }
    const toaster = {
        type: "error",
        msg: response.json.errors
            ? response.json.errors[0].msg
            : response.json.msg
    };
    return {
        type: RESET_PASSWORD_FAIL,
        payload: {info:toaster}
    };
};

// resend password ===========================
export const resendPassword = (passwords) => {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/forgot/recover',
          body = JSON.stringify(passwords),
          reqConf=getConfig('POST', false, body);

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
                dispatcher(resendPasswordDispatch({
                    status: response.status,
                    json: response.json
                }));
            })
            .catch((err)=>{
                console.log(err);
                dispatcher(resendPasswordDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    }
};

export const resendPasswordDispatch = (response) => {
    if(response.status=='200') {
        setTimeout(()=>{browserHistory.push('/login')},2000);
        const successToaster = {
            type: "success",
            msg: response.json.msg
        };
        return {
            type: RESEND_PASSWORD_SUCCESS,
            payload: {info:successToaster}
        };
    }
    const toaster = {
        type: "error",
        msg: response.json.msg
    };
    return {
        type: RESEND_PASSWORD_FAIL,
        payload: {info:toaster}
    };
};


// send invitation ==================
export const inviteStudents = (payload) => {
    const reqUrl = 'https://internify-simply.herokuapp.com/auth/employers/invite',
        body = JSON.stringify(payload),
        reqConf = getConfig('POST', false, body);
    return (dispatcher) => {
        fetch(reqUrl, reqConf)
            .then(response => {
                return response.json().then((data)=>{
                    return {
                        status:response.status,
                        json: data
                    };
                });
            })
            .then((response) => {
                dispatcher(inviteStudentsDispatch({
                    status: response.status,
                    json: response.json,
                }));
            })
            .catch((err)=>{
                console.log(err);
                dispatcher(inviteStudentsDispatch({
                    status: "419",
                    json: {
                        msg: "Couldn't make connection to the server"
                    }
                }));
            });
    };
};

export const inviteStudentsDispatch = (response) => {
    if(response.status=='200'){
        const successToaster = {
            type: "success",
            msg: response.json.msg
        };
        return {
            type: INVITE_STUDENTS_SUCCESS,
            payload: {info:successToaster}
        };
    }
    const toaster = {
        type: "error",
        msg: response.json.msg
    };
    return {
        type: INVITE_STUDENTS_FAIL,
        payload: {info:toaster}
    };
};

export const destroyEmployerState = () => {
    setTimeout(()=>{location.assign('https://internify-simply.herokuapp.com/auth/employers/logout')},500);
    return {
        type: DESTROY_EMPLOYER_STATE,
        payload: {}
    }
};