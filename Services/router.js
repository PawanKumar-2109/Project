const express = require('express');
const route = express.Router();
const services = require('./render');
const controller = require('../Controllers/controller');

route.get('/',services.homepage);
route.post('/signup',services.signup);
route.post('/login',services.login);

route.post('/generate',services.generate);

route.get('/add',services.question_add);


route.post('/add',services.add);

route.get('/question',services.question);

route.get('/details',services.details);

route.post('/generate',services.generate);
route.get('/generate',services.get_generate);









route.get('/api/details',controller.details);

route.get('/api/question',controller.question);
route.post('/api/signup',controller.signup);
route.post('/api/login',controller.login);
route.post('/api/generate',controller.generate);
route.post('/api/add',controller.add);
route.get('/api/tags',controller.list_tags);



module.exports = route;