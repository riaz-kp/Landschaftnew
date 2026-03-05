const bcrypt = require('bcryptjs');
const password = process.argv[2] || 'admin123';

console.log("Password: " + password);

bcrypt.hash(password, 10).then(hash => {
    console.log(`Password: ${password}`);
    console.log(`Hashed: ${hash}`);
});
