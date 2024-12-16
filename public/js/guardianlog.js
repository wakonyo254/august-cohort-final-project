document.getElementById('guardian-login').addEventListener('submit', async(e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
 try{
    const response = await fetch('/healthhero/api/user/parent_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    });
    
  //  const result = await response.json();

    if(response.ok){
        console.log('Guardian successfully login!');
        Toastify({
            text: "Guardian login successfully!",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "green",
        }).showToast();
    } else{
        console.log('An error occured during login!')
        Toastify({
            text: "An error occured during login. Please try again.",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "red",
        }).showToast();
    }

   

} catch(error){
    console.error('Gurdian login error:', error)
};
});