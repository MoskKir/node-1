const fs = require('fs')

let data = fs.readFileSync('../data.json', 'utf8')

const get = async function() {
    const userList = JSON.parse(data)
    return userList
}
const add = function (req) {
    const userName = req.body.name
    const userAge = req.body.age
    const user = {name: userName, age: userAge}
    
    let users = JSON.parse(data)
    
    let id = Math.max.apply(Math, users.map( val => val.id ))
    user.id = id + 1

    users.push(user)
    data = JSON.stringify(users)
    fs.writeFileSync('../data.json', data)
    return user
}
const update = function(req) {
    const userId = req.body.id
    const userName = req.body.name
    const userAge = req.body.age
    
    const users = JSON.parse(data)
    let user
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === +userId) {
            user = users[i]
            break
        }
    }
    if (user) {
        user.age = userAge
        user.name = userName
        data = JSON.stringify(users)
        fs.writeFileSync('../data.json', data)
        return user
    }
}
const del = function(req) {
    const id = req.params.id
    let users = JSON.parse(data)
    let index = -1
    for (let i = 0; i < users.length; i++) {        
        if (users[i].id === +id) {
            index = i            
            break
        }
    }
    if (index > -1) {
        user = users.splice(index, 1)[0]
        data = JSON.stringify(users)
        fs.writeFileSync('../data.json', data)
        return user
    }
}

module.exports = {
    add,
    get,
    update,
    del
}