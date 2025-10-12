// Send form to Formspree and show confirmation
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = this;
  const submitButton = document.getElementById('submit-button');
  const responseMessage = document.getElementById('response-message');
  const formData = new FormData(form);

  // Disable button and show sending message
  submitButton.disabled = true;
  submitButton.innerText = 'Sending...';
  responseMessage.innerText = '';
  responseMessage.style.color = '#999A9B';

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      responseMessage.innerText = "Thanks! Your message has been sent.";
      responseMessage.style.color = '#0f0'; // Green for success
      form.reset();
    } else {
      responseMessage.innerText = "Oops! Something went wrong. Please try again.";
      responseMessage.style.color = '#f00'; // Red for error
    }
  }).catch(() => {
    responseMessage.innerText = "Error sending message. Please check your connection.";
    responseMessage.style.color = '#f00'; // Red for error
  }).finally(() => {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.innerText = 'Send';
  });
});
