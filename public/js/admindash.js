document.getElementById('addAdminForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/healthhero/api/user/addAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();

        if (response.status === 200) {
            document.getElementById('addAdminForm').reset();
            alert(result.message); // Success mesg
           
        } else {
            alert(result.message); // Error mesg
            document.getElementById('addAdminForm').reset();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});
