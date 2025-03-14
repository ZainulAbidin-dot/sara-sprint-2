import MongoStore from 'connect-mongo';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '@/config/database.js';

import { getPublicPath } from '@/lib/utils.js';

import AuthRouter from '@/routes/auth.routes.js';
import DiseaseRouter from '@/routes/disease.routes.js';
import PatientRouter from '@/routes/patient.routes.js';

import errorHandler from '@/middleware/errorHandler.js';

const app = express();

// Connect to MongoDB
connectDB();

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());

// Setup express-session with existing Mongoose connection
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(), // Use existing Mongoose connection
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

// serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (request, response) => {
  response.sendFile(path.join(getPublicPath(), 'Home', 'HomePage.html'));
});

app.use('/api/auth', AuthRouter);
app.use('/api/diseases', DiseaseRouter);
app.use('/api/patients', PatientRouter);

// middleware to handle errors
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
