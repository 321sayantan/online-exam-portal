import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyparser from "body-parser";
import { User } from "./config.js";
import bcrypt from "bcrypt";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var noofquestion = 1;
var question_attempt = 0;
var marks = 0;
var wrong = 0;
var temp = "";
var loggeduser = "";
const saltrounds = 10;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // console.log(__dirname);
    res.sendFile(__dirname + "/public/home.html");
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/public/signup.html")
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.get("/start_test", (req, res) => {

    res.render("start_test.ejs", {
        name: loggeduser.name.split(" ")[0].toUpperCase()
    });
});

app.get('/exam', (req, res) => {
    noofquestion = 1;
    question_attempt = 0;
    marks = 0;
    wrong = 0;
    temp = question[noofquestion - 1];
    res.render("exam.ejs", {
        paper: temp,
        score: marks,
        question_no: noofquestion
    });
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    const existinguser = await User.findOne({ $or: [{ name: data.name }, { email: data.email }] });
    if (existinguser) {
        res.send(`<script>alert("Username/email already taken"); window.location.href = "/signup"; </script>`);
    }
    else {
        //Password hashing
        bcrypt.hash(data.password, saltrounds, async (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                loggeduser = data;
                data.password = hash;
                const userdata = await User.insertMany(data);
                res.redirect('/start_test');
            }
        })
    }
});

app.post('/login', async (req, res) => {
    const username = req.body.name;
    const login_Password = req.body.password;

    try {
        loggeduser = await User.findOne({ name: username });
        if (loggeduser) {
            bcrypt.compare(login_Password, loggeduser.password, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result) {
                        res.redirect('/start_test');
                    }
                    else {
                        res.send(`<script>alert("Invalid Username or Password"); window.location.href = "/login"; </script>`);
                    }
                }
            })
        }
        else {
            res.send(`<script>alert("Invalid Username or Password"); window.location.href = "/login"; </script>`);
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.post('/next', (req, res) => {
    // console.log(req.body.option);
    if (req.body.option != undefined) {
        question_attempt += 1;
    }
    if (req.body.option === temp.ans) {
        marks++;
    } else {
        wrong += 1;
    }
    // res.redirect('/exam');
    if (noofquestion < 10) {
        temp = question[noofquestion];
        // console.log(temp);
        noofquestion++;
        res.render("exam.ejs", {
            paper: temp,
            score: marks,
            question_no: noofquestion
        });
    }
    else {
        var remark;
        if(marks > 8){ remark = "Excellent";}
        else if(marks > 6){ remark = "Good";}
        else if(marks > 4){ remark = "Fair";}
        else if(marks > 2){ remark = "Poor";}
        else if(marks >= 0){ remark = "Very Poor";}
        res.render("result1.ejs", {
            score: marks,
            Ques_attempt: question_attempt,
            wrong_ans: wrong,
            time: "20:20",
            remark: remark
        });
        noofquestion = 1;
        question_attempt = 0;
        marks = 0;
        wrong = 0;
    }
})

// app.get("/result1", (req, res)=>{
//     res.render("result1.ejs");
// })

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});

const question = [
    {
        "question": "What does HTML stand for?",
        "ans": "Hyper Text Markup Language",
        "opt1": "Hyper Text Preprocessor",
        "opt2": "Hyper Text Markup Language",
        "opt3": "Hyper Text Multiple Language",
        "opt4": "Hyper Tool Multi Language"
    },
    {
        "question": "What does CSS stand for?",
        "ans": "Cascading Style Sheet",
        "opt1": "Common Style Sheet",
        "opt2": "Colorful Style Sheet",
        "opt3": "Computer Style Sheet",
        "opt4": "Cascading Style Sheet"
    },
    {
        "question": "What does PHP stand for?",
        "ans": "Hypertext Preprocessor",
        "opt1": "Hypertext Preprocessor",
        "opt2": "Hypertext Programming",
        "opt3": "Hypertext Preprogramming",
        "opt4": "Hometext Preprocessor"
    },
    {
        "question": "What does SQL stand for?",
        "ans": "Structured Query Language",
        "opt1": "Stylish Question Language",
        "opt2": "Stylesheet Query Language",
        "opt3": "Statement Question Language",
        "opt4": "Structured Query Language"
    },
    {
        "question": "What does XML stand for?",
        "ans": "Extensible Markup Language",
        "opt1": "Extensible Markup Language",
        "opt2": "eXecutable Multiple Language",
        "opt3": "eXTra Multi-Program Language",
        "opt4": "dddeXamine Multiple Language"
    },
    {
        "question": "How many Bits make one Byte?",
        "ans": "8 bits",
        "opt1": "16 bits",
        "opt2": "32 bits",
        "opt3": "64 bits",
        "opt4": "8 bits"
    },
    {
        "question": "Google is a Browser or a Search Engine?",
        "ans": "Search Engine",
        "opt1": "Browser",
        "opt2": "Search Engine",
        "opt3": "Both Browser and Search Engine",
        "opt4": "Neither Browser nor Search Engine"
    },
    {
        "question": "What is the full form of VIRUS?",
        "ans": "Vital Information Rest Under Siege",
        "opt1": "Vital Information Rest Under System",
        "opt2": "Vital Information Rest Under Siege",
        "opt3": "Virtual Information Resources Under Siege",
        "opt4": "Vital Information Resources Under Siege"
    },
    {
        "question": "The process of transferring files from the Internet to your computer is called?",
        "ans": "Downloading",
        "opt1": "Uploading",
        "opt2": "Storing",
        "opt3": "Downloading",
        "opt4": "All of the above"
    },
    {
        "question": "1 Kilobyte is equal to how many bytes?",
        "ans": "1024 bytes",
        "opt1": "1024 bytes",
        "opt2": "512 bytes",
        "opt3": "256 bytes",
        "opt4": "128 bytes"
    },
    {
        "question": " An address given to a computer connected to a network is called?",
        "ans": "IP address",
        "opt1": "Local address",
        "opt2": "Localhost",
        "opt3": "Network address",
        "opt4": "IP address"
    },
    {
        "question": "A program that translates High-Level Language to a Machine Level Language is called?",
        "ans": "Compiler",
        "opt1": "Compiler",
        "opt2": "Interpreter",
        "opt3": "Assembler",
        "opt4": "Operating system"
    },
    {
        "question": "All mathematical and logical functions in the computer are done by?",
        "ans": "Arithmetic and Logical Unit",
        "opt1": "Central Processing Unit",
        "opt2": "Arithmetic and Logical Unit",
        "opt3": "Control Unit",
        "opt4": "Memory Unit"
    }
];