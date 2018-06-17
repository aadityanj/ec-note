import axios from 'axios'

function login (emailId, password) {
    return axios.post('http://localhost:4200/auth/login', {
        'emailId': emailId,
        password: password 
      });
}

function getUser(token) {
    var config = {
        headers: {'Authorization': "bearer " + token}
    };
    return axios.get("http://localhost:4200/user", config);
}

export { login, getUser }