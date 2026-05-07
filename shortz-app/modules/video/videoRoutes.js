var express = require("express");
var router = express.Router();
const videoController = require("./videoController");
const authMiddleware = require("../../middlewares/auth");
const uploadVideo = require("../../middlewares/videoMulter"); // Importa o Multer para vídeos

// Rota para exibir o formulário de upload de vídeo (protegida por autenticação)
router.get("/upload", authMiddleware, (req, res) => {
    res.render("pages/upload", { title: "Upload de Vídeo | Shortz-App" });
});

//  Rota para streaming de vídeo
router.get("/video/:id/stream", videoController.streamVideo);

// [ADICIONAR] Rota para exibir a página de reprodução de vídeo
router.get("/video/:id", videoController.renderVideoPage);

// Rota para processar o upload de vídeo (protegida por autenticação)
router.post("/upload", authMiddleware, uploadVideo.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), videoController.uploadVideo);

module.exports = router;