module.exports.Snail = class {
  /**
   * @param {String} apiKey Your Snail API key
   */
  constructor(apiKey) {
    if (!apiKey) throw "You need to provide an API key!";

    /**
     * A function which verifies a verification code from an order
     * @param {String} code The user provided verification code
     * @returns {Promise} a promise which resolves to either an error or a bool, or in the case of a successful verification, a payment object
     */
    this.verifyPayment = (code) => {
      return new Promise(async (resolve, reject) => {
        if (code.length !== 10) return resolve(false);

        const res = await fetch(
          `https://snailpay.app/verify-payment?code=${code}`,
          {
            method: "GET",
            headers: {
              Authorization: apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        res.catch(reject);

        if (res.status !== 200) return resolve(false);

        const json = res.json().catch(reject);

        resolve(json);
      });
    };

    /**
     * A function that creates a payment link based on the provided options
     * @param {object} options The options for the payment link
     * @param {string} options.image A base64 encoded image for the product
     * @param {string} options.name The name for your product
     * @param {number} options.price The number for your product
     * @returns {Promise} a promise which resolves to an error or the payment URL
     */
    this.createPaymentLink = (options) => {
      return new Promise(async (resolve, reject) => {
        if (!options.name || !options.price)
          reject(
            new Error(
              "You need to provide a name and a price for your product!"
            )
          );

        const res = await fetch(`https://snailpay.app/payment-link`, {
          method: "POST",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: options.image,
            name: options.name,
            price: options.price,
          }),
        });

        res.catch(reject);

        if (res.status !== 200) return reject(new Error(res.statusText));

        const url = await res.text();

        resolve(url);
      });
    };

    /**
     * A function that creates a subscription link based on the provided options
     * @param {object} options The options for the subscription link
     * @param {string} options.image A base64 encoded image for the product
     * @param {string} options.name The name for your product
     * @param {number} options.price The number for your product
     * @returns {Promise} a promise which resolves to an error or the subscription URL
     */
    this.createSubscriptionLink = (options) => {
      return new Promise(async (resolve, reject) => {
        if (!options.name || !options.price)
          reject(
            new Error(
              "You need to provide a name and a price for your product!"
            )
          );

        const res = await fetch(`https://snailpay.app/subscription-link`, {
          method: "POST",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: options.image,
            name: options.name,
            price: options.price,
          }),
        });

        res.catch(reject);

        if (res.status !== 200) return reject(new Error(res.statusText));

        const url = await res.text();

        resolve(url);
      });
    };

    /**
     * A function that lists payments for your account
     * @returns {Promise} a promise that returns a list of payments on your account or an error
     */
    this.listPayments = () => {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(`https://snailpay.app/payment-list`, {
          method: "GET",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        });

        res.catch(reject);

        if (res.status !== 200) return reject(new Error(res.statusText));

        const payments = await res.json();

        resolve(payments);
      });
    };

    /**
     * A function that lists subscriptions for your account
     * @returns {Promise} a promise that returns a list of subscriptions on your account or an error
     */
    this.listSubscriptions = () => {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(`https://snailpay.app/subscription-list`, {
          method: "GET",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        });

        res.catch(reject);

        if (res.status !== 200) return reject(new Error(res.statusText));

        const subscriptions = await res.json();

        resolve(subscriptions);
      });
    };

    /**
     * A function that lists subscription links for your account
     * @returns {Promise} a promise that returns a list of subscription links on your account or an error
     */
    this.listSubscriptionLinks = () => {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(`https://snailpay.app/subscription-link-list`, {
          method: "GET",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        });

        res.catch(reject);

        if (res.status !== 200) return reject(new Error(res.statusText));

        const subscriptionLinks = await res.json();

        resolve(subscriptionLinks);
      });
    };

    /**
     * A function that lists payment links for your account
     * @returns {Promise} a promise that returns a list of payment links on your account or an error
     */
    this.listPaymentLinks = () => {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(`https://snailpay.app/payment-link-list`, {
          method: "GET",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        });

        res.catch(reject);

        if (res.status !== 200) return reject(new Error(res.statusText));

        const paymentLinks = await res.json();

        resolve(paymentLinks);
      });
    };

    /**
     * A function that lists payotus for your account
     * @returns {Promise} a promise that returns a list of payouts on your account or an error
     */
    this.listPayouts = () => {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(`https://snailpay.app/payout`, {
          method: "GET",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        });

        res.catch(reject);

        if (res.status !== 200) return reject(new Error(res.statusText));

        const payouts = await res.json();

        resolve(payouts);
      });
    };

    /**
     * A function for creating a new payout
     * @params {number} amount The amount of USD to pay out
     * @returns {Promise} a promise that resolves to nothing or rejects with an error
     */
    this.newPayout = (amount) => {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(`https://snailpay.app/new-payout`, {
          method: "POST",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
          }),
        });

        res.catch(reject);

        if (res.status !== 200) return reject(new Error(res.statusText));

        resolve();
      });
    };

    /**
     * A function for refund a payment to a customer
     * @params {string[]} payments A list of payment IDs to refund
     * @returns {Promise} a promise that resolves to nothing or rejects with an error
     */
    this.refundPayment = (payments) => {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(`https://snailpay.app/refund-payment`, {
          method: "POST",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payments,
          }),
        });

        res.catch(reject);

        if (res.status !== 200) return reject(new Error(res.statusText));

        resolve();
      });
    };
  }
};
