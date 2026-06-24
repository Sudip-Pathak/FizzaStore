import ApiError from "../utils/apiError.js";
import asyncHandler from "../middleware/asynchandler.middleware.js";
import Product from "../models/product.model.js";

// @desc get all products
// @route /api/v1/products/allproducts
// @route /api/v1/products/       // //this route is for new method of route used in product router.
// @access public

// const getProducts = asyncHandler(async(req, res) => {
//     let products = await Product.find({});
//     res.send(products)
// });

// // <<< Modified above getProducts backend code for adding pagination>>
// @route /api/v1/products?pageNumber=2(anypage)
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 12; // backend code part for pagination.
    const page = Number(req.query.pageNumber) || 1; // // pagination part.
    let keyword = req.query.keyword;
    keyword = keyword ? {
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } },
        ]
    } : {};
    let productCount = await Product.countDocuments({...keyword});
  let products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.send({ products, page, pages: Math.ceil(productCount / pageSize) });
});

// @desc get product by ID
// @route /api/v1/products/productbyid/:id
// @route /api/v1/products/:id
// @access public
const getProdcutById = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product Not Found!");
  }
  res.send(product);
});

// @desc add new product
// @route /api/v1/products/addnewproduct
// @route /api/v1/products/
// @access private only by admin.
const addProduct = asyncHandler(async (req, res) => {
  // let product = await Product.create({...req.body, user:req.user._id}) // //Here req.user._id value is given by checkAuth from auth.middleware.
  let product = await Product.create({
    user: req.user._id,
    name: "Sample Product",
    description: "Sample Description",
    image: "/images/sample.jpg",
    price: 0,
    brand: "Sample Brand",
    category: "Sample category",
  });
  res.send({ message: "Product created successfully!", product });
});

// @desc Updating the product
// @route /api/v1/products/updateproduct/:id
// @route /api/v1/products/:id
// @access private only by admin.
const updateProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw ApiError(404, "Product Not Found!");
  }
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.category = req.body.category || product.category;
  product.image = req.body.image || product.image;
  product.images = req.body.images?.length ? req.body.images : product.images;
  product.brand = req.body.brand || product.brand;
  product.price = req.body.price || product.price;
  product.countInStock = req.body.countInStock || product.countInStock;
  let updatedProduct = await product.save();

  res.send({
    message: "Product updated successfuly!",
    product: updatedProduct,
  });
});

// @desc Updating the product
// @route /api/v1/products/deleteproduct/:id
// @route /api/v1/products/:id
// @access private only by admin.
const deleteProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw ApiError(404, "Product Not Found!");
  }
  await Product.findByIdAndDelete(id);
  res.send({ message: "Poduct deleted successfylly!" });
});

// @desc getting the top rated products
// @route /api/v1/products/topproducts/:limit
// @access public
const getTopProducts = asyncHandler(async (req, res) => {
  // // This shows top products as per the value u put on limit might be top 10, 20, 30 ..
  // not taking this limit from params// let limit = Number(req.params.limit); // // Giving the number of required products also by paramater.
  let limit = 3;
  let products = await Product.find({}).sort({ rating: -1 }).limit(limit); // // Insted pf making limit we can pass directly number in ....>>>.. limit(10)
  res.send(products);
});

// @desc adding user review section
// @route /api/v1/products/topproducts/:limit
// @access public
const addUserReview = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product Not Found!");
  }

  let alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  ); // // Already reviewed user cannot review again.
  if (alreadyReviewed) throw new ApiError(404, "Already Reviewed!");

  let { rating, comment } = req.body;
  product.reviews.push({
    name: req.user.name,
    rating,
    comment,
    user: req.user._id,
  });
  product.numReviews = product.reviews.length; // // Shows the number of reviews.
  let totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  ); // // Shows number of people to review with average review(combination review of multiple user).
  product.rating = (totalRating / product.reviews.length).toFixed(2);
  await product.save();
  res.send({ message: "Review added successfully!" });
});

// @desc bulk insert products
// @route POST /api/v1/products/bulk
// @access private only by admin.
const bulkInsertProducts = asyncHandler(async (req, res) => {
  const { products } = req.body;
  
  if (!products || !Array.isArray(products) || products.length === 0) {
    res.status(400);
    throw new Error("No products provided for upload");
  }

  // Inject the admin user ID into each product and set default image if missing
  const productsToInsert = products.map((p) => ({
    ...p,
    user: req.user._id,
    image: p.image || "/images/sample.jpg"
  }));

  const insertedProducts = await Product.insertMany(productsToInsert);
  res.status(201).send({ message: `${insertedProducts.length} products added successfully!` });
});

// @desc get admin dashboard stats (counts)
// @route GET /api/v1/products/stats
// @access private + admin
const getAdminStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments({});

  // Import Order and User models inline to avoid circular deps
  const { default: Order } = await import("../models/order.model.js");
  const { default: User } = await import("../models/user.model.js");

  const totalOrders = await Order.countDocuments({});
  const totalAdmins = await User.countDocuments({ isAdmin: true });

  res.json({ totalProducts, totalOrders, totalAdmins });
});

export {
  getProducts,
  getProdcutById,
  addProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  addUserReview,
  bulkInsertProducts,
  getAdminStats,
};
