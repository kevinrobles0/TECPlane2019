const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const methodOverride = require("method-override");
const session = require('express-session');

//iniciadores
const DB = require('./config/db');
DB();


//configuracion
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname :'.hbs'
}));
app.set('view engine', '.hbs');

//midlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))//utilizar otros metodos no solo put and get
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}));

//variables globales
module.exports.correoUsuario = "";

//routes
app.use(require('./routes/index'));

app.use(require('./routes/cliente'));
app.use(require('./routes/boletos'));
app.use(require('./routes/gestionUsuarios'));

app.use(require('./routes/administrador'));
app.use(require('./routes/administrarAeropuerto'));
app.use(require('./routes/administrarAerolinea'));
app.use(require('./routes/administrarFuncionario'));
app.use(require('./routes/administrarVuelo'));
app.use(require('./routes/administradorReportes'));

app.use(require('./routes/funcionarioCheck-in'));
app.use(require('./routes/funcionarioAbordaje'));
app.use(require('./routes/funcionarioConsultar'));
app.use(require('./routes/funcionarioReportes'));


//static files
app.use(express.static(path.join(__dirname,'public')));

//server is listening
app.listen(app.get('port'),()=> {
    console.log("servidor en ",app.get("port"))
});