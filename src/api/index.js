import axios from 'axios'

function login (emailId, password) {
    return axios.post('http://localhost:4200/auth/login', {
        'emailId': emailId,
        password: password 
      });
}

function signUp (user) {
    return axios.post('http://localhost:4200/auth/create', user );
}

function getUser(token) {
    return axios.get("http://localhost:4200/user", getToken());
}

function getNotes(token) {
    return axios.get("http://localhost:4200/note/all", getToken());
}

function createNote(note) {
    return axios.post("http://localhost:4200/note", note, getToken() )
}

function moveToTrash(note) {
    return axios.put("http://localhost:4200/note/trash", note, getToken() )
}

function updateNote(id, note) {
    return axios.put("http://localhost:4200/note/"+id,note, getToken());
}

function getHistory(id) {
    return axios.get("http://localhost:4200/note/history/"+id, getToken());
}

function getToken(){
    let token = sessionStorage.getItem("token");
    return {
        headers: {'Authorization': "bearer " + token}
    };
}

export { login, signUp, getUser, getNotes, createNote, moveToTrash, updateNote, getHistory }