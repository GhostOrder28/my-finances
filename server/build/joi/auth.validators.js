import Joi from "joi";
const signinValidator = Joi.object().keys({
    email: Joi.string()
        .email()
        .required()
        .messages({
        'string.required': 'El email es requerido.',
        'string.email': 'El email no esta correctamente escrito.',
        'string.empty': 'El email no puede estar vacío.'
    }),
    password: Joi.string()
        .required()
        .strip()
        .messages({
        'string.required': 'La contraseña es requerida.',
        'string.empty': 'La contraseña no puede estar vacía.'
    }),
});
const signupValidator = signinValidator.keys({
    username: Joi.string()
        .pattern(/^[a-zA-ZñÑáéíóúüÁÉÍÓÚ\s]+$/)
        .max(50)
        .required()
        .messages({
        'string.required': 'El nombre es requerido.',
        'string.empty': 'El nombre no puede estar vacío.',
        'string.max': 'El nombre no puede tener más de 50 caracteres.',
        'string.pattern.base': 'El nombre solo puede contener letras.'
    }),
});
export { signinValidator, signupValidator, };
