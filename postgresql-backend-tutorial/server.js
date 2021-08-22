const express = require('express');
const cors = require('cors');

const app = express();

let corsOptions = {
    origin: 'https://localhost:8081',
};

app.use(cors(corsOptions));

//parse requests of
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (q, s) => {
    s.json({
        message: 'Welcome',
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
