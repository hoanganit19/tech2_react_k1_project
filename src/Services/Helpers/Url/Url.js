export default class Url {

    constructor(){
        this.home = '/';
        this.login = '/auth/login';
        this.register = 'auth/register';
        this.forgotPassword = 'auth/forgot-password';
        this.logout = 'auth/logout';
        this.search = '/tim-kiem';
        this.profile= '/ca-nhan';
        this.categories = '/the-loai';
        this.category = this.categories+'/{id}.html';
        this.song = '/bai-hat/{slug}-{id}.html';
        this.playlist = '/danh-sach-phat/{id}.html';
    }

    getSearch = (params) => {
        let url = this.search;
        if (Object.keys(params).length){
            const queryString = new URLSearchParams(params).toString();
            url = url+'?'+queryString;
        }
       
        return url
    }

    getSong = (id, slug) => {
        //let url = '/bai-hat/'+slug+'-'+id+'.html';
        let url = this.song;
        url = url.replace('{slug}', slug).replace('{id}', id);
        return url;
    }

    getCategory = (id) => {
        let url = this.category;
        url = url.replace('{id}', id);
        return url;
    }

    getPlaylist = (id) => {
        let url = this.playlist;
        url = url.replace('{id}', id);
        return url;
    }
}