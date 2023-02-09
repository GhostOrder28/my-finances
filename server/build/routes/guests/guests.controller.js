import { signupGuest, postGuestClient, deleteGuests } from "../../models/guests/guests.model.js";
import { getGuestAuthData } from "../../guest/guest-data.js";
import { patchUserAssets } from "../../models/users/users.model.js";
const clientPool = [
    'Luke Skywalker',
    'Jim Raynor',
    'Jhon Galt',
    'Mara Slania',
    'Sarah Kerrigan',
    'Alayna'
];
async function httpSignupGuest(req, res, next) {
    try {
        const userCredentials = await signupGuest(getGuestAuthData());
        await Promise.all(clientPool.map((_, idx) => postGuestClient(userCredentials._id.toString(), clientPool[idx])));
        await patchUserAssets(userCredentials._id.toString());
        return res.status(200).json({ userCredentials });
    }
    catch (err) {
        throw new Error(`there was an error trying to register a new guest user: ${err}`);
    }
}
async function httpDeleteGuests(_, res) {
    try {
        await deleteGuests();
        return res.status(200).json('all guests were deleted');
    }
    catch (err) {
        throw new Error(`there was an error trying to delete guests users, ${err}`);
    }
}
;
export { httpSignupGuest, httpDeleteGuests, };
