const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

//app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res) => {
  res.render('index');
})

app.post('/contact/send-message', upload.single('image'), (req,res) => {
  const { author, sender, title, message } = req.body;
  const sendFile = req.file;
  console.log(req.body, req.file);
  if(author && sender && title && message && sendFile) {
    res.render('contact', { isSent: true, fileName: sendFile.originalname });
  }
  else {
    res.render('contact', {isError: true});
  }
});

app.get('/hello/:name', (req,res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about', {layout: 'dark'});
});

app.get('/contact', (req, res) => {
  res.render('contact', {isSent: false});
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req,res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log(path.join(__dirname, 'Server is running on port: 8000'));
});