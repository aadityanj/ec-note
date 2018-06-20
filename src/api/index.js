import axios from 'axios'
import { serverURL } from '../url';

function login (emailId, password) {
    return axios.post( serverURL +'auth/login', {
        'emailId': emailId,
        password: password 
      });
}

function signUp (user) {
    return axios.post( serverURL +'auth/create', user );
}

function getUser(token) {
    return axios.get( serverURL + "user", getToken());
}

function getNotes(token) {
    return axios.get( serverURL + "note/all", getToken());
}

function createNote(note) {
    return axios.post(serverURL + "note", note, getToken() )
}

function moveToTrash(note) {
    return axios.put(serverURL + "note/trash", note, getToken() )
}

function updateNote(id, note) {
    return axios.put(serverURL + "note/"+id,note, getToken());
}

function getHistory(id) {
    return axios.get(serverURL + "note/history/"+id, getToken());
}

function getToken(){
    let token = sessionStorage.getItem("token");
    return {
        headers: {'Authorization': "bearer " + token}
    };
}

export { login, signUp, getUser, getNotes, createNote, moveToTrash, updateNote, getHistory }