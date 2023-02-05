import Joi from "joi";
const patchSaleValidator = Joi.object().keys({
    saleDate: Joi.date()
        .required()
        .messages({
        'date.required': 'La fecha de venta es requerida.',
        'date.empty': 'La fecha de venta no puede estar vacía.',
        'date.base': 'La fecha debe tener el formato Día/Mes/Año',
    }),
    items: Joi.array()
        .items(Joi.object({
        name: Joi.string()
            .required()
            .messages({
            'any.required': 'El nombre del producto es requerido',
            'string.empty': 'El nombre del producto no puede estar vacío.',
            'string.base': 'El nombre del producto solo puede contener letras',
        }),
        quantity: Joi.number()
            .greater(0)
            .required()
            .messages({
            'any.required': 'La cantidad es requerida',
            'number.empty': 'La cantidad no puede estar vacía.',
            'number.greater': 'La cantidad debe ser mayor a 0.',
            'number.base': 'La cantidad debe ser un número',
        }),
        pricePerUnit: Joi.number()
            .greater(0)
            .required()
            .messages({
            'any.required': 'El precio es requerido',
            'number.empty': 'El precio no puede estar vacía.',
            'number.greater': 'El precio debe ser mayor a 0.',
            'number.base': 'El precio debe ser un número',
        }),
    }))
        .min(1)
        .required()
        .messages({
        'array.base': 'Formato inválido',
        'array.required': 'Los productos de venta son requeridos',
        'array.min': 'La venta debe tener al menos un producto',
    }),
});
const postSaleValidator = patchSaleValidator.keys({
    payments: Joi.array()
        .items(Joi.object({
        paymentDate: Joi.date()
            .required()
            .messages({
            'date.required': 'La fecha de pago es requerida.',
            'date.empty': 'La fecha de pago no puede estar vacía.',
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
    }))
        .max(1)
        .messages({
        'array.base': 'Formato inválido',
        'array.max': 'El pago inicial es un solo pago, no puede contener más.'
    })
});
export { postSaleValidator, patchSaleValidator, };
