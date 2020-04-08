const nodeFS = require('./node-fs');
const db = require('../database/database');

let objFS = new nodeFS();
const STATUS_OK = 200;
const STATUS_NOT_FOUND = 203;
const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_HTML = 'text/html';
const DATA_FILE = 'test.json';
const TEST_DATA = [
    {"id":100,"userName":"mvachon","age":12},
    {"id":101,"userName":"jcote","age":66},
    {"id":102,"userName":"pmartineau","age":99},
    {"id":104,"userName":"updated","age":"25"}];

function getAllTracks(request,response){
    db.getAllTracks(request, response);
}

function deleteTrackById(request, response){
    db.deleteTrackById(request, response);
}

function addTrackToList(request, response) {
    db.insertTrack(request, response);
}

function sendRootPage(request, response){
    response.status(STATUS_OK).contentType(CONTENT_TYPE_HTML).sendFile('./public/index.html');
}

function getUsers(request, response){
    response.json(TEST_DATA);
}


function getUser(request, response){
    const paramID = parseInt(request.params.id);
    const data = objFS.readFrom(DATA_FILE);
    const found = data.some(user => user.id === paramID);
    if(found){
        response.json(data.filter(user=> user.id === paramID));
    }else{
        response.status(STATUS_NOT_FOUND).json({
            error: 'Elment not found',
            id: paramID
        });
    }
}

function addUser(request,response){
    if(!request.body.id || !request.body.userName || !request.body.age){
        response.status(STATUS_NOT_FOUND).json({
            errorCode: STATUS_NOT_FOUND,
            msg: 'You are missing parameter'
        });
    }
    const newUser = {
        id: parseInt(request.body.id),
        userName: request.body.userName,
        age: parseInt(request.body.age)
    }
    objFS.addData(DATA_FILE, request.body);
    response.json(request.body);
}

function updateUser(request, response){
    objFS.updateData(DATA_FILE, request.body);
    response.status(STATUS_OK).json(request.body);
}

function deleteUser(request, response){
    const paramID = parseInt(request.params.id);
    objFS.removeData(DATA_FILE, paramID);
    response.status(STATUS_OK).json({
        msg: 'user deleted'
    });
}

module.exports = {
    updateUser,
    deleteUser,
    addUser,
    getUser,
    getUsers,
    sendRootPage,
    getAllTracks,
    deleteTrackById,
    addTrackToList
};