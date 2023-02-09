import mongoose from "mongoose";
import { loremIpsum } from "lorem-ipsum";
import { getRandomNumber } from "../../utils/utility-functions.js";
import clientsCollection from "../clients/clients.schema.js";
import usersCollection from "../users/users.schema.js";
import userModel from "../users/users.schema.js";
const { Types: { ObjectId } } = mongoose;
const contactPhonePool = [
    '985265758',
    '951357658',
    '946285157',
    '936546879',
    '982657159',
    '946825798'
];
const datePool = [
    {
        saleDate: '2023/02/15',
        paymentDates: ['2023/02/28', '2023/03/03', '2023/03/05']
    },
    {
        saleDate: '2023/02/07',
        paymentDates: ['2023/02/14', '2023/02/08', '2023/02/25']
    },
    {
        saleDate: '2023/03/17',
        paymentDates: ['2023/03/28', '2023/03/30', '2023/04/11']
    },
    {
        saleDate: '2023/04/09',
        paymentDates: ['2023/04/22', '2023/04/27', '2023/05/01']
    },
    {
        saleDate: '2023/05/07',
        paymentDates: ['2023/05/19', '2023/06/01', '2023/06/13']
    },
];
const pricePerUnitPool = [25, 75, 50, 100];
function getRandomItem(arr) {
    const randomIdx = Math.floor(Math.random() * (arr.length - 1));
    return arr[randomIdx];
}
;
function getRandomLorem(units, count) {
    const lorem = loremIpsum({ units, count });
    return lorem;
}
function getItems() {
    return [
        {
            name: getRandomLorem('words', 2),
            quantity: getRandomNumber(3) + 1,
            pricePerUnit: getRandomItem(pricePerUnitPool)
        },
        {
            name: getRandomLorem('words', 2),
            quantity: getRandomNumber(3) + 1,
            pricePerUnit: getRandomItem(pricePerUnitPool)
        },
        {
            name: getRandomLorem('words', 2),
            quantity: getRandomNumber(3) + 1,
            pricePerUnit: getRandomItem(pricePerUnitPool)
        },
    ];
}
function getPayments(paidAmount, numberOfPayments, paymentDates) {
    const amountPerPayment = Math.floor(paidAmount / numberOfPayments);
    const paymentsArr = Array.from(new Array(numberOfPayments));
    const payments = paymentsArr.map((_, idx) => ({ paymentDate: paymentDates[idx], amount: amountPerPayment }));
    return payments;
}
;
function generateSale() {
    const items = getItems();
    const saleValue = items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.pricePerUnit;
    }, 0);
    const paidAmount = saleValue - getRandomNumber(saleValue);
    const numberOfPayments = getRandomNumber(3) + 1;
    const selectedPaymentDates = getRandomItem(datePool);
    return {
        saleDate: selectedPaymentDates.saleDate,
        items,
        payments: getPayments(paidAmount, numberOfPayments, selectedPaymentDates.paymentDates),
        saleValue,
        paidAmount,
        unpaidAmount: saleValue - paidAmount,
    };
}
;
async function signupGuest(body) {
    const { username, email, password } = body;
    const newUser = new userModel({ username, email: email.toLowerCase(), password, guest: true });
    const { _id } = newUser;
    try {
        await newUser.save();
        return {
            _id,
            email,
            password,
        };
    }
    catch (err) {
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function postGuestClient(userId, clientName) {
    const userObjectId = new ObjectId(userId);
    const numberOfSales = getRandomNumber(3) + 1;
    const salesArr = Array.from(new Array(numberOfSales));
    const sales = salesArr.map(_ => generateSale());
    const currentDebt = sales.reduce((acc, curr) => {
        return acc + curr.unpaidAmount;
    }, 0);
    const clientSalesValue = sales.reduce((acc, curr) => {
        return acc + curr.saleValue;
    }, 0);
    const clientData = {
        clientName,
        clientNameDetails: getRandomLorem('words', 3),
        contactPhone: getRandomItem(contactPhonePool),
        currentDebt,
        clientSalesValue,
        sales
    };
    const client = new clientsCollection({
        userId: userObjectId,
        ...clientData
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
async function deleteGuests() {
    try {
        const query = { guest: true };
        const options = { projection: { _id: 1 } };
        const guests = await usersCollection.find(query, options);
        const deletePromises = guests.map(async (guest) => {
            await usersCollection.findByIdAndDelete(guest._id);
            await clientsCollection.deleteMany({ userId: new ObjectId(guest._id) });
        });
        await Promise.all(deletePromises);
        // console.log('guests', guests);
    }
    catch (err) {
        throw new Error(`${err}`);
    }
}
;
export { signupGuest, postGuestClient, deleteGuests, };
