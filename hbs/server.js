import express from 'express';
import router from './routes/index.js';
import {engine} from 'express-handlebars'

export const app = express();

app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "./views",    
}))

app.set('view engine', 'hbs');
app.set('views','./views')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api',router)

app.get('/',(req, res)=>{
    res.render("form")
})


const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${server.address().port}`);
});
server.on('error', error => console.log(`error running server: ${error}`));