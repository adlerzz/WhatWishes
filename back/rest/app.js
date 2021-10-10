import express from 'express';
import jsdb from 'simple-json-db';
import {pid} from 'process';
import fs from 'fs';
import {mapObject} from "./utils.js";

const app = express();
const dbPath = 'db.json'
let DB = new jsdb(dbPath);

app.use(express.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get( '/users/:userId',
    (request, response) => {
        const userId = request.params['userId'];
        const user = DB.get('users')[userId];
        response.status(200).json(user);
    }
);

app.get( '/users/:userId/full',
    (request, response) => {
        const userId = request.params['userId'];
        const user = {id: userId, ...DB.get('users')[userId]};
        user.links = {...DB.get('links')[userId]};
        user.links.subscriptions = user.links.subscriptions.map( userId => DB.get('users')[userId]);
        user.links.lists = user.links.lists.map( listId => ({id: listId, ...DB.get('lists')[listId]}));

        user.links.lists.forEach( list => {
            list.wishes = list.wishes.map( wishId => ({id: wishId, ...DB.get('wishes')[wishId]}));
        });

        response.status(200).json(user);
    }
);

app.get( '/users/:userId/lists',
    (request, response) => {
        const userId = request.params['userId'];
        const links = {...DB.get('links')[userId]};
        const lists = links.lists
            .map( listId => ({id: listId, ...DB.get('lists')[listId]}))
            .filter(list => list.access === 'public');

        lists.forEach( list => {
            list.wishes = list.wishes.map( wishId => ({id: wishId, ...DB.get('wishes')[wishId]}));
        });

        response.status(200).json(lists);
    }
);

app.post( '/users',
    (request, response) => {

        const sequences = DB.get('sequences');
        const newId = `user${sequences.user}`;
        const newUser = {};
        mapObject(newUser, request.body, [
            {field: "id", value: newId},
            "name",
            "nick",
            {field: "ava", default: null}
        ]);

        const users = DB.get('users');
        users[newId] = newUser;

        DB.set('users', users);
        sequences.user++;
        DB.set('sequences', sequences);
        response.sendStatus(201);
    }
);

app.put('/users/:userId',
    (request, response) => {
        const userId = request.params['userId'];
        const users = DB.get('users');

        mapObject(users[userId], request.body, ['name', 'nick', 'ava']);

        DB.set('users', users);
        response.sendStatus(200)
    }
);

app.get( '/lists/:listId',
    (request, response) => {
        const listId = request.params['listId'];
        const list = DB.get('lists')[listId];
        response.status(200).json(list);
    }
);

app.post( '/lists',
    (request, response) => {

        const sequences = DB.get('sequences');
        const newId = `list${sequences.list}`;
        const newList = {};
        mapObject(newList, request.body, [
            {field: "id", value: newId},
            {field: "ord", value: -1},
            "title",
            {field: "access", default: 'private'},
            {field: "wishes", value: []}
        ]);

        const lists = DB.get('lists');

        lists[newId] = newList;

        DB.set('lists', lists);
        sequences.list++;
        DB.set('sequences', sequences);
        response.sendStatus(201);
    }
);

app.put('/lists/:listId',
    (request, response) => {
        const listId = request.params['listId'];
        const lists = DB.get('lists');

        mapObject(lists[listId], request.body, ['ord', 'title', 'access', 'wishes']);

        DB.set('lists', lists);
        response.sendStatus(200)
    }
);

app.post( '/ctrl/reloadDB',
    (request, response) => {
        DB = new jsdb(dbPath);
        response.sendStatus(204);
    }
)

app.listen(3400);

console.log("App started");
console.log(`pid: ${pid}`);
fs.writeFile('PID', String(pid), err => {console.log(err)});
