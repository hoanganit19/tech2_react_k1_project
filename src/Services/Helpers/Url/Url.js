export default class Url {
    getSearch = (params) => {
        let url = '/tim-kiem/';
        if (Object.keys(params).length){
            const queryString = new URLSearchParams(params).toString();
            url = url+'?'+queryString;
        }
       
        return url
    }

    getSong = (id, slug) => {
        let url = '/bai-hat/'+slug+'-'+id+'.html';
        return url;
    }
}