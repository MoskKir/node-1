const fs = require('fs')


const get = async function(){
    const content = fs.readFileSync('../data.json', 'utf8')
    const data = JSON.parse(content)
    return data
}
const add = function (req) {
    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};
     
    let data = fs.readFileSync('../data.json', 'utf8')
    let users = JSON.parse(data);
     
    // находим максимальный id
    let id = Math.max.apply(Math, users.map( val => val.id ))
    // увеличиваем его на единицу
    user.id = id + 1;
    // добавляем пользователя в массив
    users.push(user);
    data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync('../data.json', data);
    return user
}
const update = function(req){
    const userId = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
     
    let data = fs.readFileSync('../data.json', 'utf8')
    const users = JSON.parse(data);
    let user;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === +userId) {
            user = users[i];
            break;
        }
    }
    if (user) {
        user.age = userAge;
        user.name = userName;
        data = JSON.stringify(users);
        fs.writeFileSync('../data.json', data);
        res.send(user);
    }
}
const del = function(req){
    const id = req.params.id
    let data = fs.readFileSync('../data.json', 'utf8')
    let users = JSON.parse(data)
    let index = -1;
    // находим индекс пользователя в массиве
    for (let i = 0; i < users.length; i++) {        
        if (users[i].id === +id) {
            index = i;            
            break;
        }
    }
    if (index > -1) {
        // удаляем пользователя из массива по индексу
        user = users.splice(index, 1)[0];
        data = JSON.stringify(users);
        fs.writeFileSync('../data.json', data);
        // отправляем удаленного пользователя
        res.send(user);
    }
}

module.exports = {
    add,
    get,
    update,
    del
}