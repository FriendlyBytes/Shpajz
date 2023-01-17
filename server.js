const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3001';

const app = express();


/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Routes
 */

app.get('/', (request, response) => {
    response.status(200).send("Mozete otici na /user/:id")
})

const userRouter = require('./routes/user');
app.use('/user',userRouter);

const namirnicaRouter = require('./routes/namirnica');
app.use('/namirnica',namirnicaRouter); 

const DijetaRouter = require('./routes/Dijeta');
app.use('/Dijeta',DijetaRouter); 

const ReceptRouter = require('./routes/Recept');
app.use('/Recept',ReceptRouter);

const ListaZaKupovinuRouter = require('./routes/ListaZaKupovinu');
app.use('/ListaZaKupovinu',ListaZaKupovinuRouter);

const NaListiRouter = require('./routes/NaListi');
app.use('/NaListi',NaListiRouter);

const UkusNamirnicaRouter = require('./routes/UkusNamirnica');
app.use('/ListaZaKupovinu',UkusNamirnicaRouter);



const UkusRouter = require('./routes/Ukus');
app.use('/Ukus',UkusRouter);

/**Start listening */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})
