const {Pool} = require('pg');
const PG_HOST = 'localhost';
const PG_PORT = 5432;
const PG_DATABASE = 'final-project-music-albums';
const PG_USER  ='discogServer';
const PG_PASSWORD = 'discogServer';

const pool = new Pool({
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD
});

const playlistTable = 'playlist';
const trackTable = 'track';
const selectTracksCommand = `select * from ${trackTable}`;
const selectTitlePlaylist = `select * from ${playlistTable}`;

module.exports = {

    getAllTracks: (request, response) => {
        pool.query(selectTracksCommand, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    },

    insertTrack:(request, response)=>{
        let genre = request.body.genres[0];
        pool.query("SELECT * FROM "+playlistTable+" WHERE title=($1)", [genre], (error, result) => {
            if (error) {
                return console.error(error.message);
            }
            if(result.rows.length>0){
                if (result) {
                    result.rows.forEach((row) => {
                        module.exports.addExistingTrack(request, response, row.id);
                    });
            }
            }else {
                module.exports.addExistingTrack(request, response, 1);
            }
        })
    },


    addExistingTrack: (request, response, id) => {

        console.log(`inserted with ${request.body.title} with id ${id}`);

        pool.query(`INSERT INTO ${trackTable} (playlist_id, title, uri, master_id)` +
            `VALUES (${parseInt(id)},'${request.body.title}',
               '${request.body.uri}',${parseInt(request.body.master_id)})`, function(err) {
            if (err) {
                return console.error(err.message);
            }
        })
    },

    deleteTrackById: (request, response) => {
    pool.query(`DELETE FROM ${trackTable} WHERE id=${request.params.id}`, function(err) {
        if (err) {
            return console.error(err.message);
        }
        response.status(200).json({
            msg: 'track deleted'
        })
    })
    }

}
