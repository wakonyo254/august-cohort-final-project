const footer = document.getElementById('footer');
const header = document.getElementById('header');
header.append("this is the header section");
// const date = Date()
// date.now().getFullYear()
footer.innerHTML = `<p style="position: fixed; bottom: 0; width: 100%; " class="text-center">Copyright 2024. All rights reserved.</p>` 
 
document.getElementById('child_register').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    

    if(password.length < 5){
      alert("Password should be atleast 5 characters!")  
    }
    if(password !== confirm_password){
        alert('passwords do not match!')
    }
    try {
        const response = await fetch('/healthhero/api/user/child_register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({first_name: first_name, last_name: last_name, email: email, dob: dob, password: password})
        });
       // if(!response.ok) throw new Error('Ooops! an error occured. Please try again');
       if(response.ok){
        alert("Young Hero Registered successfully!")
       } else{
        alert('An error occured! Please try again later.');
       }
        
    } catch(error){
        console.error('An error occured during registration!', error);
        
    }
    })  

    