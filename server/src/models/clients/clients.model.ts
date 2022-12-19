import clientsSchema from "./clients.schema";
import { Client } from "../../types/client.types";

async function postClient (userId: string, body: Client) {
  const { name, nameDetails, contactPhone } = body;
  const client = new clientsSchema({
    userId,
    name,
    nameDetails,
    contactPhone,
    sales: [],
    totalDebtValue: 0,
    totalSalesValue: 0,
  });
  const clientData = await client.save();
  console.log(clientData);
};

export {
  postClient,
}
