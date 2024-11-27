document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const section = event.target.dataset.section;

        document.querySelectorAll('.section').forEach(div => {
            div.classList.add('hidden');
        });

        document.getElementById(section).classList.remove('hidden');
    });
});

//add admin
document.getElementById('addAdminForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('adminName').value;
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    const response = await fetch('/addAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password}),
    });

    if(response.ok){
        alert('Admin added successfully!');
        e.target.reset();
    } else {
        alert('Error adding admin');
    }
});

document.getElementById('createChallengeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = documnet.getElementById('challengeTitle').value;
    const description = document.getElementById('challengeDescription').value;
    const status = document.getElementById('challengeStatus').value;

    const response = await fetch('/adminChallengeAdd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, description: description, status: status}),
    });
    if(response.ok) {
        alert('Challenge created successfully!');
        e.target.reset();
    } else {
        alert('Error adding a challange!')
    }
});

//log fetch
async function fetchLogs() {
    const response = await fetch('/adminLogin');
    const logs = await response.json();

    const logsContainer = document.getElementById('logsContainer');
    logsContainer.innerHTML = '';

    logs.forEach(log => {
        const logItem = document.createElement('div');
        logItem.textContent = log;
        logsContainer.appendChild(logItem);
    });
}
fetchLogs();