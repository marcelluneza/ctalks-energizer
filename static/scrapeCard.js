document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchWord = document.getElementById('word').value.toLowerCase().trim();

    let found = false;
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardWord = card.querySelector('h3').textContent;

        if (cardWord === searchWord) {
            card.classList.replace("covered", "uncovered");
            found = true;
        }
    });

    if (!found) {
        document.getElementById('no-result').classList.remove('hidden');
        setTimeout(function () {
            document.getElementById('no-result').classList.add('hidden');

        }, 2000);

    }
});