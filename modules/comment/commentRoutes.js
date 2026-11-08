const express = require("express");
const router = express.Router();
const commentController = require("./commentController");
const { commentValidator } = require("./commentValidator"); 
const { isAuthenticated } = require("../../middlewares/auth");
const asyncHandler = require("../../middlewares/asyncHandler"); 


// Rota para adicionar um novo comentário a um vídeo
router.post("/video/:videoId/comment", isAuthenticated, commentValidator, asyncHandler(commentController.addComment));

// Rota para buscar todos os comentários de um vídeo
router.get("/video/:videoId/comments", asyncHandler(commentController.getComments));



module.exports = router;