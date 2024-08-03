const express = require('express');
const path  = require('path');

const app = express();
const port = 20000;

const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.status(403).send('Sorry, the site is only available during working hours.');
    }
};


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(checkWorkingHours);


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});