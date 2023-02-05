import { Types } from "mongoose";
import usersSchema from "../users/users.schema.js";
import clientsCollection from "./clients.schema.js";
import { NotFoundError } from "../../errors/db-errors.js";
import { patchUserAssets } from "../users/users.model.js";
import { strParseIn, strParseOut } from "../../utils/utility-functions.js";
const { ObjectId } = Types;
function parseItemNames(sales) {
    return sales.map(sale => {
        const parsedItems = sale.items.map(item => ({ ...item, name: strParseOut(item.name) }));
        return { ...sale, items: parsedItems };
    });
}
;
async function postClient(userId, body) {
    body.clientName = strParseIn(body.clientName);
    body.clientNameDetails = strParseIn(body.clientNameDetails);
    const client = new clientsCollection({
        userId,
        ...body,
    });
    try {
        const newClient = await client.save();
        return newClient._id;
    }
    catch (err) {
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function patchClient(clientId, body) {
    body.clientName = strParseIn(body.clientName);
    body.clientNameDetails = strParseIn(body.clientNameDetails);
    const query = { _id: clientId };
    const update = {
        $set: { ...body }
    };
    const options = { new: true };
    try {
        const updatedClient = await clientsCollection.findOneAndUpdate(query, update, options);
        if (updatedClient) {
            return clientId;
        }
        else {
            throw new NotFoundError('No se pudo actualizar los datos del cliente, el usuario no existe.');
        }
        ;
    }
    catch (err) {
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function getClients(userId) {
    const query = { userId };
    const projection = {
        clientName: 1,
        clientNameDetails: 1,
        currentDebt: 1,
        clientSalesValue: 1,
    };
    try {
        const clientList = await clientsCollection.find(query, projection);
        if (clientList) {
            const parsedClientList = clientList.map((client) => ({
                ...client.toObject(),
                clientName: strParseOut(client.clientName),
                clientNameDetails: strParseOut(client.clientNameDetails)
            }));
            return parsedClientList;
        }
        else {
            throw new Error('El usuario no existe');
        }
        ;
    }
    catch (err) {
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function getOneClient(clientId) {
    try {
        const clientData = await clientsCollection.findById(clientId, {
            _id: 0,
            userId: 0,
        });
        if (clientData) {
            clientData.clientName = strParseOut(clientData.clientName);
            clientData.clientNameDetails = strParseOut(clientData.clientNameDetails);
            clientData.sales = parseItemNames(clientData.sales);
            return clientData;
        }
        else {
            throw new NotFoundError('El cliente no existe');
        }
        ;
    }
    catch (err) {
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function deleteOneClient(userId, clientId) {
    try {
        const deletedClient = await clientsCollection.findByIdAndDelete(clientId);
        if (!deletedClient) {
            throw new NotFoundError('El cliente no existe');
        }
        ;
        if (deletedClient.currentDebt > 0) {
            console.log(userId);
            const query = { _id: new ObjectId(userId) };
            const update = [{
                    $set: {
                        receivables: { $subtract: ['$receivables', deletedClient.currentDebt] },
                        debtors: { $subtract: ['$debtors', 1] },
                    }
                }];
            await usersSchema.findOneAndUpdate(query, update);
        }
        ;
        await patchUserAssets(userId);
        return clientId;
    }
    catch (err) {
        throw new Error(`there was an error: ${err}`);
    }
}
;
export { postClient, patchClient, getClients, getOneClient, deleteOneClient, };
