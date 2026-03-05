const bcrypt = require('bcryptjs');
const hash = '$2b$10$4UrVA9VRgJfp/WLB660lCeKO2I8wBCfh9f8w8joX.kATzMljx4cWq';
const password = 'admin@123';

bcrypt.compare(password, hash).then(res => {
    console.log(`Password: ${password}`);
    console.log(`Match: ${res}`);
});
