document.getElementById('addChallengeForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    try {
        const response = await fetch('/healthhero/api/user/addChallenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, status })
        });

        const result = await response.json();

        if (response.status === 200) {
            // Reset input fields to blank
            document.getElementById('addChallengeForm').reset();

            // success message
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('successMessage').textContent = result.message;

            // success message to disappaer after 3 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
