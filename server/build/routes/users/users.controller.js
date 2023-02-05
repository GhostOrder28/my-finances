import { getUserAssets } from "../../models/users/users.model.js";
async function httpGetUserAssets(req, res) {
    const { userid } = req.params;
    try {
        const userAssets = await getUserAssets(userid);
        return res.status(201).json({ userAssets });
    }
    catch (err) {
        throw new Error(`there was an error: ${err}`);
    }
}
export { httpGetUserAssets, };
