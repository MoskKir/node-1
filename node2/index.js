const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const jsonParser = bodyParser.json()

let fileContent = fs.readFileSync('data.json', 'utf-8');
// console.log(fileContent);

app.use(express.static(__dirname + "/public"));
// получение списка данных
app.get("/api/users", function(req, res){      
    const content = fs.readFileSync("data.json", "utf8");
    const users = JSON.parse(content);
    res.send(users);
});
// получение отправленных данных
app.post("/api/users", jsonParser, (req, res) => {     
    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};
     
    let data = fs.readFileSync("data.json", "utf8");
    let users = JSON.parse(data);
     
    // находим максимальный id
    let id = Math.max.apply(Math, users.map( val => val.id ))
    // увеличиваем его на единицу
    user.id = id + 1;
    // добавляем пользователя в массив
    users.push(user);
    data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("data.json", data);
    res.send(user);
});


