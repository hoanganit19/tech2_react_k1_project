export default class HttpClient{

    constructor(){
        //Danh sách các API
        this.category = '/categoies';
        this.users = '/users';
    }

    callApi = async (url, method='GET', body=null, token=null) => {

        const headers = {
            "Content-Type": "application/json"
        };

        if (token!==null){
            headers["Authorization"] = `Bearer ${token}`;
        }

        const options = {
            method: method,
            headers: headers
        }

        if (body!==null){
            options["body"] = JSON.stringify(body);
        }

        const response = await fetch(url, options);
    
        const data = await response.json();
        return {
            response: response,
            data: data
        };
    }

    get = (url, token) => {
        return this.callApi(url, 'GET', null, token);
    }

    post = (url, body, token=null) => {
        return this.callApi(url, 'POST', body, token);
    }

    put = (url, id, body, token=null) => {
        url = url+'/'+id;
        return this.callApi(url, 'PUT', body, token);
    }

    patch = (url, id, body, token=null) => {
        url = url+'/'+id;
        return this.callApi(url, 'PATCH', body, token);
    } 

    delete = (url, id, token=null) => {
        url = url+'/'+id;
        return this.callApi(url, 'DELETE', null, token);
    }
}