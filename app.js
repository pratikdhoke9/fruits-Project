const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true })

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Taste Good"
});

fruit.save();


// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'fruitsDB';

// // Create a new MongoClient
// const client = new MongoClient(url);

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);
  
//   // insertDocuments(db,function(){
//       client.close()
//   // })
// });

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
      {name : "apple" , score : 8 ,review : "great fruit" }, 
      {name : "mango" ,score : 2,review :"not good"},
      {name :"banana",score :3,review :"great"}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }