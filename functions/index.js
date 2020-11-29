const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51HsbBCIlwpX8F7bkIH6SQTCmYEGTq1GHUFwtDNTnpKtJuUofqChzu9tk76hyswLKZAMmnGcCGopkzfk6iYiNPkNF00yEwp9LJc');

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.post('/payment/create', async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: 'brl'
    });

    res
      .status(200)
      .send(paymentIntent.client_secret);

  } catch (err) {
    res
      .status(500)
      .json({
        statusCode: 500,
        message: err.message
      });
  }
});

app.get("*", (req, res) => {
  res.status(404).send("404, Not Found.");
});

exports.api = functions.https.onRequest(app);
