import axios from "axios";

export default {

    findAll: ()=>{
        return axios.get("/api/quizzes");
    },

    postQuiz: (quiz)=>{
        return axios.post("/api/quizzes/",quiz)
    },

    getAllByUser: (id)=>{
        return axios.get("/api/quizzes/user/" + id);
    },

    getQuizById: (id)=>{
        return axios.get("/api/quizzes/" + id);
    },

    editQuiz: (id,quiz)=>{
        return axios.post("/api/quizzes/" + id);
    },

    pushComment: (id)=>{
        return axios.post("/api/quizzes/comment/" + id);
    },

    pushStar: (id)=>{
        return axios.post("/api/quizzes/star/" + id);
    },

    pushResult: (id)=>{
        return axios.post("/api/quizzes/result/" +id);
    },

    deleteQuiz: (id)=>{
        return axios.delte("/api/quizzes/" + id);
    },

    saveAsDraft: (id,quiz)=>{
        return axios.post("/api/quizzes/edit/" +id,quiz);
    },
    
    getImages: (q)=>{
        return axios.get("/api/images/search/" + q);
    }

}