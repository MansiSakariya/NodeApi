module.exports = (app) => {
    const App = require("../controller/app.controller");
    const Users = require("../model/app.model");

    app.post("/data", async (req, res) => {
        try {
            const user = new Users(req.body);
            if(req.body.fname!==""){res.save};
            const save = await user.save();
            res.send(save);
        }catch(e){
            console.log("hello",e)
        }
    });
    app.get("/get-all",App.findAll);

    app.get("/user/:userId",App.findOne);

    app.put("/user/:userId",App.update);

    app.delete("/user/:userId",App.delete);
};