import app from './app';

const port = 3001;
app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});