const router = require('express').Router();
const bodyParser = require("body-parser");

const userController = require('../controllers/userController');
const jobController = require('../controllers/jobController')
const services = require('../service/render')


router.get('/signup', userController.getSignup)
router.post('/signup', userController.postSignup)

router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin);


// Job router
router.get('/', services.homeRoutes);
router.get('/list-job', services.list_job)
router.get('/add-job', services.add_job)
router.get('/update-job', services.update_job)
router.post('/update-job/:id', jobController.update)
router.get('/jobs', jobController.getJob)
router.get('/delete/:id',jobController.delete)

//API


router.post('/api/job', jobController.create);
router.get('api/job/:id', jobController.find)
router.get('/api/job', jobController.find);
router.put('/api/job/:id', jobController.update);
router.delete('/api/job/:id', jobController.delete);

module.exports = router