function getGuestAuthData () {
  const rnd = generateRandomNumber();
  return {
    username: `guest${rnd}`,
    email: `guest.${rnd}@guest.com`,
    password: `izsjvln753834td`
  }
};

function generateRandomNumber () {
  return Math.floor(Math.random() * 1000);
};

export {
  getGuestAuthData
}
