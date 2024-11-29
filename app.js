require('dotenv').config()
const express = require('express');
const MongoClient = require ('mongodb').MongoClient;
const app = express();

const url = process.env.MONGO_DB_URI
const dbName = 'test'
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(    .static('public'))
MongoClient.connect(url,(err, client)=>{
    if (err){
        console.error(err)
        return
    }
    console.log('Connected to MongoDB')
    const db = client.db(dbName)
    const collection = db.collection('projects')
    console.log(collection)
    app.get('/projects', (req, res) => {
        collection.find({}).toArray((err, projects) => {
          if (err) {
            console.error('Error fetching projects:', err);
            res.status(500).send('Error fetching projects');
            return;
          }
    
          res.render('projects', { projects: projects });
        });
    });
    app.listen(port, () => {
        console.log('Server listening on port 3000');
    });
})