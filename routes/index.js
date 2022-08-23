const { ActivityController } = require("../controllers/activity");
const { TodoController } = require("../controllers/todo");
const { validatePostActivity, validateParam, validateDeleteActivity, validateUpdate, validateUpdateTodo, makeTodo } = require('../models/validation');

const acti = new ActivityController
const todo = new TodoController

async function router(app){
    app.get('/activity-groups', acti.listActivities);
    app.get('/activity-groups/:id', { preHandler: validateParam}, acti.getActivityById);
    app.post('/activity-groups', { preHandler: validatePostActivity }, acti.createActivity);
    app.patch('/activity-groups/:id', { preHandler: validateUpdate }, acti.updateActivity);
    app.delete('/activity-groups/:id', { preHandler: validateDeleteActivity }, acti.deleteActivity);
    
    app.post('/todo-items', { preHandler: makeTodo }, todo.makeTodo);
    app.get('/todo-items', todo.listTodos);
    app.get('/todo-items/:id', { preHandler: validateParam }, todo.getTodoById);
    app.patch('/todo-items/:id', { preHandler: validateUpdateTodo }, todo.updateTodo);
    app.delete('/todo-items/:id', { preHandler: validateDeleteActivity }, todo.deleteTodo);
}

module.exports = router