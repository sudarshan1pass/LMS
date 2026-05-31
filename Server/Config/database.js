const mongoose=require("mongoose")
require("dotenv").config();
exports.connect=()=>{
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URL;

    if (!mongoUrl) {
        console.error("MongoDB connection string missing. Set MONGODB_URL or MONGO_URL in Railway variables.");
        process.exit(1);
    }

    mongoose.connect(mongoUrl,{
    })
    .then(()=>console.log("db connected successfully"))
    .catch(err=>{console.log("db connection failed")
        console.error(err)
        process.exit(1)
    } )
}
