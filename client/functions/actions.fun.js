export const getConfig = (method, isUrlEncoded, body ) => {
    const reqMethod = method == 'POST' ? 'POST' : 'GET';
		const reqHeaders = {
			  "Accept": "application/json",
    		  "Content-Type": isUrlEncoded
                        ? "application/x-www-form-urlencoded" 
                        : "application/json"
		};
  	if(!body) 
  		return {
	            method: reqMethod,
	            headers: reqHeaders,
	            mode: 'cors',
	            credentials: 'include',
                cache: 'reload'
	    };
  	else 
	  	return {
	            method: reqMethod,
	            headers: reqHeaders,
	            mode: 'cors',
	            credentials: 'include',
                cache: 'reload',
                body
	    };
  		
};