import cors from 'cors';
import express from 'express';
import getQuestion from './getQuestion.js';
import countryFlags from './countryFlags.js';
import bodyParser from 'body-parser';
import { newLogin, login, updateScore, getScore, getTopUsers } from './newLogin.js';
import getStateCapitals from './getStateCapitals.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/getquestions", async (req, res) => {
    const questionList = await getQuestion();
    res.send(questionList);
});

app.get("/getFlag", async (req, res) => {
    const codeAndCountry = await countryFlags();
    res.send(codeAndCountry);
});

app.post("/createlogin", async (req, res) =>  {
    const username = req.body.username;
    const password = req.body.password;
    
    const result = await newLogin(username, password);
    if (result.success) {
        res.status(201).send({ message: "Account created successfully" });
    } else {
        res.status(400).send({ message: result.message });
    }
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await login(username);
    if (!user) {
        return res.status(401).send({ message: "Username or password incorrect" });
    }

    if (user.password === password) {
        res.status(200).send({ message: "Login Successful!" });
    } else {
        return res.status(401).send({ message: "Username or password incorrect" });
    }
})

app.post("/updatescore", async (req, res) => {
    const username = req.body.username;
    const pointsToAdd = req.body.pointsToAdd;
    await updateScore(username, pointsToAdd);
})

app.get("/getscore", async (req, res) => {
    const username = req.query.username;
    const score = await getScore(username);
    res.send(score.toString());
})

app.get("/gettopusers", async (req, res) => {
    const topUsers = await getTopUsers();
    res.send(topUsers);
})

app.get("/getstatecapitals", async (req, res) => {
    const stateCapitalsList = getStateCapitals();
    res.send(stateCapitalsList);
})

app.listen(9000, () => {
    console.log("Listening on port 9000");
});