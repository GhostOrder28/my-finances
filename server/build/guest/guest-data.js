function getGuestAuthData() {
    const rnd = generateRandomNumber();
    return {
        username: `guest${rnd}`,
        email: `guest.${rnd}@guest.com`,
        password: `izsjvln753834td`
    };
}
;
function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
}
;
const clientPool = [
    'Luke Skywalker',
    'Jim Raynor',
    'Jhon Galt',
    'Mara Slania',
    'Sarah Kerrigan',
    'Alayna'
];
export { getGuestAuthData };
