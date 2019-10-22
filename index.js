const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
const nodemailer = require('nodemailer');

app.use(express.static("public"))


app.get('/', function (req, res) {
    res.sendFile('/index.html');
})

app.get('/results', function (req, res) {
    res.sendFile(__dirname + '/public/results.html');
})

app.post('/results', function (req, res) {
    // console.log(req.body)
    answerCounter = {
        wordsOfAffirmation: 0,
        qualityTime: 0,
        receivingGifts: 0,
        actsOfService: 0,
        physicalTouch: 0
    };
    userType = {};
    userType = req.body;
    for (var i in userType){
        if (userType[i] === 'wordsOfAffirmation'){
            answerCounter['wordsOfAffirmation'] +=1;
        } else if (userType[i] === 'qualityTime') {
            answerCounter['qualityTime'] +=1;
        } else if (userType[i] === 'receivingGifts') {
            answerCounter['receivingGifts'] +=1;
        } else if (userType[i] === 'actsOfService') {
            answerCounter['actsOfService'] +=1;
        } else if (userType[i] === 'physicalTouch'){
            answerCounter['physicalTouch'] +=1;
        }
    };
    var answersSorting = [];
    for (var value in answerCounter) {
        answersSorting.push([value, answerCounter[value]]);
    }

    answersSorting.sort(function(a, b) {
        return b[1] - a[1];
    });

//     var answersSorted = {}
//     answersSorting.forEach(function(item){
//     answersSorted[item[0]]=item[1]
// });

    console.log(answersSorting);

    if (answersSorting[0][0] === 'wordsOfAffirmation') {
        if (answersSorting[1][0] === 'receivingGifts'){
            res.sendFile(__dirname + '/public/results/resultsAG.html');
        } else if (answersSorting[1][0] === 'qualityTime') {
            res.sendFile(__dirname + '/public/results/resultsAQ.html');
        } else if (answersSorting[1][0] === 'actsOfService') {
            res.sendFile(__dirname + '/public/results/resultsAS.html');
        } else if (answersSorting[1][0] === 'physicalTouch') {
            res.sendFile(__dirname + '/public/results/resultsAT.html');
        }
    } else if (answersSorting[0][0] === 'qualityTime') {
        if (answersSorting[1][0] === 'receivingGifts'){
            res.sendFile(__dirname + '/public/results/resultsQG.html');
        } else if (answersSorting[1][0] === 'wordsOfAffirmation') {
            res.sendFile(__dirname + '/public/results/resultsQA.html');
        } else if (answersSorting[1][0] === 'actsOfService') {
            res.sendFile(__dirname + '/public/results/resultsQS.html');
        } else if (answersSorting[1][0] === 'physicalTouch') {
            res.sendFile(__dirname + '/public/results/resultsQT.html');
        }
    } else if (answersSorting[0][0] === 'receivingGifts') {
        if (answersSorting[1][0] === 'wordsOfAffirmation'){
            res.sendFile(__dirname + '/public/results/resultsGA.html');
        } else if (answersSorting[1][0] === 'qualityTime') {
            res.sendFile(__dirname + '/public/results/resultsGQ.html');
        } else if (answersSorting[1][0] === 'actsOfService') {
            res.sendFile(__dirname + '/public/results/resultsGS.html');
        } else if (answersSorting[1][0] === 'physicalTouch') {
            res.sendFile(__dirname + '/public/results/resultsGT.html');
        }
    } else if (answersSorting[0][0] === 'actsOfService') {
        if (answersSorting[1][0] === 'receivingGifts'){
            res.sendFile(__dirname + '/public/results/resultsSG.html');
        } else if (answersSorting[1][0] === 'qualityTime') {
            res.sendFile(__dirname + '/public/results/resultsST.html');
        } else if (answersSorting[1][0] === 'wordsOfAffirmation') {
            res.sendFile(__dirname + '/public/results/resultsSA.html');
        } else if (answersSorting[1][0] === 'physicalTouch') {
            res.sendFile(__dirname + '/public/results/resultsST.html');
        }
    } else if (answersSorting[0][0] === 'physicalTouch') {
        if (answersSorting[1][0] === 'receivingGifts'){
            res.sendFile(__dirname + '/public/results/resultsTG.html');
        } else if (answersSorting[1][0] === 'qualityTime') {
            res.sendFile(__dirname + '/public/results/resultsTQ.html');
        } else if (answersSorting[1][0] === 'actsOfService') {
            res.sendFile(__dirname + '/public/results/resultsTS.html');
        } else if (answersSorting[1][0] === 'wordsOfAffirmation') {
            res.sendFile(__dirname + '/public/results/resultsTA.html');
        }
    }
})

app.post('/email', function (req, res) {

    var i = 1;
    var emails = [];
    emails.push(req.body.email1)
    emails.push(req.body.email2)
    emails.push(req.body.email3)
    emails.push(req.body.email4)
    emails.push(req.body.email5)
   

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lovetalktest1@gmail.com',
            pass: 'getaboard19'
        }
    });

    let mailOptions = {
        from: 'lovetalktest1@gmail.com',
        to: emails,
        subject: "LoveTalk Test Results",
        text: "Your friend took the LoveTalkTest and wanted to share their results with you!",
        html : '' // Same HTML found on results page
    }

    transporter.sendMail(mailOptions);

    res.sendFile(__dirname + '/public/emailsent.html');
})

app.post ('/form', function(req, res) {
    console.log(req.body)
})

app.listen(3000, ()=> {
    console.log('Server Running on Port 3000')
})