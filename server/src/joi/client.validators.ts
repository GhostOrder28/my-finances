import Joi from 'joi';

const clientValidators = Joi.object({
  clientName: Joi.string()
    .pattern(/^[a-zA-ZñÑáéíóúüÁÉÍÓÚ\s]+$/i)
    .required()
    .messages({
      'string.pattern.base': 'Solo se permiten letras',
      'any.required': 'El nombre del cliente es requerido',
      'string.empty': 'El nombre del cliente es requerido'
    }),

  clientNameDetails: Joi.string()
    .pattern(/^[a-zA-ZñÑáéíóúüÁÉÍÓÚ\s]+$/i)
    .allow('')
    .messages({
      'string.pattern.base': 'solo se permiten letras',
    }),

  contactPhone: Joi.number()
    .allow('')
    .messages({
      'number.base': 'solo se permiten números',
    }),
});

export default clientValidators;
