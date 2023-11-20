const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const url =
  "mongodb+srv://HarishDass:e5pAmwwlLT6Bz6ST@cluster0.g824ohf.mongodb.net/?retryWrites=true&w=majority";

const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

mongoose.connect(url).then(() => {
  console.log("connected");
});

const RegistrationSchema = new mongoose.Schema({
  username: String,
  age: Number,
  emailId: String,
  password: String,
});
const productDetails = new mongoose.Schema({
  productName: String,
  productImage: String,
  productDescription: String,
  productPrice: Number,
  count: Number,
  productTotal: Number,
});
const cart = mongoose.model("cart", productDetails);
const productPro = new mongoose.Schema({
  name: String,
  productDetails: [productDetails],
});

const product = new mongoose.Schema({
  section: String,
  sectionImage: String,
  products: [productPro],
});

const Products = mongoose.model("products", product);

RegistrationSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
RegistrationSchema.methods.compareHash = function (password) {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);
  return bcrypt.compareSync(password, hash);
};
const Person = mongoose.model("Registration", RegistrationSchema);

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors(corsOption));
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: "harishdaas2002@gmail.com",
    pass: "ydwd iplq xdro morm",
  },
});
app.post("/sendmail", (req, res) => {
  let user = req.body;
  let mailOptions = {
    from: "harishdaas2002@gmail.com",
    to: user.mailId,
    subject: "Email Service 👻",
    html: `<h3>Hi I am ${user.username}</h3>
    <p>${user.content}<p>`,
  };
  transporter.sendMail(mailOptions);
});

app.post("/postRegister", async (req, res) => {
  try {
    var new_user = new Person({
      username: req.body.username,
      age: req.body.age,
      emailId: req.body.emailId,
    });

    new_user.password = new_user.generateHash(req.body.password);
    new_user.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
const verifyJwt = (req, res, next) => {
  const token = req.headers["authorization"];
};
app.get("/getProduct", async (req, res) => {
  try {
    const nothing = await Products.find();
    res.json(nothing);
  } catch (err) {
    console.log(err);
  }
});
app.get("/getEachProduct/:param", async (req, res) => {
  console.log(req.params);
  try {
    const nothing = await Products.find({ section: req.params.param });
    res.json(nothing);
    console.log(nothing);
  } catch (err) {
    console.log(err);
  }
});
app.post("/addCart", async (req, res) => {
  const x = req.body;

  try {
    const filter = await cart.findOne({
      productName: x.productName,
      productImage: x.productImage,
      productDescription: x.productDescription,
      productPrice: x.productPrice,
    });
    if (!filter) {
      const nothing = new cart({
        productName: x.productName,
        productImage: x.productImage,
        productDescription: x.productDescription,
        productPrice: x.productPrice,
        productTotal: x.productPrice,
        count: 1,
      });
      await nothing.save();
    } else {
      filter.productTotal += x.productPrice;
      filter.count += 1;

      await filter.save();
    }
  } catch (err) {
    console.log(err);
  }
});
app.get("/getCart", async (req, res) => {
  try {
    const nothing = await cart.find();
    res.json(nothing);
  } catch (err) {
    console.log(err);
  }
});
app.put("/updateCart", async (req, res) => {
  console.log(req.body);
  try {
    await cart.findOneAndUpdate(req.body);
  } catch (err) {
    console.log(err);
  }
});
app.delete("/delCart", async (req, res) => {
  try {
    const nothing = await cart.findOneAndDelete(res.body);
    console.log(nothing);
  } catch (err) {
    console.log(err);
  }
});
app.post("/filter", async (req, res) => {
  try {
    const nothing = await Products.find([
      {
        $match: {
          "products.name": "Shirt",
        },
      },
      {
        $project: {
          _id: 1,
          section: 1,
          sectionImage: 1,
          products: {
            $filter: {
              input: "$products",
              as: "product",
              cond: { $eq: ["$$product.name", "Shirt"] },
            },
          },
        },
      },
    ]);
    res.json(nothing);
    console.log(nothing);
  } catch (err) {
    console.log(err);
  }
});

app.post("/postLogin", async (req, res) => {
  try {
    const find_person = await Person.findOne({ username: req.body.username });
    if (find_person) {
      let PersonFound = await find_person.compareHash(req.body.password);
      console.log(PersonFound);
      if (PersonFound) {
        const token = jwt.sign(req.body, "jwtsecret");
        if (token) {
          return res.json({ auth: true, accessToken: token });
        } else {
          return res
            .status(500)
            .json({ auth: false, accessToken: "use don`t have access" });
        }
      } else {
        return res
          .status(500)
          .json({ auth: false, accessToken: "Invalid user" });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
