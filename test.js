const bcrypt = require('bcrypt');

async function main() {
    const password = 'mySuperSecretPassword';

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    // Simulating user login
    const enteredPassword = 'mySuperSecretPassword'; // Correct password
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    console.log('Password matches:', isMatch); // true

    // Attempting with a wrong password
    const wrongPassword = 'wrongPassword';
    const isMatchWrong = await bcrypt.compare(wrongPassword, hashedPassword);
    console.log('Password matches:', isMatchWrong); // false
}

main();
