require('dotenv').config();

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

const userRouter = require('./routes/user.route');
const adminRouter = require('./routes/admin.route');
const errorRouter = require('./routes/error.route');
const connectDB = require('./config/connectDB');
const { checkUser } = require('./middleware/auth');

const app = express();
 
connectDB(process.env.MONGODB_CONNECT_URI);

app.set('view engine', 'ejs');
app.set('views', (path.join(__dirname, 'views')));

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }
}));

app.use(flash());
app.use(checkUser);

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/error', errorRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/user`);
});