import { Types } from "mongoose";
import clientsCollection from "./clients.schema";
import usersSchema from '../users/users.schema';
import { ClientEditableFields } from "../../types/client.types";
import { NotFoundError } from "../../errors/db-errors";
import { patchUserAssets } from '../users/users.model';

const { ObjectId } = Types;

async function postClient (userId: string, body: ClientEditableFields) {
  const client = new clientsCollection({
    userId,
    ...body,
  });

  try {
    const newClient = await client.save();
    return newClient._id;
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
};

async function patchClient (clientId: string, body: ClientEditableFields) {
  const { clientName, clientNameDetails, contactPhone } = body;
  const query = { _id: clientId };

  const update = {
    $set: { 
      clientName,
      clientNameDetails,
      contactPhone,
    }
  };

  const options = { new: true };

  try {
    const updatedClient = await clientsCollection.findOneAndUpdate(query, update, options);
    if (updatedClient) {
      return clientId;
    } else {
      throw new NotFoundError('No se pudo actualizar los datos del cliente, el usuario no existe.')
    };
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
};

async function getClients (userId: string) {
  const query = { userId };
  const projection = { 
    clientName: 1,
    clientNameDetails: 1,
    currentDebt: 1,
  };
  
  try {
    const clientList = await clientsCollection.find(query, projection);
    if (clientList) {
      return clientList;
    } else {
      throw new Error('El usuario no existe');
    };
  } catch (err) {
    throw new Error(`there was an error: ${err}`);
  }
};

async function getOneClient (clientId: string) {
  try {
    const clientData = await clientsCollection.findById(clientId, {
      clientName: 1,
      clientNameDetails: 1,
      currentDebt: 1,
      contactPhone: 1,
      sales: 1,
    });

    if (clientData) {
      return clientData;
    } else {
      throw new NotFoundError('El cliente no existe');
    };
  } catch (err) {
    throw new Error(`there was an error: ${err}`);
  }
};

async function deleteOneClient (userId: string, clientId: string) {
  try {
    const deletedClient = await clientsCollection.findByIdAndDelete(clientId);

    if (!deletedClient) {
      throw new NotFoundError('El cliente no existe');
    };

    if (deletedClient.currentDebt > 0) {
      const query = { _id: new ObjectId(userId) };

      const update = [{
        $set: {
          receivables: { $subtract: [ '$receivables', deletedClient.currentDebt ] },
          debtors: { $subtract: [ '$debtors', 1 ] },
        }
      }];

      await usersSchema.findOneAndUpdate(query, update);
    };

    await patchUserAssets(userId);

    return clientId;

  } catch (err) {
    throw new Error(`there was an error: ${err}`);
  }   
};

export {
  postClient,
  patchClient,
  getClients,
  getOneClient,
  deleteOneClient,
}
