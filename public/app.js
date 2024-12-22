document.getElementById('timestamp-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const dateInput = document.getElementById('date-input').value;
    const resultDiv = document.getElementById('result');

    try {
        // Call the backend API
        const response = await fetch(`/routes/${dateInput}`);
        const data = await response.json();

        // Display the result
        if (data.error) {
            resultDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `
                <p><strong>Unix:</strong> ${data.unix}</p>
                <p><strong>UTC:</strong> ${data.utc}</p>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: Could not fetch timestamp</p>`;
        console.error(error);
    }
});
