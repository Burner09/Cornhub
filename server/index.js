import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import itemRoutes from './routes/itemsRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import staffRoutes from './routes/staffRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// handle images
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// middleware config
app.use(express.json());
app.use(express.urlencoded({limit: '15mb', extended: true}));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(helmet());

// app routes
app.use('/staff', staffRoutes)
app.use('/items', itemRoutes)
app.use('/order', orderRoutes)
app.use('/cart', cartRoutes)
// database connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`app listening on port ${process.env.PORT}`)
    })
  }).catch((err) => {
    console.log(err)
  });