import cors from 'cors';
import router from './routes';
import path from 'path';
import dotenv from 'dotenv';
import express, { Request, Response, json } from 'express';
import { contactUs } from './controllers/other/contact-us';

dotenv.config();

/**
 * Determines the mode
 * @returns the mode
 */
const config: Function = (): Object => {
  // if (mode === "testing") return testingConfig;
  // else if (mode === "production") return productionConfig;
  // return defaultConfig;
  return {
    port: 9000,
    database:
      'mongodb+srv://TheBombre:TheBombre@cluster0.4fe5b.mongodb.net/sleep-science?retryWrites=true&w=majority',
    tokenSecret: 'mybiurthdayjahfkadhshdfjhsdj',
  };
  // return {
  //   port: 9000,
  //   database:
  //     "mongodb+srv://TheBombre:TheBombre@cluster0.4fe5b.mongodb.net/default?retryWrites=true&w=majority",
  //   tokenSecret: "mybiurthdayjahfkadhshdfjhsdj",
  // };
};

const app = express();
const PORT = config().port || 9000;

// Allows recognition of incoming Request Object(body) as JSON
app.use(json());
// Allow the frontend (or any domain outside the server) to access from all end-points
app.use(cors());

//React Build Folder
app.use(express.static(path.join(__dirname, '/build')));
// End-Points
app.use('/api/admin', router.admin);
app.use('/api/employees', router.employee);
app.use('/api/companies', router.company);
app.use('/api/questions', router.question);
app.use('/api/questionnaires', router.questionnaire);
app.use('/api/assessments', router.assessment);
app.use('/api/tasks', router.tasks);
app.use('/api/departments', router.department);
app.use('/api/action-plans', router.actionPlan);
app.use('/api/media', router.media);
app.post('/api/contact', contactUs);

// Send the react static build file to the rest of the routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Listen for the local development server
app.listen(PORT, (): void =>
  console.log(`Server Running at http://localhost:${PORT}`),
);

//Export the secret token
const secretToken = config().tokenSecret;
export { app, secretToken };
