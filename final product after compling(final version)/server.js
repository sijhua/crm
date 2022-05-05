const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer')
const path = require("path");
const {
    stringify
} = require("querystring");
var uri = 'mongodb://127.0.0.1:27017/db'
mongoose.connect(uri);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static("static"));

var UserSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    createAt: {
        default: new Date(),
        type: Date
    },
});
const User = mongoose.model('User', UserSchema, "user");
var TeamSchema = new mongoose.Schema({
    uid: String,
    thumb: String,
    name: String,
    desc: String,
    member: [],
    createAt: {
        default: new Date(),
        type: Date
    }
});
const Team = mongoose.model('Team', TeamSchema, "team");
var ContactSchema = new mongoose.Schema({
    uid: String,
    title: String,
    name: String,
    jobTitle: String,
    profilePhote: String,
    phoneNumbers: [{
        key: Number,
        value: String
    }],
    emails: [{
        key: Number,
        value: String
    }],
    addresses: [{
        key: Number,
        value: String
    }],
    company: String,
    websites: [{
        key: Number,
        value: String
    }],
    socialMediaProfiles: [{
        key: Number,
        value: String
    }],
    impDates: [{
        key: Number,
        value: String
    }],
    tags: String,
    createAt: {
        default: new Date(),
        type: Date
    }
});
const Contact = mongoose.model('Contact', ContactSchema, "contact");
var NotesSchema = new mongoose.Schema({
    uid: String,
    subject: String,
    comment: String,
    tid: String
});
const Notes = mongoose.model('Notes', NotesSchema, "notes");

var FavoritesSchema = new mongoose.Schema({
    uid: String,
    ids: Array
});
const Favorites = mongoose.model('Favorites', FavoritesSchema, "favorites");

var EventSchema = new mongoose.Schema({
    uid: String,
    subject: String,
    status: String,
    comment: String,
    value: String,
    location: String,
    meetingLink: String,
    taggedContact: String,
    endTime: Date,
    startTime: Date,
});
const Event = mongoose.model('Event', EventSchema, "event");
var TagsSchema = new mongoose.Schema({
    name: String
});
const Tags = mongoose.model('Tags', TagsSchema, "tags");
var TitlesSchema = new mongoose.Schema({
    name: String
});
const Titles = mongoose.model('Titles', TitlesSchema, "titles");
app.post("/api/sign", async (req, res) => {
    let body = req.body;
    let r = await User.find({
        email: body.email
    });
    if (r.length) {
        res.json({
            msg: "repeat email",
            code: 500
        });
        return
    }
    var user = new User(body);
    user.save(() => {
        res.json({
            msg: "ok",
            code: 200
        })
    });
});
app.post("/api/login", async (req, res) => {
    let body = req.body;
    if (body.email === "admin@root.com" && body.password == 123456) {
        res.json({
            msg: "ok",
            code: 200,
            manager: 1,
        })
        return;
    }
    let r = await User.find(body);
    if (r.length) {
        res.json({
            msg: "ok",
            code: 200,
            id: r[0]._id,
            email: r[0].email,
            password: r[0].password,
            firstName: r[0].firstName,
            lastName: r[0].lastName
        })
    } else {
        res.json({
            msg: "login failed",
            code: 500
        })
    }
});
app.put("/api/login/:id", async (req, res) => {
    let body = req.body;
    let id = req.params.id;
    if (body.newpassword) {
        var r = await User.updateOne({
            _id: id
        }, {
            password: body.newpassword
        });
    } else {
        var r = await User.updateOne({
            _id: id
        }, body);
    }
    if (r.modifiedCount) {
        res.json({
            msg: "ok",
            code: 200,
        })
    } else {
        res.json({
            msg: "err",
            code: 500
        })
    }
});
app.get("/api/team", async (req, res) => {

    var uid = req.query.uid;
    var r = await Team.find({
        uid
    });

    res.json({
        code: 200,
        msg: "ok",
        data: r
    })
});
app.post("/api/team", async (req, res) => {
    let body = req.body;
    var team = new Team(body);
    team.save(() => {
        res.json({
            msg: "ok",
            code: 200
        })
    });
});
app.get("/api/team/:id", async (req, res) => {
    let id = req.params.id;
    let r = await Team.find({
        _id: id
    });
    res.json({
        code: 200,
        msg: "ok",
        data: r
    })
});
app.delete("/api/team/:id", async (req, res) => {
    let id = req.params.id;
    let r = await Team.remove({
        _id: id
    });
    res.json({
        msg: "ok",
        code: 200
    });
});
app.put("/api/team/:id", async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    if (body.member) {
        body.member = JSON.parse(body.member);
    }
    let r = await Team.updateOne({
        _id: id
    }, body);
    res.json({
        msg: "ok",
        code: 200
    });
});
app.get("/api/user", async (req, res) => {
    let r = await User.find({});
    res.json({
        code: 200,
        msg: "ok",
        data: r
    })
});
app.delete("/api/user/:id", async (req, res) => {
    let id = req.params.id;
    await User.remove({
        _id: id
    });
    res.json({
        msg: "ok",
        code: 200
    });
});
app.put("/api/user/:id", async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let r = await User.updateOne({
        _id: id
    }, body);
    res.json({
        msg: "ok",
        code: 200
    });
});

