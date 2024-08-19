const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { saveOrderDetails, registerUser, authenticateUser } = require('./database');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.post('/api/order', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Please log in to place an order' });
    }

    const orderDetails = req.body;
    saveOrderDetails(req.session.userId, orderDetails)
        .then(() => res.status(200).json({ success: true }))
        .catch(error => res.status(500).json({ success: false, error }));
});

app.post('/api/register', (req, res) => {
    const userDetails = req.body;
    registerUser(userDetails)
        .then(() => res.status(200).json({ success: true }))
        .catch(error => res.status(500).json({ success: false, error }));
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    authenticateUser(email, password)
        .then(userId => {
            req.session.userId = userId;
            res.status(200).json({ success: true });
        })
        .catch(error => res.status(401).json({ success: false, message: 'Invalid credentials' }));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
// Existing imports...

const bcrypt = require('bcrypt');

// Updated authentication functions

function registerUser(userDetails) {
    return new Promise((resolve, reject) => {
        const { name, email, phone, address, password } = userDetails;
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return reject(err);
            const query = 'INSERT INTO users (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [name, email, phone, address, hashedPassword], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    });
}


function authenticateUser(email, password) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, password FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err || results.length === 0) return reject('User not found');
            const user = results[0];
            bcrypt.compare(password, user.password, (err, match) => {
                if (err || !match) return reject('Invalid credentials');
                resolve(user.id);
            });
        });
    });
}

// Existing app logic...

const express = require('express');
const bcrypt = require('bcrypt');


app.use(express.json());

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.json({ success: false, message: 'Database error' });
        
        if (results.length === 0) {
            return res.json({ success: false, message: 'Email not found' });
        }
        
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.json({ success: false, message: 'Error comparing passwords' });
            
            if (isMatch) {
                return res.json({ success: true, name: user.name });
            } else {
                return res.json({ success: false, message: 'Incorrect password' });
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

