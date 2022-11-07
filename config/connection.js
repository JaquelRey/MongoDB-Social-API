const mongoose = require('mongoose');

// wrap local connection to MongoDB with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 
module.exports = mongoose.connection;