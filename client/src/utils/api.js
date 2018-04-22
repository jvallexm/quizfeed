import axios from "axios";

export default {

    findAll: ()=>{
        return axios.get("/api/quizzes");
    },

    postQuiz: ()=>{
        return axios.post("/api/quizzes")
    },

    getAllByUser: (id)=>{
        return axios.get("/api/quizzes/user/" + id);
    },

    getQuizById: (id)=>{
        return axios.get("/api/quizzes/" + id);
    },

    editQuiz: (id)=>{
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
    }

}