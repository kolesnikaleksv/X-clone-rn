import express from 'express';

const app = express();

app.listen(5001, () =>
  console.log(`Server is up, and runing on PORT: ${5001}`)
);

app.get('hello');
