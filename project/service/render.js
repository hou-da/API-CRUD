const axios = require('axios');

exports.homeRoutes = (req, res) =>{
    axios.get('http://localhost:3000/api/job')
    .then((response)=>{
         res.render('home', { jobs : response.data });
    })
    .catch(err =>{
        res.status(500).send(err);
    })

}

exports.list_job = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/job')
        .then((response)=>{
             res.render('list-job', { jobs : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}
exports.add_job = (req, res) =>{
    res.render('add-job');
}

//exports.list_job =(req,res) =>{
    //res.render('list-job', {job:'New data'})
//}

exports.update_job = (req, res) =>{

    axios.get('http://localhost:3000/api/job', { params : { id : req.query.id }})
        .then(function(jobdata){
            console.log("U", jobdata.data)
            res.render("update_job" ,{job: jobdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
    
