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
        pool.query(`INSERT INTO ${trackTable} (playlist_id, title, uri, master_id)` +
            `VALUES (${parseInt(request.body.playlistID)},'${request.body.title}',
            '${request.body.uri}',${parseInt(request.body.master_id)})`, function(err) {
            if (err) {
                return console.error(err.message);
            }
            response.status(200).json({
                msg: 'track added'
            })
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
