const bcrypt = require('bcryptjs');

const password = '1234'; // รหัสผ่านที่คุณต้องการเข้ารหัส
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Hashed password:', hash);
  }
});
