document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('challengeForm');

    form.addEventListener('submit', (e) => {
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();

        if(!title || title.length < 5) {
            e.preventDefault();
            alert('Title must be atleast 5 characters long.');
            return;
        }
        if (!description || description.length < 10) {
            e.preventDefault();
            alert('Description should be atleast 10 characters long..');
            return;
        }
    });
});