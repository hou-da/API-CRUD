const {response} = require('express')
const request = require('supertest');
//const expect = require('matchers')
let server

const User = require("../models/user.model")



describe('user', () => {
    beforeEach(() => {
        server = require("../app")
    })
    afterEach(() => {
        server.close()
        User.collection.deleteMany()
    });

    describe("Get /signup", () => {
        it("should return status 200 if input is Empty ", async() => {
        const response = await request(server)
            .get('/signup')
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(200);
        })
    })

  describe("Post /signup", () => {
    const validUser = {
        UserName : "joud",
        email : "joud@gmail.com",
        Password : "123456"
    }

    //Debug    
    it("should return status 401 if input is Empty ", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"", email:"", Password:""})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
            
    })

    it("should return status 401 if input is Empty ", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"", email: "joud@gmail.com", Password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })

    it("should return status 401 if input is Empty ", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"joud", email: "", Password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401)
           // expect(response.body).toMatchObject(})
    })
    it("should return status 401 if input is Empty ", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"joud", email: "joud@gmail.com", Password: ""})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })
    it("should return status 401 if Invalid name entered", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"jou/", email: "joud@gmail.com", Password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
            
    })

    it("should return status 401 if Invalid name entered", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"jo u", email: "joud@gmail.com", Password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })
    it("should return status 401 if Invalid name entered", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"jou5", email: "joud@gmail.com", Password: "joud"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })
    it("should return status 401 if Invalid email entered", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName: "joud", email: "jou/jon@gmail.com", Password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })
    it("should return status 401 if Invalid email entered", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"joud", email: "jou jon@gmail.com", Password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })
   
    it("should return status 401 if Invalid email entered", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"joud", email: "Jou$@gmail.com", Password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })

    it("should return status 401 if the Password is too short", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"joud", email: "joud@gmail.com", Password: "123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401)
    })

    it("should return status 401 if the email alredy exixtes", async() => {
        
        await request(server)
            .post('/signup')
            .send({validUser})
            .set({Accpet: "Application/json"})
    
       const response = await request(server)
            .post('/signup')
            .send({validUser})
            .set({Accpet: "Application/json"})
            
            expect(response.status).toBe(401)
        
    })
    it("should return status 200 if sign UP successful", async() => {
        const response = await request(server)
            .post('/signup')
            .send(validUser)
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(200)
            
    })
    it("should return status 200 if sign UP successful", async() => {
        const response = await request(server)
            .post('/signup')
            .send({UserName:"doudou", email: "dou_dou@gmail.com", Password:"doudoud"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(200)
    })


})

describe("Get /login", () => {
    it("should return status 201  ", async() => {
    const response = await request(server)
        .get('/login')
        .set({Accpet: "Application/json"})
        expect(response.status).toBe(200);
    })
})

describe("Post /login", () => {
    const validUser = {
        UserName:"joud",
        email : "joud@gmail.com",
        Password : "123456"
    }
    //Debug
    it("should return status 400 if input is empty", async() => {
       
        await request(server)
        .post('/signup')
        .send(validUser)
        .set({Accpet: "Application/json"})        
        const response = await request(server)
        .post('/login')
        .send({email:"", Password:""})
        .set({ Accpet: "Application/json"})
        expect(response.status).toBe(400);
    })
    it("should return status 400 with Invalid email message if the user is not found ", async() => {
        await request(server)
            .post('/signup')
            .send(validUser)
            .set({Accpet: "Application/json"})
       const response = await request(server)
            .post("/login")
            .send({email:" jjj@exemple.com", Password:validUser.Password})
            .set({Accpet: "Application/json"})
           // console.log(response)
            expect(response.status).toBe(400)
            expect(response.body).toMatchObject({message :"User not found"})

             
     });
     it("should return status 400 with if the password is not correct", async() => {
         await request(server)
              .post('/signup')
              .send(validUser)
              .set({Accpet: "Application/json"})
         const response = await request(server)
              .post("/login")
              .send({email: "joud@gmail.com", Password:"142365"})
              expect(response.status).toBe(400);  
              
      });
      it("should return status 302 if email and password are correct", async() =>{
         await request(server)
              .post('/signup')
              .send(validUser)
              .set({Accpet: "Application/json"})
 
         const response = await request(server)
              .post("/login")
              .send({email:"joud@gmail.com", Password:"123456"})
              //console.log(response)
              
              expect(response.status).toBe(302);
              
      })
   })

})
