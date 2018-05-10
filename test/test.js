const chai    = require("chai");
const expect  = require("chai").expect;
const app     = require("../server");
chai.use(require("chai-http"));

const quizController = require("../controllers/quizController");
const userController = require("../controllers/userController");

          
// testing if quizController finds all quizzes 
describe("quizRoutes", function() {
    it("should display all quizzes", function(done) {
        chai.request(app).get("/api/quizzes").then(function(res) {
            //console.log(res.body);
            expect(res.body).to.be.an("array");  
            done(); 
        })  .catch(function(error){
            done(error);
        });
    });
    
// testing if quizController finds one quiz by id
    it("should get one quiz by id", function(done) {
        chai.request(app).get("/api/quizzes/1525354085646").then(function(res) {
            //console.log(res.body);
            expect(res.body).to.be.an("object");  
            done(); 
        })  .catch(function(error){
            done(error);
        });
    });

// testing if quizController finds all quizzes by a single user
    it("should find all quizzes by a single user", function(done) {
        chai.request(app).get("/api/users/101050207951913667731").then(function(res) {
            expect(res.body).to.be.an("array");
            done();
        })  .catch(function(error) {
            done(error);
        })
    })    
}); 

// testing if userController finds one user by id
describe("userRoutes", function() {
    it("should display a single user by id", function(done) {
        chai.request(app).get("/api/users/104210337055222011322").then(function(res) {
            //console.log(res.body);
            expect(res.body).to.be.an("object");  
            done();
        })  .catch(function(error){
            done(error);
        });        
    });
});
