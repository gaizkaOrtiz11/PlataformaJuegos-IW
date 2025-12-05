// ==========================================
// CARGAR Y PARSEAR CSV
// ==========================================
async function loadCSV(filepath) {
    try {
        const response = await fetch(filepath);
        const csvText = await response.text();
        
        // Dividir en líneas y obtener headers
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        // Procesar cada línea de datos
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
        
    } catch (error) {
        console.error(`Error cargando ${filepath}:`, error);
        return [];
    }
}

// ==========================================
// FORMATEAR NÚMEROS
// ==========================================
function formatNumber(num) {
    const number = parseInt(num);
    if (isNaN(number)) return num;
    
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    
    return number.toString();
}

// ==========================================
// CREAR HTML - JUEGOS EN TENDENCIA
// ==========================================
function createTrendingGameHTML(game) {
    return `
            <div class="div_juegos_tendencia">
                <div class="thumb">
                    <a href="#">
                        <img src="${game.picture}" 
                             alt="${game.title}" 
                             onerror="this.src='/static/assets/images/trending-01.jpg'">
                    </a>
                    <span class="rank-badge-trending">#${game.rank}</span>
                </div>
                <div class="down-content">
                    <h4>${game.title}</h4>
                </div>
            </div>
    `;
}

// ==========================================
// CREAR HTML - JUEGOS MÁS JUGADOS
// ==========================================
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

// ==========================================
// CARGAR JUEGOS EN TENDENCIA
// ==========================================
async function loadTrendingGames() {
    console.log(' Cargando juegos en tendencia...');
    
    const games = await loadCSV('/static/scrap/trending_games.csv');
    const container = document.getElementById('trending-games-container');
    
    if (!container) {
        console.error(' Contenedor "trending-games-container" no encontrado');
        return;
    }
    
    if (games.length === 0) {
        container.innerHTML = '<div class="col-12"><p>No se pudieron cargar los juegos en tendencia</p></div>';
        return;
    }
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Agregar cada juego
    games.forEach(game => {
        container.insertAdjacentHTML('beforeend', createTrendingGameHTML(game));
    });
    
    console.log(` ${games.length} juegos en tendencia cargados`);
}

// ==========================================
// CARGAR JUEGOS MÁS JUGADOS
// ==========================================
async function loadMostPlayedGames() {
    console.log(' Cargando juegos más jugados...');
    
    const games = await loadCSV('/static/scrap/top6_steamcharts.csv');
    const container = document.getElementById('most-played-games-container');
    
    if (!container) {
        console.error(' Contenedor "most-played-games-container" no encontrado');
        return;
    }
    
    if (games.length === 0) {
        container.innerHTML = '<div class="col-12"><p>No se pudieron cargar los juegos más jugados</p></div>';
        return;
    }
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Agregar los primeros 6 juegos
    games.slice(0, 6).forEach(game => {
        container.insertAdjacentHTML('beforeend', createMostPlayedGameHTML(game));
    });
    
    console.log(`✅ ${Math.min(games.length, 6)} juegos más jugados cargados`);
}

// ==========================================
// INICIALIZAR AL CARGAR LA PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando carga de juegos...');
    loadTrendingGames();
    loadMostPlayedGames();
});