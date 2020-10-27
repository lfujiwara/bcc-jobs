import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { v1Router } from './api/v1';

const origin = { origin: '*' };

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(morgan('combined'));
app.use(helmet());

app.use(v1Router);

const port = process.env.PORT || 3333;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}
