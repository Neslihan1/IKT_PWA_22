const express = require('express');
const mongoose = require('mongoose');
const Grid = require("gridfs-stream");
const multer = require('multer');
const router = express.Router();
const { GridFsStorage } = require('multer-gridfs-storage')
const { MongoClient } = require('mongodb');
require('dotenv').config();

const connect = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "posts";

let gfs, gfsb;
connect.once('open', () => {
    
    gfsb = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "posts"
    });

    gfs = Grid(connect.db, mongoose.mongo);
 
});

router.get('/show/:filename', async(req, res) => {
    try {
        const cursor = await gfs.collection('posts').find({ filename: req.params.filename });
        cursor.forEach(doc => {
            console.log('doc', doc);
              const id = doc._id.valueOf();
              console.log('doc._id', id);
            gfsb.openDownloadStream(doc._id).pipe(res);
        })
    } catch (error) {
        console.log('error', error);
        res.send("not found");
    }
});

router.get('/send/:filename', async(req, res) => {

    let fileName = req.params.filename;

    MongoClient.connect(process.env.DB_CONNECTION, (err, client) => {

        const db = client.db(dbName);
        const collection = db.collection('posts.files');
        const collectionChunks = db.collection('posts.chunks');

        collection.find({filename: fileName}).toArray( (err, docs) => {

                collectionChunks.find({files_id : docs[0]._id}).sort({n: 1}).toArray( (err, chunks) => {

                    let fileData = [];
                    for(let chunk of chunks){
                        fileData.push(chunk.data.toString('base64'));
                    }

                    let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');
                    res.send({title: 'Image File', message: 'Image loaded from MongoDB GridFS', imgurl: finalFile});
                }) // toArray
        }) // toArray
    }) // connect
}) // get

module.exports = router;