const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function run() {
  await connectToDatabase();

  try {
    // Solution: Convert age to number before sorting
    const users = await User.find({ age: { $exists: true } }).sort({ age: 1 }).limit(5);
    console.log('Users:', users); // Correct sorting

    //Demonstrate bug: Sorting on a field with inconsistent types
    await User.create({ name: 'Bob', age: '25' }); // Insert a string value for age
    // Convert string age to number or handle the different types
    const users2 = await User.find({ age: { $exists: true } }).map(user => ({
      ...user.toObject(),
      age: typeof user.age === 'string' ? parseInt(user.age) : user.age
    })).sort((a, b) => a.age - b.age);
    console.log('Users after inserting string age (corrected):', users2);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

run();