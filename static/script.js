document.getElementById('runButton').addEventListener('click', function () {
    // Send GET request to Flask route to run Python code
    fetch('/run_code')
        .then(response => response.json())
        .then(data => {
            // Clear the current cards
            const cardContainer = document.getElementById('cardContainer');
            cardContainer.innerHTML = '';

            // Loop through the returned data and create a card for each word
            resultt = Object.entries(data.result)
            sorted_result = resultt.sort(function (a, b) {
                return b[1] - a[1];  // Compare the second elements (the numbers)
            });

            for (const [word, count] of sorted_result) {
                const card = document.createElement('div');
                card.className = 'card';

                // Add word and count to the card
                const wordElement = document.createElement('h3');
                wordElement.innerText = word;
                const countElement = document.createElement('p');
                countElement.innerText = `Count: ${count}`;

                // Append word and count to the card
                card.appendChild(wordElement);
                card.appendChild(countElement);

                // Append the card to the container
                cardContainer.appendChild(card);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
