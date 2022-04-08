import express from 'express';
import multer from 'multer';
import router from './routes/index.js';

export const app = express();

app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set('views', './views');
app.set('view engine', 'pug');

app.use('/api', router);

app.get('/', (req, res) => {
    res.render('form', {});
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${server.address().port}`);
});
server.on('error', error => console.log(`error running server: ${error}`));