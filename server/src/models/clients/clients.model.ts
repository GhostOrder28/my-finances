import clientsSchema from "./clients.schema";
import { ClientEditableFields } from "../../types/client.types";

async function postClient (userId: string, body: ClientEditableFields) {
  const client = new clientsSchema({
    userId,
    ...body,
  });

  return await client.save();
};

async function patchClient (clientId: string, body: ClientEditableFields) {
  const { clientName, nameDetails, contactPhone } = body;
  const query = { _id: clientId };

  const update = {
    $set: { 
      clientName,
      nameDetails,
      contactPhone,
    }
  };

  const options = { new: true };

  const payload = await clientsSchema.findOneAndUpdate(query, update, options);

  return payload;
};

async function getClients (userId: string) {
  const clients = await clientsSchema.find({ userId });
  return clients;
};

export {
  postClient,
  patchClient,
  getClients,
}