app.get("/api/tags", async (req, res) => {
    let r = await Tags.find({});
    res.json({
        code: 200,
        msg: "ok",
        data: r
    })
});
app.delete("/api/tags/:id", async (req, res) => {
    let id = req.params.id;
    await Tags.remove({
        _id: id
    });
    res.json({
        msg: "ok",
        code: 200
    });
});
app.post("/api/tags", async (req, res) => {
    let body = req.body;
    var team = new Tags(body);
    team.save(() => {
        res.json({
            msg: "ok",
            code: 200
        })
    });
});
app.get("/api/titles", async (req, res) => {
    let r = await Titles.find({});
    res.json({
        code: 200,
        msg: "ok",
        data: r
    })
});
app.delete("/api/titles/:id", async (req, res) => {
    let id = req.params.id;
    await Titles.remove({
        _id: id
    });
    res.json({
        msg: "ok",
        code: 200
    });
});
app.post("/api/titles", async (req, res) => {
    let body = req.body;
    var team = new Titles(body);
    team.save(() => {
        res.json({
            msg: "ok",
            code: 200
        })
    });
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
const upload = multer({
    storage: storage
});
app.post("/api/upload", upload.single('file'), async (req, res) => {
    res.send("/uploads/" + req.file.filename);
});
app.get("/index", (req, res) => {
    res.sendFile(path.resolve("./static/index.html"));
});
app.post("/api/contact", async (req, res) => {
    let body = req.body;
    var team = new Contact(body);
    team.save(() => {
        res.json({
            msg: "ok",
            code: 200
        })
    });
});
app.get("/api/contact", async (req, res) => {
    if (req.query.ids) {
        let arr = JSON.parse(req.query.ids);
        var r = await Contact.find({
            _id: {
                $in: arr
            }
        });
    } else {
        var where = req.query;
        if (where.name) {
            where.name = {
                $regex: new RegExp(req.query.name, "i")
            }
        }
        if (where.company) {
            where.company = {
                $regex: new RegExp(req.query.company, "i")
            }
        }
        if (where.tags) {
            where.tags = {
                $regex: new RegExp(req.query.tags, "i")
            }
        }
        var r = await Contact.find(where);
    }
    res.json({
        code: 200,
        msg: "ok",
        data: r
    })
});
app.get("/api/contact/:id", async (req, res) => {
    let id = req.params.id;
    let r = await Contact.find({
        _id: id
    });
    res.json({
        code: 200,
        msg: "ok",
        data: r
    })
});
app.delete("/api/contact/:id", async (req, res) => {
    let id = req.params.id;
    let r = await Contact.remove({
        _id: id
    });
    res.json({
        msg: "ok",
        code: 200
    });
});
app.get("/api/notes", async (req, res) => {
    var r = await Notes.find(req.query);
    res.json({
        code: 200,
        msg: "ok",
        data: r
    })
});
app.post("/api/notes", async (req, res) => {
    let body = req.body;
    var team = new Notes(body);
    team.save(() => {
        res.json({
            msg: "ok",
            code: 200
        })
    });
});
app.delete("/api/notes/:id", async (req, res) => {
    let id = req.params.id;
    let r = await Notes.remove({
        _id: id
    });
    res.json({
        msg: "ok",
        code: 200
    });
});
app.post("/api/favorites", async (req, res) => {
    let body = req.body;
    console.log(body);
    var r = await Favorites.find({
        uid: body.uid
    });
    if (r) {
        await Favorites.deleteOne({
            uid: body.uid
        })
    }
    var team = new Favorites(body);
    team.save(() => {
        res.json({
            msg: "ok",
            code: 200
        })
    });
});
app.get("/api/favorites", async (req, res) => {
    let r = await Favorites.find({
        uid: req.query.id
    });
    res.json({
        msg: "ok",
        code: 200,
        data: r
    })
});
app.put("/api/favorites/:id", async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    await Favorites.updateOne({
        _id: id
    }, {
        ids: JSON.parse(body.ids)
    });
    res.json({
        msg: "ok",
        code: 200
    });
});
app.get("/api/event", async (req, res) => {
    var uid = req.query.uid;
    var date = req.query.date; 
    if (date) {
        var start = new Date(date);
        var end = new Date(date);
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
        var r = await Event.find({
            uid,
            startTime: {
                $gte: start
            },
            endTime: {
                $lte: end
            }
        });
    } else {
        var r = await Event.find({
            uid,
        });
    }
    res.json({
        code: 200,
        msg: "ok",
        data: r.slice(-4)
    })
});
app.post("/api/event", async (req, res) => {
    let body = req.body;
    var team = new Event(body);
    team.save(() => {
        res.json({
            msg: "ok",
            code: 200
        })
    });
});
app.delete("/api/event/:id", async (req, res) => {
    let id = req.params.id;
    let r = await Event.remove({
        _id: id
    });
    res.json({
        msg: "ok",
        code: 200
    });
});
app.listen(8888);