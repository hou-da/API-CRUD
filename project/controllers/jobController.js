
const mongoose = require('mongoose')
const Job = require("../models/job.model");


exports.getJob = (req, res, next) =>{
    res.render('add-job');
};

exports.create = async (req,res)=>{
    let {Title, Description, location, Salary, CompanyName}= req.body
    
    // validate request
    if(Title=="" || Description =="" || location=="" || CompanyName==""){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }else {
// new user
const job = new Job({
    Title : req.body.Title,
    Description : req.body.Description,
    location: req.body.location,
    Salary : req.body.Salary,
    CompanyName : req.body.CompanyName
})
// save user in the database
    await job.save()
    .then(data => {
        //res.send(data)
        //console.log(data.Title)
        res.redirect('/list-job' );

    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });

}
    }

 // Find job by Id // Find All job   

exports.find = (req, res)=>{
    
    if(req.query.id){
        const id = req.query.id
        Job.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found job with id "+ id})
                }else{
                    //console.log("TT",data)
                    res.send(data)
                    //res.render('jobInfo')
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving job with id " + id})
            })

    }else{
        Job.find()
            .then(job => {
                
                res.send(job)  
                //res.redirect('/list-job')    
                   
             })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving job information" })
            })
        }   
    }


// Update job by id

exports.update = (req, res)=>{
    let {Title, Description, location, Salary, CompanyName}= req.body
    if(Title=="" || Description =="" || location=="" || CompanyName==""){
        return res.status(400).send({ message : "Content can not be emtpy!"})
       
   // if(req.body==""){
        //return res
           // .status(400)
           // .send({ message : "Data to update can not be empty"})
        }
    
    //const id = req.params.id;
    const id= new mongoose.Types.ObjectId( req.params.id);
    Job.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                return res.status(404).send({ message : `Cannot Update job with ${id}. Maybe job not found!`})
            }else{
                return res.status(200).send({ message : 'Update Job!'})
                //console.log(data)
                //res.redirect('/list-job')
            }
        })
        .catch(err =>{
               res.status(500).send({ err,
                   message : "Error Update job information"})
                
        })
}

// Delete a user with specified user id in the request
exports.delete = async (req, res)=>{
    try {
    const delete_job = await Job.findByIdAndDelete(req.params.id)
            if(!delete_job)
               return  res.status(404).send({ message : `Cannot Delete with id Maybe id is not found`})
            
            //res.redirect('/list-job')
            res.status(200).send({message : "Job deleted"})
    }catch { err =>{
        return  res.status(500).send({ err, message : `Erro`})
  
    }}
}

