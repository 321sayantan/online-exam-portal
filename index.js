import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyparser from "body-parser"

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var noofquestion=0;
var marks = 0;
var temp="";

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

app.get('/exam', (req, res) => {
    if (noofquestion < 5) {
        temp = question[Math.floor(Math.random() * question.length)];
        // console.log(temp);
        noofquestion++;
        res.render("exam.ejs", {
            paper: temp,
        });
    }
    else {
        noofquestion=0;
        res.render("result.ejs",{
            marks : marks
        });
        marks=0;
    }
});

app.post("/signup", (req, res) => {
    // console.log(req.body);
    // alert("signup successful");
    // res.send('<script>alert("Hello")</script>')
    res.sendFile(__dirname + "/public/start_test.html");
});

app.post('/login', (req, res) => {
    res.sendFile(__dirname + "/public/start_test.html")
});

app.post('/next', (req,res)=>{
    // console.log(req.body.ans);
    // console.log(temp.ans);
    if(req.body.ans == temp.ans)
    {
        marks++;
        // console.log("+1 marks");
    }
    res.redirect('/exam');
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});

const question = [
    {
        "question": ";alskdjflsakdjfl;asjf",
        "ans": "aaa",
        "opt1": "aaa",
        "opt2": "bbb",
        "opt3": "ccc",
        "opt4": "ddd"
    },
    {
        "question": "what is your name",
        "ans": "aaa",
        "opt1": "aaa",
        "opt2": "bbb",
        "opt3": "ccc",
        "opt4": "ddd"
    },
    {
        "question": ";azzzzzzzzzzzzasjf",
        "ans": "aaa1",
        "opt1": "aaa1",
        "opt2": "bbb1",
        "opt3": "ccc1",
        "opt4": "ddd1"
    }
];