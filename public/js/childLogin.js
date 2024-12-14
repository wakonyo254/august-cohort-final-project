document.getElementById('childLogin').addEventListener('submit', async(e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/healthhero/api/user/child_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    });
    
    const result = await response.json();


    if(!response.ok){
        alert(result.message);
         window.location.href= '/healthhero/api/user/childdash'
    } else {
        alert(result.message);
        document.getElementById('childLogin').reset();
    }
})