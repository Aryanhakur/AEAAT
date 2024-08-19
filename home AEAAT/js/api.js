document.querySelectorAll('.service button').forEach(button => {
    button.addEventListener('click', function() {
        const serviceType = this.parentElement.querySelector('h3').textContent;
        const serviceId = this.parentElement.id;
        const customerName = prompt('Enter your name:');
        const address = prompt('Enter your address:');
        const appointmentDateTime = prompt('Enter appointment date and time:');

        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serviceId, serviceType, customerName, address, appointmentDateTime })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Order placed successfully!');
            } else {
                alert('Failed to place order.');
            }
        });
    });
});
