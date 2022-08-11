const Joi = require('@hapi/joi');

const activitySchema = {
    query: Joi.object({
        email: Joi.string().email()
    }),
    payload: Joi.object({
        title: Joi.string().max(100).required(),
        email: Joi.string().email().required(),
        _comment: Joi.string()
    }),
    todo: Joi.object({
        title: Joi.string().max(100).required(),
        priority: Joi.string().valid("very-high", "high", "normal", "low", "very-low"),
        activity_group_id: Joi.number(),
        _comment: Joi.string()
    }),
    param: Joi.object({
        id: Joi.number().required()
    }),
    paramId: Joi.object({
        id: Joi.number()
    }),
    queryId: Joi.object({
        id: Joi.string()
    }),
    title: Joi.object({
        title: Joi.string().required()
    }),
    requiredParamId: Joi.object({
        id: Joi.number().required()
    }),
    updateTodo: Joi.object({
        title: Joi.string(),
        is_active: Joi.number().valid(1, 2),
        priority: Joi.string().valid("very-high", "high", "normal", "low", "very-low"),
        _comment: Joi.string()
    })
}

module.exports = { activitySchema }