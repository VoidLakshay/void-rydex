import mongoose from "mongoose"
const mongodbUrl = process.env.MONGODB_URI

if (!mongodbUrl) {
  throw new Error('MONGODB_URI environment variable is not set')
} 

let cached=global.mongooseConn
if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null }
}

/**
 * Establishes and caches a connection to the MongoDB database.
 */
const connectToDatabase = async () => {
  if (cached.conn) {
    console.log('Using cached MongoDB connection')
    return cached.conn
  }   
  if (!cached.promise) {
    console.log('Creating new MongoDB connection')
  cached.promise=mongoose.connect(mongodbUrl).then(c=>c.connection )

  } 

  try {
    const conn=await cached.promise
    console.log('MongoDB connection established')
    cached.conn=conn
    return conn
  } catch (error) {
    console.error("MongoDB Connection Error:", error)
    throw new Error('Failed to connect to MongoDB') 
  }
}
export default connectToDatabase
