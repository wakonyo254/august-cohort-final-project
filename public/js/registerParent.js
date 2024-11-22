document.getElementById('parent_register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');

    if (password < 5){
        alert('Password should be atleast 5 characters!')
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!')
    }

    //check the object beign collected
    console.log({name, email, password, confirmPassword})
    //fetch method
    const response = await fetch('/healthhero/api/user/parent_register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, email: email, password: password})
    });
  //use the console to display any errors and toastify library to display to the user
    if(response.ok){
        console.log('Guardian successfully registered!');
        Toastify({
            text: "Registered successfully!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "green",
        }).showToast();
    } else{
        console.log('An error occured during registration!')
        Toastify({
            text: "An error occured during registration. Please try again.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "red",
        }).showToast();
    }


})