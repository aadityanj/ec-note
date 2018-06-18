import axios from 'axios'

function login (emailId, password) {
    return axios.post('http://localhost:4200/auth/login', {
        'emailId': emailId,
        password: password 
      });
}

function getUser(token) {
    return axios.get("http://localhost:4200/user", getToken());
}

function getNotes(token) {
    return axios.get("http://localhost:4200/note/all", getToken());
}

function getToken(){
    let token = sessionStorage.getItem("token");
    return {
        headers: {'Authorization': "bearer " + token}
    };
}

export { login, getUser, getNotes }