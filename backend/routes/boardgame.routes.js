module.exports = app => {
    const boardgame = require("../controllers/boardgame.controller.js");
    var upload = require('../multer/upload');

    var router = require("express").Router();

    //Create a new boardgame
    router.post("/", upload.single('file'), boardgame.create);
    router.post("/", boardgame.create);
    
    //Retrieve all boardgames
    router.get("/", boardgame.findAll);

    //Retrieve all type = board boardgames
    router.get("/board", boardgame.findAllBoards);

    //Retrieve a single boardgame woth id
    router.get("/:id", boardgame.findOne);

    //Update a boardgame with id
    router.put("/:id", boardgame.update);

    //Delete a boardgame with id
    router.delete("/:id", boardgame.delete);

    //Delete all boardgames
    router.delete("/", boardgame.deleteAll);

    app.use('/api/boardgame', router);
};