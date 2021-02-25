import express from 'express';

//middleware
import logger from './middleware/logger.middleware';
import cors from './middleware/cors.middleware';

//routes
import accountsRoutes from './routes/accounts.route';
import credentialsRoute from './routes/credentials.route';
import transactionsRoute from './routes/transactions.route';


// export class App{
    
//     private app:express.Application;

//     constructor(private port?: number | string){
//         this.app = express();
//         this.settings();
//         this.middlewares = this.middlewares;
//         this.routes();
//     }
//     settings() {
//         this.app.set('port', this.port || process.env.PORT || 5000);
//     }
//     middlewares() {
//         this.app.use(logger);
//         this.app.use(express.json);
//     }
//     routes() {
//         this.app.use('/accounts',accountsRoutes);
//     }
//     async listen() {
//         await this.app.listen( this.app.get('port'));
//         console.log( `server started at http://localhost:${ this.app.get('port') }` );
//     }
// }
const PORT = process.env.PORT || 5000;
const app: express.Application = express();
//Middleware
app.use(logger);
app.use(cors);
app.use(express.json());
//Routes
app.use('/', credentialsRoute);
app.use('/accounts', accountsRoutes);
app.use('/transactions', transactionsRoute);


//Error handling
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).json({
        msg: 'Method not found'
    });
});
//Default Internal server error
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) =>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

app.listen(PORT,() => console.log('Server running on port: ', PORT) );