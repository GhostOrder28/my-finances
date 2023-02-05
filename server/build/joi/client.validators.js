import Joi from "joi";
const clientValidators = Joi.object({
    clientName: Joi.string()
        .pattern(/^[a-zA-ZñÑáéíóúüÁÉÍÓÚ\s]+$/i)
        .max(50)
        .required()
        .messages({
        'string.pattern.base': 'El nombre solo puede contener letras.',
        'string.required': 'El nombre del cliente es requerido.',
        'string.empty': 'El nombre del cliente no puede estar vacío.',
        'string.max': 'El nombre no puede tener más de 50 caracteres.',
    }),
    clientNameDetails: Joi.string()
        .pattern(/^[a-zA-ZñÑáéíóúüÁÉÍÓÚ\s]+$/i)
        .max(50)
        .allow('')
        .messages({
        'string.pattern.base': 'El detalle del nombre solo puede contener letras',
        'string.max': 'El detalle del nombre no puede tener más de 50 caracteres.',
    }),
    contactPhone: Joi.number()
        .min(7)
        .allow('')
        .messages({
        'number.base': 'El número de contacto solo puede contener números',
        'number.min': 'El número de contacto debe tener al menos 7 números',
    }),
});
export default clientValidators;
