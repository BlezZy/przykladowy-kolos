const express = require('express');
const app = express();
const port = 5000
const connectDB = require('./config/db')
const UserRoutes = require('./routes/UsersRoutes')

app.use(express.json())

connectDB();

app.use('/api/users', UserRoutes);



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})