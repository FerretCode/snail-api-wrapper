# snail-api-wrapper

A wrapper for the [Snail](https://snailpay.app) API

# Authenticating

```javascript
const { Snail } = require("snail-api-wrapper");

const snail = new Snail("your api key");
```

# Error Handling

All functions return promises, so handling errors is done through a `.catch`

# Verifying Payments

To use this endpoint, acquire an order verification code from your user and call this function

```javascript
const verified = await snail.verifyPayment("user code");

console.log(verified); // payment object or false
```

# Creating Payment Links

If you want your product to have an image, you have to encode an image as base64

```javascript
const paymentLink = await snail.createPaymentLink({
  image: "base64 encoded image",
  name: "product name",
  price: 5, // amount of usd to charge
});
```

# Creating Subscription Links

If you want your product to have an image, you have to encode an image as base64

```javascript
const paymentLink = await snail.createSubscriptionLink({
  image: "base64 encoded image",
  name: "product name",
  price: 5, // amount of usd to charge per month
});
```

# List Payments

```javascript
const payments = await snail.listPayments();
```

# List Subscriptions

```javascript
const subscriptions = await snail.listSubscriptions();
```

# List Payment Links

```javascript
const paymentLinks = await snail.listPaymentLinks();
```

# List Subscription Links

```javascript
const subscriptionLinks = await snail.listPaymentLinks();
```

# List Payouts

```javascript
const payouts = await snail.listPayouts();
```

# Create a Payout

```javascript
await snail.newPayout(5);
```

# Refund a Payment

```javascript
await snail.refundPayment(["payment id 1", "payment id 2"]);
```
