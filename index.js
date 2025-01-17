const express = require('express');
const path = require('path');
const debug = require('debug')('app:main');
const cookieParser = require('cookie-parser');

const { Config } = require('./config/index');

const app = express();

const PORT = Config.port;

const checkTokenMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    next();
};

const tokenMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        return res.redirect('/inicio');
    }
    next();
};

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.get('/', checkTokenMiddleware, (req, res) => {
    res.redirect('/login')
});

app.get('/inicio', checkTokenMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/page', 'inicio.html'));
});

app.get('/agregar', checkTokenMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/page', 'agregar.html'));
});


app.get('/login', tokenMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/page', 'login.html'));
});

app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

app.listen(PORT, () => {
    console.log(`Servidor web iniciado en http://localhost:${PORT}`);
});
