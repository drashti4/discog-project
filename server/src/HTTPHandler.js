const db = require('../database/database');

function getAllTracks(request,response){
    db.getAllTracks(request, response);
}

function deleteTrackById(request, response){
    db.deleteTrackById(request, response);
}

function addTrackToList(request, response) {
    db.insertTrack(request, response);
}

module.exports = {
    getAllTracks,
    deleteTrackById,
    addTrackToList
};