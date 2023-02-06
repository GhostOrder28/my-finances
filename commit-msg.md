Frontend.
* sale-page.vue title was change from 'venta realizada a...' to just 'venta a...'.
* back-link label was changed to 'regresar al cliente', without the name of the client.
* layout was modified in sale-page.vue.
* in client-page.vue rows and cols were used instead of flex to set the layout of the stats panel.

Backend.
* nodemon exec was adjusted to get rid of the TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" in development environment.
* the field 'sales' in ClientAndSaleResBody type was renamed to 'sale', all vue components and api models were updated accordingly.
