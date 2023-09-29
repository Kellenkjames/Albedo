import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { signupRoute } from './routes/signup';
import { verifyEmailRoute } from './routes/emailVerification';
import { createSignInData } from './routes/siws/signInInput';

import siwsRoutes from '../src/routes/siws/index';

// Initialize express
const app = express();
const port = 3001; // You can choose another port if you like

// Enable CORS from frontend
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware for parsing JSON
app.use(express.json());

// Global logging middleware (Moved up)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.path, req.body);
  next();
});

// Register the signup route
app.post('/signup', signupRoute);

// Add verifyEmailRoute
app.post('/api/verify-token', verifyEmailRoute);

// Sign in With Solana routes
app.use('/api', siwsRoutes);

// Endpoint to send the nonce to the frontend
app.get('/api/getSignInData', async (req, res) => {
  const signInData = await createSignInData();
  res.json(signInData);
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});