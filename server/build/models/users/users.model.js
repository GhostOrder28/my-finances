import mongoose from "mongoose";
import usersCollection from "./users.schema.js";
import { NotFoundError } from "../../errors/db-errors.js";
import clientsCollection from "../clients/clients.schema.js";
const { Types: { ObjectId } } = mongoose;
function isChangeStreamDocument(data) {
    return data.operationType !== undefined;
}
;
function isString(data) {
    return data.length !== undefined;
}
;
async function getUserAssets(userId) {
    try {
        const userAssets = await usersCollection.findById(userId, { receivables: 1, debtors: 1, totalSalesValue: 1 });
        if (userAssets) {
            return userAssets;
        }
        else {
            throw new NotFoundError('El usuario no existe');
        }
        ;
    }
    catch (err) {
        throw new Error(`there was an error: ${err}`);
    }
}
;
// this function should be called also when the user is on the clientList page and from it he deletes a client
async function patchUserAssets(data) {
    let userId;
    let updateFields;
    if (isChangeStreamDocument(data)) {
        if (data.operationType !== 'update')
            return;
        userId = data.fullDocument?.userId;
        updateFields = data.updateDescription.updatedFields;
    }
    else {
        userId = data;
    }
    ;
    if (updateFields?.clientSalesValue || updateFields?.currentDebt || isString(data)) {
        try {
            const [userAssets] = await clientsCollection.aggregate([
                {
                    $match: {
                        userId: new ObjectId(userId),
                        currentDebt: { $gt: 0 }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalSalesValue: { $sum: '$clientSalesValue' },
                        receivables: { $sum: '$currentDebt' },
                        debtors: {
                            $sum: {
                                $cond: [{ gt: ['$currentDebt', 0] }, 1, 0]
                            }
                        }
                    }
                },
                {
                    $unset: ['_id']
                }
            ]).exec();
            console.log('result: ', userAssets);
            const userQuery = { _id: new ObjectId(userId) };
            const userUpdate = {
                $set: {
                    receivables: userAssets ? userAssets.receivables : 0,
                    totalSalesValue: userAssets ? userAssets.totalSalesValue : 0,
                    debtors: userAssets ? userAssets.debtors : 0,
                }
            };
            const userOptions = { new: true };
            const updatedUser = await usersCollection.findOneAndUpdate(userQuery, userUpdate, userOptions);
            console.log('updatedUser: ', updatedUser);
        }
        catch (err) {
            throw new Error(`there was an error: ${err}`);
        }
    }
    ;
}
;
export { getUserAssets, patchUserAssets, };
