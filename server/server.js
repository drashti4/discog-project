const express = require('express');
const path = require('path');
const cors= require('cors');
const httpHandler = require('./src/HTTPHandler');
const app = express();
const PORT = 3002;

// middleware == true
app.use(cors());
app.use(express.static(path.join(__dirname,'./public'))); //Conflicting views
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/',httpHandler.sendRootPage);
app.get('/users',httpHandler.getUsers);
app.get('/users/:id',httpHandler.getUser);
app.post('/users',httpHandler.addUser);
app.put('/users/:id',httpHandler.updateUser);
app.delete('/users/:id',httpHandler.deleteUser);

app.get('/tracks',httpHandler.getAllTracks);
app.delete('/track/:id',httpHandler.deleteTrackById);
app.post('/tracks',httpHandler.getAllTracks);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));