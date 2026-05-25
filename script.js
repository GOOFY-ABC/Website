let indexData = [];

// Load the search index
fetch('search-index.json')
  .then(res => res.json())
  .then(data => indexData = data)
  .catch(err => console.error("Error loading search index:", err));

// Handle search input
document.getElementById('searchBox').addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();
  const resultsContainer = document.getElementById('results');

  if (!query) {
    resultsContainer.innerHTML = '';
    return;
  }

  const results = indexData.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.content.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  resultsContainer.innerHTML = results
    .map(r => `<p><a href="${r.url}"><strong>${r.title}</strong></a><br>${r.content}</p>`)
    .join('');
});
