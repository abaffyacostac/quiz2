const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

const Schema = mongoose.Schema;
// Create a Schema object

const studentSchema = new Schema({
  name: { type: String, required: true },
  sid: { type: String, required: true },
});

// Create a Model object

const Student = mongoose.model("s24students", studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});


app.post('/', async (req, res) => {
  try {
    const myuri = req.body.myuri; 

    console.log(myuri)

    // Connect to MongoDB
    await mongoose.connect(myuri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Create a new Student document
    const name = "Carlos Abaffy";
    const sid = "300387314";
    const newStudent = new Student({ name, sid });

    // Save the new Quiz2 document
    await newStudent.save();
    console.log('Student document added');

    // Send response after all operations are complete
    res.send(`<h1>Document  Added</h1>`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
