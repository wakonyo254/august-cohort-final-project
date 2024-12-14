
footer.innerHTML = `<p style="position: fixed; bottom: 0; width: 100%; text-align: center;" class="text-center">Copyright 2024. All rights reserved.</p>` 
 
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
        
        const result = await response.json();

       
       if(response.ok){
        alert(result.message);
        document.getElementById('child_register').reset();
         window.location.href= '/healthhero/api/user/childdash'
       } else{
        alert(result.message);
        document.getElementById('child_register').reset();
       }
        
    } catch(error){
        console.error('An error occured during registration!', error);
        alert('An error occered while registering young hero!!');
    }
  
    });  

    