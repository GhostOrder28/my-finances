import Joi from "joi";
const paymentValidator = Joi.object({
    paymentDate: Joi.date()
        .required()
        .messages({
        'any.required': 'La fecha es requerida.',
        'date.empty': 'La fecha no puede estar vacía.',
        'date.base': 'La fecha debe tener el formato Día/Mes/Año',
    }),
    amount: Joi.number()
        .greater(0)
        .required()
        .messages({
        'number.required': 'El monto de pago es requerido',
        'number.empty': 'El mongo de pago no puede estar vacío.',
        'number.greater': 'El monto de pago debe ser mayor a 0.',
        'number.base': 'El monto debe ser un número',
    })
});
export { paymentValidator };
