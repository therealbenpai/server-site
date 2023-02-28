const fs = require('fs');
const { v4 } = require('uuid');

function getUser(uuid) {
    const { users } = require('../server/db/users.json')
    let edata
    users.forEach((data, index) => {
        if (data.uuid == uuid) {
            edata = data
        }
    })
    if (!edata) {
        return [false, 'User not found']
    }
    return [true, edata]
}

function editUser(uuid, data) {
    const { users } = require('../server/db/users.json')
    let edata
    users.forEach((data, index) => {
        if (data.uuid == uuid) {
            edata = index
        }
    })
    if (!edata) {
        return [false, 'User not found']
    }
    users[edata] = data
    fs.writeFile('./server/db/users.json', JSON.stringify({ users: users }, null, 4), { encoding: 'utf8' }, function (err) { })
    return [true, 'User edited']
}

function addUser(name, ip) {
    const data = {
        name: name,
        regIP: ip,
        uuid: v4(),
        timesUsed: 0,
        stats: {
            req: [0, 0, 0],
            res: [0, 0, 0],
            timesRateLimited: 0
        }
    }
    const { users } = require('../server/db/users.json')
    users.push(data)
    fs.writeFile('../server/db/users.json', JSON.stringify({ users: users }, null, 4), { encoding: 'utf8' }, function (err) { })
    return data
}

function deleteUser(uuid) {
    const { users } = require('../server/db/users.json')
    let edata
    users.forEach((data, index) => {
        if (data.uuid == uuid) {
            edata = index
        }
    })
    if (!edata) {
        return [false, 'User not found']
    }
    users.splice(edata, 1)
    fs.writeFile('../server/db/users.json', JSON.stringify({ users: users }, null, 4), { encoding: 'utf8' }, function (err) { })
    return [true, 'User deleted']
}

module.exports = {
    getUser,
    editUser,
    addUser,
    deleteUser
}