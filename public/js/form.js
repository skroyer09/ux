document.getElementById('contactForm').addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('txtName').value;
    const email = document.getElementById('txtEmail').value; 
    const message = document.getElementById('txtMessage').value;

    document.getElementById('result').textContent = `Name: ${name} Email:${email} Message: ${message}`;
});