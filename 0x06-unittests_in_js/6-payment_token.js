function getPaymentTokenFromAPI (success) {
  if (success) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: 'Successful response from the API' });
      }, 1000);
    });
  } else {
    return Promise.resolve();
  }
}

module.exports = getPaymentTokenFromAPI;
