// Search functionality for filtering command cards

function initSearch() {
    const input = document.getElementById('search-input');
    const container = document.getElementById('commands-container');

    if (!input || !container) {
        return;
    }

    const cards = () => Array.from(container.querySelectorAll('.command-card'));

    const filter = () => {
        const query = input.value.trim().toLowerCase();
        const items = cards();

        if (!query) {
            items.forEach(card => (card.style.display = ''));
            return;
        }

        let anyVisible = false;

        items.forEach(card => {
            const text = (card.dataset.name || card.textContent || '').toLowerCase();
            const matches = text.includes(query);
            card.style.display = matches ? '' : 'none';
            if (matches) {
                anyVisible = true;
            }
        });

        const noResultsId = 'search-no-results';
        let noResults = document.getElementById(noResultsId);
        if (!anyVisible) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.id = noResultsId;
                noResults.className = 'section';
                noResults.innerHTML = '<p>No commands match your search. Try another keyword.</p>';
                container.parentElement?.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    };

    input.addEventListener('input', filter);

    input.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            input.value = '';
            filter();
        }
    });
}
