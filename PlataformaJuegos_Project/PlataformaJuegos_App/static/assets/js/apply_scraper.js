async function loadCSV(filepath) {
    try {
        // Get CSV
        const response = await fetch(filepath);
        const csvText = await response.text();
        
        // Get data
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        // Process data
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const obj = {};
            
            headers.forEach((header, index) => {
                obj[header] = values[index];
            });
            
            data.push(obj);
        }
        return data;
    
    // If the path is wrong
    } catch (error) {
        console.error(`Error cargando ${filepath}:`, error);
        return [];
    }
}


function formatNumber(num) {
    const number = parseInt(num);  // Convert string to int
    // Turn 1.000.0000 to 1M
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    // Turn 100.000 to 100K
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
}


// Create the HTML section for the mobile trending games
function createTrendingGameHTML(game) {
    return `
            <div class="div_juegos_tendencia">
                <div class="thumb">
                    <a href="{% url 'https://42matters.com/most-popular-mobile-games-spain' %}"> <img src="${game.picture}" alt="${game.title}"> </a>
                    <span class="rank-badge-trending">#${game.rank}</span>
                </div>
                <div class="down-content">
                    <h4>${game.title}</h4>
                </div>
            </div>
    `;
}

// Load trending games
async function loadTrendingGames() {
    
    const games = await loadCSV('/static/scrap/trending_games.csv');  // Load games
    const container = document.getElementById('trending-games-container');  // Get container

    // Error if there aren't any games
    if (games.length === 0) {
        container.innerHTML = '<div class="col-12"><p>No se han podido cargar los datos</p></div>';
        return;
    }
    
    // Error if there isn't a container
    if (!container) {
        console.error('Contenedor "trending-games-container" no encontrado');
        return;
    }
    
    // Add games (this was AI generated)
    container.innerHTML = '';
    games.forEach(game => {
        container.insertAdjacentHTML('beforeend', createTrendingGameHTML(game));
    });
}


// Create the HTML section for the Steam's most played games
function createMostPlayedGameHTML(game) {
    return `
            <div class="item">
                <div class="thumb">
                    <span class="rank-badge">#${game.rank}</span>
                </div>
                <div class="down-content">
                    <h4>${game.title}</h4>
                    <div class="stats">
                        <span class="stat-item">
                            <i class="fa fa-users"></i> ${formatNumber(game.current_players)} jugadores actualmente
                        </span>
                        <span class="stat-item">
                            <i class="fa fa-clock-o"></i> ${formatNumber(game.player_hours)} horas jugadas
                        </span>
                    </div>
                </div>
            </div>
    `;
}

// Load most played games
async function loadMostPlayedGames() {
    
    const games = await loadCSV('/static/scrap/top6_steamcharts.csv');  // Load games
    const container = document.getElementById('most-played-games-container');  // Get container

    // Error if there aren't any games
    if (games.length === 0) {
        container.innerHTML = '<div class="col-12"><p>No se han podido cargar los datos</p></div>';
        return;
    }

    // Error if there isn't a container
    if (!container) {
        console.error(' Contenedor "most-played-games-container" no encontrado');
        return;
    }
    
    // Add games (this was AI generated)
    container.innerHTML = '';
    games.slice(0, 6).forEach(game => {
        container.insertAdjacentHTML('beforeend', createMostPlayedGameHTML(game));
    });
}


// Initialize when loading the web
document.addEventListener('DOMContentLoaded', function() {
    loadTrendingGames();
    loadMostPlayedGames();
});