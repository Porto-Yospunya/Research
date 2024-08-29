require('dotenv').config();

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const userRouter = require('./routes/user.route');
const adminRouter = require('./routes/admin.route');
const connectDB = require('./config/connectDB');
const { checkUser, validateToken } = require('./middleware/auth');
const userController = require('./controllers/user.controller');
const adminController = require('./controllers/admin.controller');
const Person = require('./models/person.model');

const app = express();
 
connectDB(process.env.MONGODB_CONNECT_URI);

app.set('view engine', 'ejs');
app.set('views', (path.join(__dirname, 'views')));

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }
}));

app.use(flash());
app.use(checkUser);

app.get('/user', async (req, res) => {
    const person = await Person.find()
    res.render('user/home', { persons: person });
});

app.get('/admin', validateToken, async (req, res) => {
    const person = await Person.find()
    res.render('user/home', { persons: person });
});

app.use('/user', userRouter);
app.use('/admin', adminRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});