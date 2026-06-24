import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: String,
    comment: String,
    rating: Number,
    user:{   // // This is a normal user who gives comment on that particular product.
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

const productSchema = new mongoose.Schema(
    {
    user: {       // // Here this user feld is added which identifies that the selected particular product is added by which user, but not by normal user only by admin user.
        type: mongoose.Schema.Types.ObjectId,  // // This objectId is an objectid of mongoDB not an normal string.
        ref:"User",        // // To refference the just above <type> with user.model of User we have ref.  
        required: true
    },  // // This user works as an foreign key in SQL.
    name:{
        type: String,
        required: true,
    },
    image: String,
    images: [String],  // Up to 4 product images
    description: String,
    brand: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
        // enum: ["Electronics", "Clothing", "Stationary"] // // Only this options will be availbe in product categories.
    },
    price: {
        type: Number,
        required: true,
        // min: 1,
    },
    countInStock: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    reviews: [reviewSchema],
    // reviews:[
    //     {
    //         name:String,
    //         rating: Number,
    //         Comment: String,    // // Reviews can be created here like these also.
    //         user: String,      // // But we created it by making new Schema.
    //     }
    // ]
},
    {timestamps: true}
);

const Product = mongoose.model("Product", productSchema);
export default Product;

// // Normalization is the technique of dividing the data into multiple tables to reduce data redundancy and inconsistency and to achieve data integrity. 
// // On the other hand, Denormalization is the technique of combining the data into a single table to make data retrieval faster.
// // Here in this productShcema both the normalization and denormalization condition is being used as well as with document embading.