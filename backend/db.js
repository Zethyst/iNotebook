const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/Projects";

// const connectToMongo = () => {
//     mongoose.connect(mongoURI, () => {
//         console.log("[+] Connected to MongoDB Successfully");
//     })
// }
const connectToMongo = async () => {
    try {
       await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     });
        console.log("[+] Connected to MongoDB Successfully");
    }
    catch (error) {
        console.error(error);
    }
}
module.exports = connectToMongo;