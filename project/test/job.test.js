const {response} = require('express')
const request = require('supertest');
//const expect = require('matchers')
const Job = require("../models/job.model")

let server

    const validJob = {
       
        Title : "Ingenieur Informatique",
        Description : "Bac+5 avec expérience 2 ans dans le domnaine",
        location : "Tunis",
        Salary: "1200d",
        CompanyName:"MLML"
    }
    const validJob1 ={ 
        
        Title : "Developpeur electronique",
        Description : "Bac+5 avec expérience 3ans dans le domnaine",
        location : "Sousse-Tunisie",
        Salary: "1500d",
        CompanyName:"MdOs"
    }


const updateJobInfo = { id:"1", Title: "Developpeur Informatique" }

describe('job', () => {
    beforeEach(() => {
        server = require("../app")
    })
    afterEach(() => {
        server.close()
        Job.collection.deleteMany()
    });
   
   

    describe("Get /add-job", () => {
        it("should return status 200", async() => {
        const response = await request(server)
            .get('/add-job')
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(200);
        })
    })
    describe(" Create New job, Post /api/job", () => {
        
        //Debug    
        it("should return status 400 if input is Empty ", async() => {
            const reponse = await request(server)
                .post('/api/job')
                .send({Title:"", Description:"", location:"", Salary:"", CompanyName:""})
                .set({Accpet: "Application/json"})
                expect(reponse.status).toBe(400);
               
                
        })
        it("should return status 400 if input is Empty ", async() => {
            const reponse = await request(server)
                .post('/api/job')
                .send({Title:"", Description:validJob.Description, location:validJob.location, Salary:validJob.Salary, CompanyName:validJob.CompanyName})
                .set({Accpet: "Application/json"})
                expect(reponse.status).toBe(400);
                
                
        })
        it("should return status 400 if input is Empty ", async() => {
            const reponse = await request(server)
                .post('/api/job')
                .send({Title:validJob.Title, Description:"", location:validJob.location, Salary:validJob.Salary, CompanyName:validJob.CompanyName})
                .set({Accpet: "Application/json"})
                expect(reponse.status).toBe(400);
                
                
        })
        it("should return status 400 if input is Empty ", async() => {
            const reponse = await request(server)
                .post('/api/job')
                .send({Title:validJob.Title, Description:validJob.Description, location:"", Salary:validJob.Salary, CompanyName:validJob.CompanyName})
                .set({Accpet: "Application/json"})
                expect(reponse.status).toBe(400);
                
                
        })
        it("should return status 400 if input is Empty ", async() => {
            const reponse = await request(server)
                .post('/api/job')
                .send({Title: validJob.Title, Description: validJob.Description, location: validJob.location, Salary:validJob.Salary, CompanyName:""})
                .set({Accpet: "Application/json"})
                expect(reponse.status).toBe(400);
                
                
        })
        it("should return status 400 if input is Empty ", async() => {
            const reponse = await request(server)
                .post('/api/job')
                .send({Title:validJob.Title, Description:validJob.Description, location:"", Salary:validJob.Salary, CompanyName:validJob.CompanyName})
                .set({Accpet: "Application/json"})
                expect(reponse.status).toBe(400);
                
                
        })
        it("should return status 302 if the job is successfully created ", async() => {
            const reponse = await request(server)
                .post('/api/job')
                .send({Title:validJob.Title, Description:validJob.Description, location:validJob.location, Salary:"", CompanyName:validJob.CompanyName})
                .set({Accpet: "Application/json"})
               
                expect(reponse.status).toBe(302)
                //id = reponse.        
        })
        it("should return status 302 if the job is successfully created", async() => {
            const reponse = await request(server)
                .post('/api/job')
                .send(validJob)
                .set({Accpet: "Application/json"})
                expect(reponse.status).toBe(302)  
                     
        })  
    })

    describe("GET : Fin All job  /api/job", () => {

        it("should return status 200 if return All job", async() => {
            await request(server)
                .post('/api/job')
                .send(validJob)
                .set({Accpet: "Application/json"})
                
            const response = await request(server)
                .get('/api/job')
                .set({Accpet: "Application/json"})
                
                expect(response.status).toBe(200);
            })
        
    })
           
    describe("GET : Find job by id /api/job/id", () => {

        it("should return status 200 if there exists JOB with id", async() => {
            await request(server)
                .post('/api/job')
                .send(validJob)
                .set({Accpet: "Application/json"})
            await request(server)
                .post('/api/job')
                .send(validJob1)
                .set({Accpet: "Application/json"})

            const id = (await request(server).get('/api/job')).body[0]._id
            //console.log(id) b

            const  response = await request(server)
                .get('/api/job?id='+id)
                .set({Accpet: "Application/json"})
                //console.log(response.body)
                expect(response.status).toBe(200)
            })  

        it("should return status 404 if can not found job with id", async()=>{

                const id="64d8983b36694ebbe33dd95d"
    
                const  response = await request(server)
                    .get('/api/job?id='+id)
                    .set({Accpet: "Application/json"})
                    //console.log(response.body)
                    expect(response.status).toBe(404)        
                
        }) 

         
    })


    describe("Update Job", () => {

        const validJob = {
       
            Title : "Ingenieur Informatique",
            Description : "Bac+5 avec expérience 2 ans dans le domnaine",
            location : "Tunis",
            Salary: "1200d",
            CompanyName:"MLML"
        }
        it ('should return status 404 if data to update is empty', async () => {
            await request(server)
            .post('/api/job')
            .send(validJob)
            .set({Accpet: "Application/json"})
    
            const id = (await request(server).get('/api/job')).body[0]._id
           // console.log(id)
            //console.log((await request(server).get('/api/job')).body)
            const response = await request(server)
            .put('/api/job/:id',+id)
            
            .send({Title:"",
            Description : "",
            location : "",
            Salary: "",
            CompanyName:""})
            .set({Accpet: "Application/json"})
            
            expect(response.status).toBe(400)
            expect(response.body).toMatchObject({message :"Content can not be emtpy!"})

        })
        it ('should return status 404 if data to update is empty', async () => {
            await request(server)
            .post('/api/job')
            .send(validJob)
            .set({Accpet: "Application/json"})
    
            const id = (await request(server).get('/api/job')).body[0]._id
           // console.log(id)
            //console.log((await request(server).get('/api/job')).body)
            const response = await request(server)
            .put('/api/job/:id',+id)
            
            .send({Title:"technicien",
            Description : "",
            location : "sousse",
            Salary: "1200",
            CompanyName:"MTM"})
            .set({Accpet: "Application/json"})
            //console.log("adc  ", response.body)
            expect(response.status).toBe(400)
            expect(response.body).toMatchObject({message :"Content can not be emtpy!"})

        })
        it ('should return status 404 if data to update is empty', async () => {
            await request(server)
            .post('/api/job')
            .send(validJob)
            .set({Accpet: "Application/json"})
    
            const id = (await request(server).get('/api/job')).body[0]._id
           // console.log(id)
            //console.log((await request(server).get('/api/job')).body)
            const response = await request(server)
            .put('/api/job/:id',+id)
            
            .send({Title:"technicien",
            Description : "bac+3",
            location : "",
            Salary: "1200",
            CompanyName:"MTM"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(400)
            expect(response.body).toMatchObject({message :"Content can not be emtpy!"})
            

        })
        it ('should return status 404 if data to update is empty', async () => {
            await request(server)
            .post('/api/job')
            .send(validJob)
            .set({Accpet: "Application/json"})
    
            const id = (await request(server).get('/api/job')).body[0]._id
           // console.log(id)
            //console.log((await request(server).get('/api/job')).body)
            const response = await request(server)
            .put('/api/job/:id',+id)

            .send({Title:"technicien",
            Description : "bac+3",
            location : "sousse",
            Salary : "1200",
            CompanyName:""})    

            .set({Accpet: "Application/json"})
            expect(response.status).toBe(400)
            expect(response.body).toMatchObject({message :"Content can not be emtpy!"})


        })

        it("should return status 404 if the job is not found", async()=>{
            await request(server)
            .post('/api/job')
            .send(validJob)
            .set({Accpet: "Application/json"})

            const id="64d8983b36694ebbe33dd95d"

            const  response = await request(server)
            .put(`/api/job/${id}`)
                .send({Title:"technicien",
            Description : "bac+3",
            location : "sousse",
            Salary : "1200",
            CompanyName :"MPOM"})
                .set({Accpet: "Application/json"})
                //console.log(response.body)
                expect(response.status).toBe(404)
                //expect(response.body).toMatchObject({message :"`Cannot Update job with ${id}. Maybe job not found!"})

        })

        it ('it should return status 500 if exist there is an Error Update job information"', async () => {
            await request(server)
            .post('/api/job')
            .send(validJob)
            .set({Accpet: "Application/json"})
    
            const id = (await request(server).get('/api/job')).body[0]._id
           // console.log(id)
            //console.log((await request(server).get('/api/job')).body)
            const response = await request(server)
            .put('/api/job/:id',+id)
            
            .send(Title="technicien",
            Description = "bac+3",
            location = "sousse",
            Salary = "1200",
            CompanyName ="MPOM")
            .set({Accpet: "Application/json"})
            //console.log("adc  ", response.body)
            expect(response.status).toBe(500)
            

        })
       

         
    it ('itt should return status 302 if the job successfully updates', async () => {
        await request(server)
            .post('/api/job')
            .send(validJob)
            .set({Accpet: "Application/json"})
    
        const id = (await request(server).get('/api/job')).body[0]._id
           //console.log(id)
          //console.log((await request(server).get('/api/job')).body)
        const response = await request(server)
            .put(`/api/job/${id}`)
            
            .send({Title:"technicien",
            Description : "bac",
            location : "sousse",
            Salary: "1200",
            CompanyName:"MTM"})
            .set({Accpet: "Application/json"})
           
            expect(response.status).toBe(302)
        })
    })

    describe("DELETE /api/job/:id", () => { 

        it("should  return status 302 if the job is deleted successfully", async () => {

            await request(server)
            .post('/api/job')
            .send(validJob)
            .set({Accpet: "Application/json"})

            await request(server)
            const id = (await request(server).get('/api/job')).body[0]._id
            console.log(id) 
            const  response = await request(server)
                .delete(`/api/job/${id}`)
                .set({Accpet: "Application/json"})
                //console.log(response.body)
                expect(response.status).toBe(302)
                
        })
        
        it("should return status 404 if can not found job with id", async()=>{

            const id="64d8983b36694ebbe33dd95d"

            const  response = await request(server)
                .delete(`/api/job/${id}`)
                .set({Accpet: "Application/json"})
                //console.log(response.body)
                expect(response.status).toBe(404)
                expect(response.body).toMatchObject({message :"Cannot Delete with id Maybe id is not found"})

        })  
        
    })
    
})