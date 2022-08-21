const Joi = require('@hapi/joi');

const activitySchema = {
    query: Joi.object({
        email: Joi.string().email()
    }),
    payload: Joi.object({
        title: Joi.string().max(100).required().messages({
            'any.required': `title cannot be null`
        }),
        email: Joi.string().email().required(),
        _comment: Joi.string()
    }),
    todo: Joi.object({
        title: Joi.string().max(100).required().messages({
            'any.required': `title cannot be null`
        }),
        priority: Joi.string().optional().valid("very-high", "high", "normal", "low", "very-low").empty(['', null]).default('very-high'),
        activity_group_id: Joi.number().required().messages({
            'any.required': `activity_group_id cannot be null`
        }),
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
        is_active: Joi.bool(),
        priority: Joi.string().optional().valid("very-high", "high", "normal", "low", "very-low").empty(['', null]).default('very-high'),
        _comment: Joi.string()
    })
}

module.exports = { activitySchema }