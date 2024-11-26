document.getElementById('adminLogin').addEventListener('submit', async function (e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!email || !password) {
        alert('Please fill out all fields.');
        return;
    }

    const response = await fetch('/healthhero/api/user/adminLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    });
    if(!response.ok){
        alert('An error occured during login. Please try again later');
    }
})