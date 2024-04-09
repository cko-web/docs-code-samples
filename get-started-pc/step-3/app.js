const cko = await CheckoutWebComponents({
  paymentSession,
  publicKey: 'pk_XXXXXXX',
  onPaymentCompleted: async (_self, paymentResponse) => {
    // Handle synchronous payments
    await handlePayment(paymentResponse.id);
  },
});