const
    App = require("../model/app.model");

//Retrieve all messages from the database.

exports.findAll = (req, res) => {
    App.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                user:
                    err.user || "some error occured while retrieving message.",
            });
        });
};

// Find a single message with a userId
exports.findOne = (req, res) => {
    App.findById(req.params.userId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    user: "User not found with id " + req.params.userId,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    user: "User not found with id " + req.params.userId,
                });
            }
            return res.status(500).send({
                user: "Error retrieving message with id " + req.params.userId,
            });
        });
};

// Update a message identified by the userId in the request
exports.update = (req, res) => {
    App.findByIdAndUpdate(
        req.params.userId,
        {
            fname: req.body.fname,
            date: req.body.date,
            email: req.body.email,
            phone: req.body.phone,
            school: req.body.school,
            grade: req.body.grade,
        },
        { new: true }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    user: "Message not found with id " + req.params.userId,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    user: "User not found with id " + req.params.userId,
                });
            }
            return res.status(500).send({
                user: "Error updating message with id " + req.params.userId,
            });
        });
};

// Delete a message with the specified userId in the request
exports.delete = (req, res) => {
    App.findByIdAndRemove(req.params.userId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    user: "Message not found with id " + req.params.userId,
                });
            }
            res.send({ user: "User deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    user: "User not found with id " + req.params.userId,
                });
            }
            return res.status(500).send({
                user: "Could not delete message with id " + req.params.userId,
            });
        });
};