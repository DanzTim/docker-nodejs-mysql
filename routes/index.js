const router = require("express").Router();

const { ActivityController } = require("../controllers/activity");
const { TodoController } = require("../controllers/todo");
const { validatePostActivity, validateParam, validateDeleteActivity, validateUpdate, validateUpdateTodo, makeTodo } = require('../models/validation');

const acti = new ActivityController
const todo = new TodoController

router.get('/activity-groups/:id', validateParam, acti.getActivityById);
router.get('/activity-groups', acti.listActivities);
router.post('/activity-groups', validatePostActivity, acti.createActivity);
router.patch('/activity-groups/:id', validateUpdate, acti.updateActivity);
router.delete('/activity-groups/:id', validateDeleteActivity, acti.deleteActivity);

router.post('/todo-items', makeTodo, todo.makeTodo);
router.get('/todo-items', todo.listTodos);
router.post('/todo-items:id', validateParam, todo.getTodoById);
router.patch('/todo-items/:id', validateUpdateTodo, todo.updateTodo);
router.delete('/todo-items/:id', validateDeleteActivity, todo.deleteTodo);

module.exports = router