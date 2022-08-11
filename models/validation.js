const { activitySchema } = require("./schema");

module.exports = {
    validateActivity: async (req, res, next) => {
        try {
            await activitySchema.query.validateAsync(req.query);
            next()
        } catch (error) {
            return res.status(400).json({
                "status": "Error",
                "message": error.details[0].message,
                "data": {}
            })
        }
    },
    validatePostActivity: async (req, res, next) => {
        try {
            await activitySchema.payload.validateAsync(req.body);
            next()
        } catch (error) {
            return res.status(400).json({
                "status": "Error",
                "message": error.details[0].message,
                "data": {}
            })
        }
    },
    validateParam: async (req, res, next) => {
        try {
            await activitySchema.param.validateAsync(req.params);
            next()
        } catch (error) {
            return res.status(400).json({
                "status": "Error",
                "message": error.details[0].message,
                "data": {}
            })
        }
    },
    validateDeleteActivity: async (req, res, next) => {
        try {
            await activitySchema.paramId.validateAsync(req.params);
            await activitySchema.queryId.validateAsync(req.query);
            next()
        } catch (error) {
            return res.status(400).json({
                "status": "Error",
                "message": error.details[0].message,
                "data": {}
            })
        }
    },
    validateUpdate: async (req, res, next) => {
        try {
            await activitySchema.requiredParamId.validateAsync(req.params);
            await activitySchema.title.validateAsync(req.body);
            next()
        } catch (error) {
            return res.status(400).json({
                "status": "Error",
                "message": error.details[0].message,
                "data": {}
            })
        }
    },
    validateUpdateTodo: async (req, res, next) => {
        try {
            await activitySchema.requiredParamId.validateAsync(req.params);
            await activitySchema.updateTodo.validateAsync(req.body)
            next()
        } catch (error) {
            return res.status(400).json({
                "status": "Error",
                "message": error.details[0].message,
                "data": {}
            })
        }
    },
    makeTodo: async (req, res, next) => {
        try {
            await activitySchema.todo.validateAsync(req.body);
            next()
        } catch (error) {
            return res.status(400).json({
                "status": "Error",
                "message": error.details[0].message,
                "data": {}
            })
        }
    },
}
