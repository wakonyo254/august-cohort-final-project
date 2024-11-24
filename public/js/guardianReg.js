document.getElementById('parent_register').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (password.length < 5){
        alert('Password should be atleast 5 characters!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    //check the object beign collected
    console.log({name, email, password, confirmPassword})
    //fetch method
    try {
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
                text: "Guardian registered successfully!",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "green",
            }).showToast();
        } else{
            console.log('An error occured during registration!')
            Toastify({
                text: "An error occured during registration. Please try again.",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "red",
            }).showToast();
        }

    } catch(error){
        console.log('gurdian registration error: ', error)
    };

});