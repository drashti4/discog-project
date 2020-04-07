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
    query: (sqlStatement) => {
        return pool.query(sqlStatement)
        //.then(response => response.rows)
        //.catch(error => console.log(error));
    },

    getAllTracks: (request, response) => {
        pool.query(selectTracksCommand, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    },

    deleteTrackById: (request, response) => {

    pool.query(`DELETE FROM track WHERE id=${request.params.id}`, function(err) {
        if (err) {
            return console.error(err.message);
        }

        response.status(200).json({
            msg: 'user deleted'
        })
    })
    },


    insertTrack:(playlistID, title, uri, master_id)=>{
        return pool.query(`INSERT INTO ${trackTable} (playlist_id, title, uri, master_id)` +
             `VALUES (${playlistID},'${title}','${uri}',${master_id})`)

    }
};
