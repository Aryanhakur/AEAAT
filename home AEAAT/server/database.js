const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'aeaat'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

function saveOrderDetails(orderDetails) {
    return new Promise((resolve, reject) => {
        const { customerName, address, serviceType, appointmentDateTime } = orderDetails;
        const query = 'INSERT INTO orders (customer_name, address, service_type, appointment_date_time) VALUES (?, ?, ?, ?)';
        db.query(query, [customerName, address, serviceType, appointmentDateTime], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = { saveOrderDetails };
