// Function to fetch a random Bible verse from OurManna API
async function fetchRandomVerse() {
    const verseContent = document.getElementById('verse-content');
    const verseReference = document.getElementById('verse-reference');

    try {
        // Show loading state
        verseContent.textContent = 'Loading verse...';
        verseReference.textContent = '';

        const response = await fetch('https://beta.ourmanna.com/api/v1/get?format=json&order=random');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Extract verse details
        const verseText = data.verse.details.text;
        const verseRef = data.verse.details.reference;

        // Update the DOM
        verseContent.textContent = verseText;
        verseReference.textContent = `– ${verseRef}`;
    } catch (error) {
        console.error('Error fetching verse:', error);
        // Fallback to a static verse if the API fails
        verseContent.textContent = '"For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."';
        verseReference.textContent = '– John 3:16';
    }
}

// Run the function when the page loads
window.addEventListener('load', fetchRandomVerse);

// For French, use bible-api.com with Louis Segond translation (lsg)
async function fetchFrenchVerse() {
    // We'll fetch a random chapter/verse? bible-api.com doesn't have random.
    // Alternative: use a static verse in French or a different API.
    // For now, I'll provide a static French verse to keep things simple.
    document.getElementById('verse-content').textContent = '"Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle."';
    document.getElementById('verse-reference').textContent = '– Jean 3:16';
}