const { pool } = require("../connection");

class TodoController {
    // app.post('/todo-items', makeTodo, async (req, res) {
    async makeTodo (req, res) {
        let { title, activity_group_id, priority } = req.body
        try {
            let query = 'INSERT INTO todo (title, activity_group_id, priority) VALUES (?, ?, ?)';
            await pool.query(query, [title, activity_group_id, priority])
            let [insert, ...rest] = await pool.query(`SELECT LAST_INSERT_ID() as lastId;`)
            let [data, ...rest2] = await pool.query(`SELECT * FROM todo WHERE id = ?`, [insert[0].lastId])
            res.status(201).json({
                ...data[0]
            })
        } catch (error) {
            res.status(500).json(
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
        let total, limit, data;
        let todoQuery = 'SELECT * FROM todo';
        try {
            let [test, ...rest] = await pool.query(todoQuery)
            let todos = test.map(t => {
                let { created_at, updated_at, ...rest} = t
                return rest
            })
            data = todos
            total = test.length
            limit = 10
    
            res.json({
                total, 
                limit,
                "skip": 0,
                data
            })
        } catch (error) {
            console.error(error);
        }
    }
    
    // app.get('/todo-items/:id', validateParam, async (req, res) {
    async getTodoById (req, res) {
        try {
            let todoQuery = 'SELECT * FROM todo WHERE id = ?';
            let [test, ...rest] = await pool.query(todoQuery, req.params.id)
            if(!test.length){
                return res.status(404).json(
                    {
                        "name": "NotFound",
                        "message": `No record found for id ${req.params.id}`,
                        "code": 404,
                        "className": "not-found",
                        "errors": {}
                    }
                )
            }
            let { activity_group_id, created_at, updated_at, ...rest2 } = test[0]
            res.json({
                ...rest2
            })
        } catch (error) {
            console.error(error);
        }
    }
    
    // app.patch('/todo-items/:id', validateUpdateTodo, async (req, res) {
    async updateTodo (req, res) {
        let { id } = req.params
        let { title, is_active, priority } = req.body
        try {
            let query = `UPDATE todo SET title = ?, is_active = ?, priority = ? WHERE id = ?`
            await pool.query(query, [title,is_active, priority, id])
            let getQuery = 'SELECT * FROM todo WHERE id = ?'
            let data = await pool.query(getQuery, [id])
            if(!data[0].length){
                return res.status(404).json(
                    {
                        "name": "NotFound",
                        "message": `No record found for id ${req.params.id}`,
                        "code": 404,
                        "className": "not-found",
                        "errors": {}
                    }
                )
            }
            res.json({
                ...data[0][0]
            })
        } catch (error) {
            res.status(500).json(
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
            if(req.query.id){
                let numbers = req.query.id.split(',').map(Number)
                let query = 'DELETE FROM todo WHERE id IN (?)';
                await pool.query(query, [numbers])
                let obj = [];
                for (let i = 0; i < numbers.length; i++) {
                    obj.push({})
                }
                return res.status(200).json(obj)
            }
            if(req.params.id){
                let queryPath = 'DELETE FROM todo WHERE id = ?';
                await pool.query(queryPath, [req.params.id])
            }
            res.status(200).json([{}])
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = { TodoController }