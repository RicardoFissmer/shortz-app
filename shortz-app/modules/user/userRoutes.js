var express = require("express");
var router = express.Router();
const userController = require("./userController");
const authMiddleware = require("../../middlewares/auth");
const upload = require("../../middlewares/multer"); // [MODIFICAR] De multer para profileMulter
const videoController = require("../video/videoController");

// Rota para exibir o formulário de cadastro
router.get("/register", (req, res) => {
    res.render("pages/register", { title: "Criar Conta" });
});

// Rota que processa o formulário de cadastro
router.post("/register", userController.register);

// Rota para exibir o formulário de login
router.get("/login", (req, res) => {
    res.render("pages/login", { title: "Entrar" });
});

// Rota para processar o formulário de login
router.post("/login", userController.login);

// Rota para processar o logout
router.get("/logout", userController.logout);

// Rota para exibir o feed de vídeos (protegida por autenticação)
router.get("/feed", authMiddleware, async (req, res) => {
    try {
        // Busca todos os vídeos, incluindo as informações do usuário que os publicou
        const videos = await videoController.getAllVideos();
        res.render("pages/feed", { title: "Feed | Shortz-App", videos });
    } catch (error) {
        console.error("Erro ao carregar o feed:", error);
        req.flash("error", "Erro ao carregar o feed de vídeos.");
        res.redirect("/login"); // Redireciona para login em caso de erro
    }
});

// Rota para exibir o perfil do usuário (protegida por autenticação)
router.get("/profile/edit", authMiddleware, async (req, res) => {
    // O objeto 'user' já está disponível via res.locals.user
    res.render("pages/edit-profile", { title: "Editar Perfil | Shortz-App" });
});

// Rota de atualização (Protegida + Upload de 1 arquivo chamado 'profilePicture')
router.post("/profile/edit", authMiddleware, upload.single("profilePicture"), userController.updateProfile);

// Rota de atualização (Protegida + Upload de 1 arquivo chamado \'profilePicture\')
router.post("/profile/edit", authMiddleware, upload.single("profilePicture"), userController.updateProfile);

// [ADICIONAR] Rota para exibir o perfil público de um usuário
router.get("/profile/:username", userController.renderPublicProfile);

module.exports = router;