import express from 'express';
const app:express.Application  = express();

const PORT:number = <number>(process.env.PORT || 5000);

app.get('/', (req:express.Request,res:express.Response) => {
    res.send("Hello World!");
})

app.listen(PORT, () => {
    console.log('Server running')
});