/* global CheckoutWebComponents */
(async () => {
  const order = await fetch('/order', { method: 'POST' });
  const paymentSession = await order.json();

  const checkoutWebComponents = await CheckoutWebComponents({
    publicKey: 'pk_sbox_...',
    environment: 'sandbox',
    locale: 'en-GB',
    paymentSession,
    onReady: () => {
      console.log('onReady');
    },
    onPaymentCompleted: (component, paymentResponse) => {
      const element = document.getElementById('successful-payment-message');

      element.innerHTML = `
          ${component.name} completed <br>
          Your payment id is: <span class="payment-id">${paymentResponse.id}</span>
        `;
    },
    onChange: (component) => {
      console.log('onChange', 'isValid: ', component.isValid(), ' for ', component.type);
    },
    onError: (component, error) => {
      const element = document.getElementById('error-message');

      element.innerHTML = `
          ${component.name} error <br>
          Error occurred: <pre class="error-object">${error}</pre>
        `;
    },
  });

  const payments = checkoutWebComponents.create('payments');

  payments.mount(document.getElementById('payments'));
})();