const { pool } = require("../connection");

class TodoController {
    // app.post('/todo-items', makeTodo, async (req, res) {
    async makeTodo (req, res) {
        let { title, activity_group_id, priority } = req.body
        try {
            let query = 'INSERT INTO todos (title, activity_group_id, priority) VALUES (?, ?, ?)';
            await pool.query(query, [title, activity_group_id, priority])
            let [insert, ...rest] = await pool.query(`SELECT LAST_INSERT_ID() as lastId;`)
            let [data, ...rest2] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [insert[0].lastId])

            data[0].is_active = data[0].is_active == 1 ? true : false;
            res.code(201).send(
                {
                    "status": "Success",
                    "message": "Success",
                    "data": data[0]
                }
            )
        } catch (error) {
            res.code(500).send(
                {
                    "name": "GeneralError",
                    "message": error.message || error,
                    "code": 500,
                    "className": "general-error",
                    "data": {},
                    "errors": {}
                }
            )
        }
    }
    
    // app.get('/todo-items', async (req, res) {
    async listTodos (req, res) {
        try {
            let todoQuery = 'SELECT * FROM todos';
            if(req.query.activity_group_id){
                todoQuery = 'SELECT * FROM todos WHERE activity_group_id = ?'
            }
            let [test, ...rest] = await pool.query(todoQuery, [req.query.activity_group_id])
    
            res.send({
                "status": "Success",
                "message": "Success",
                "data": test
            })
        } catch (error) {
            console.error(error);
        }
    }
    
    // app.get('/todo-items/:id', validateParam, async (req, res) {
    async getTodoById (req, res) {
        try {
            let todoQuery = 'SELECT * FROM todos WHERE id = ?';
            let [test, ...rest] = await pool.query(todoQuery, req.params.id)
            if(!test.length){
                return res.code(404).send(
                    {
                        "status": "Not Found",
                        "message": `Todo with ID ${req.params.id} Not Found`,
                        "data": {}
                    }
                )
            }
            test[0].is_active = test[0].is_active == 1 ? true : false;
            res.send(
                {
                    "status": "Success",
                    "message": "Success",
                    "data": test[0]
                }
            )
        } catch (error) {
            console.error(error);
        }
    }
    
    // app.patch('/todo-items/:id', validateUpdateTodo, async (req, res) {
    async updateTodo (req, res) {
        let { id } = req.params
        let { title, is_active } = req.body
        try {
            let query = `UPDATE todos SET title = ? WHERE id = ?`
            if(title){
                await pool.query(query, [title, id])
            }
            if(typeof is_active !== 'undefined'){
                let query2 = `UPDATE todos SET is_active = ? WHERE id = ?`
                await pool.query(query2, [is_active, id])
            }
            let getQuery = 'SELECT * FROM todos WHERE id = ?'
            let [data, ...rest] = await pool.query(getQuery, [id])
            if(!data.length){
                return res.code(404).send(
                    {
                        "status": "Not Found",
                        "message": `Todo with ID ${req.params.id} Not Found`,
                        "data": {}
                    }
                )
            }
            data[0].is_active = data[0].is_active == 1 ? true : false;
            res.send({
                "status": "Success",
                "message": "Success",
                "data": data[0]
            })
        } catch (error) {
            res.code(500).send(
                {
                    "name": "GeneralError",
                    "message": error.message || error,
                    "code": 500,
                    "className": "general-error",
                    "data": {},
                    "errors": {}
                }
            )
        }
    }
    
    // app.delete('/todo-items/:id', validateDeleteActivity, async (req, res) {
    async deleteTodo (req, res) {
        try {
            let getQuery = 'SELECT * FROM todos WHERE id = ?'
            let data = await pool.query(getQuery, [req.params.id])
            if(!data[0].length){
                return res.code(404).send(
                    {
                        "status": "Not Found",
                        "message": `Todo with ID ${req.params.id} Not Found`,
                        "data": {}
                    }
                )
            }
            let queryPath = 'DELETE FROM todos WHERE id = ?';
            await pool.query(queryPath, [req.params.id])
    
            res.code(200).send(
                {
                    "status": "Success",
                    "message": "Success",
                    "data": {}
                }
            )
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = { TodoController }