
// Game Configuration
// Floating Numbers Animation
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("floating-numbers");

  function createFloatingNumber() {
    const number = document.createElement("div");
    number.classList.add("floating-number");
    number.textContent = Math.floor(Math.random() * 100); // Random number 0-99
    number.style.left = Math.random() * 100 + "vw"; // Random horizontal position
    number.style.animationDuration = (5 + Math.random() * 5) + "s"; // Random speed (5-10s)
    number.style.fontSize = (16 + Math.random() * 16) + "px"; // Random size (16-32px)
    number.style.setProperty("--random-drift", (Math.random() * 100 - 50)); // Random horizontal drift
    
    container.appendChild(number);

    // Remove after animation completes
    setTimeout(() => {
      number.remove();
    }, 15000); // Slightly longer than max animation time
  }

  // Start generating numbers
  setInterval(createFloatingNumber, 500); // New number every 500ms
});

// Game Configuration
const config = {
  phase1: {
    name: "Logo Match",
    items: [
      "<img src='Images/html.png' onerror=\"this.src='placeholder.png'\" alt='HTML5 logo...'>",
      "<img src='Images/css.png' onerror=\"this.src='placeholder.png'\" alt='CSS3 logo...'>",
      "<img src='Images/javascript.png' onerror=\"this.src='placeholder.png'\" alt='JavaScript logo...'>",
      "<img src='Images/python.jpg' onerror=\"this.src='placeholder.png'\" alt='Python logo...'>",
      "<img src='Images/java.jpg' onerror=\"this.src='placeholder.png'\" alt='Java logo...'>", 
      "<img src='Images/cc.png' onerror=\"this.src='placeholder.png'\" alt='C# logo...'>",
      "<img src='Images/c++.png' onerror=\"this.src='placeholder.png'\" alt='C++ logo...'>",
      "<img src='Images/php.png' onerror=\"this.src='placeholder.png'\" alt='PHP logo...'>",
      "<img src='Images/mat.jpg' onerror=\"this.src='placeholder.png'\" alt='MATLAB logo...'>",
      "<img src='Images/mysql.png' onerror=\"this.src='placeholder.png'\" alt='MySQL logo...'>",
      "<img src='Images/ts.png' onerror=\"this.src='placeholder.png'\" alt='TypeScript logo...'>",
      "<img src='Images/swift.png' onerror=\"this.src='placeholder.png'\" alt='Swift logo...'>",
      "<img src='Images/Ruby.jpeg' onerror=\"this.src='placeholder.png'\" alt='Ruby logo...'>",
      "<img src='Images/rust.jpeg' onerror=\"this.src='placeholder.png'\" alt='Rust logo...'>",
      "<img src='Images/kotlin.jpg' onerror=\"this.src='placeholder.png'\" alt='Kotlin logo...'>",
      "<img src='Images/micro.jpeg' onerror=\"this.src='placeholder.png'\" alt='Micro logo...'>",
      "<img src='Images/node.jpeg' onerror=\"this.src='placeholder.png'\" alt='Node.js logo...'>",
      "<img src='Images/perl.jpeg' onerror=\"this.src='placeholder.png'\" alt='Perl logo...'>",
      "<img src='Images/r.jpg' onerror=\"this.src='placeholder.png'\" alt='R logo...'>"
    ]
  },
  phase2: {
    name: "Binary Match",
    items: (() => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 20, 24, 25, 30, 32];
      return numbers.map(num => ({
        decimal: num.toString(),
        binary: num.toString(2).padStart(8, '0')
      }));
    })()
  }
};

// Game State
const state = {
  currentPhase: 1,
  gameMode: 'both', // 'logo', 'binary', or 'both'
  // ... rest of the state remains the same
};

// DOM Elements
const dom = {
  phaseIndicator: document.querySelector('#phase-indicator span'),
  scoreDisplay: document.querySelector('#score-display span'),
  movesDisplay: document.querySelector('#moves'),
  timeDisplay: document.querySelector('#time'),
  messageBox: document.getElementById('message-box'),
  leaderboardModal: document.getElementById('leaderboard-modal'),
  leaderboardResults: document.getElementById('leaderboard-results'),
  phaseTransition: document.getElementById('phase-transition'),
  phaseResults: document.getElementById('phase-results')
};

// Initialize game on window load
window.onload = function() {
  initScreenSize();
  showInstructions();
  setupEventListeners();
};

// Set up event listeners
function setupEventListeners() {
  // Music toggle
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('musicBtn');
  
  musicBtn.addEventListener('click', function() {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.textContent = '🔈 Mute';
    } else {
      bgMusic.pause();
      musicBtn.textContent = '🔇 Unmute';
    }
  });
  
  // Try to autoplay music (may be blocked by browser)
  document.addEventListener('click', function() {
    if (bgMusic.paused) {
      bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, { once: true });
  //quit button
  document.getElementById('quitBtn').addEventListener('click', quitGame);
}

// Initialize screen size
function initScreenSize() {
  const setHeight = () => {
    document.body.style.height = `${window.innerHeight}px`;
    document.getElementById('ol').style.height = `${window.innerHeight}px`;
  };
  
  setHeight();
  window.addEventListener('resize', setHeight);
}

// Show instructions
function showInstructions() {
  $("#ol").html(`
    <div id="inst">
      <h2>MEMORY MASTER</h2>
      <p>Test your memory with these challenging games!</p>
      
      <div class="game-mode-selector">
        <div class="mode-option" onclick="selectMode('logo')">
          <h3>Logo Match</h3>
          <p>Match pairs of programming language logos</p>
        </div>
        <div class="mode-option" onclick="selectMode('binary')">
          <h3>Binary Match</h3>
          <p>Match numbers with their binary equivalents</p>
        </div>
        <div class="mode-option" onclick="selectMode('both')">
          <h3>Dual Challenge</h3>
          <p>Complete both phases back-to-back</p>
        </div>
      </div>

      <div id="difficulty-buttons" style="display: none; margin-top: 30px;">
        <p>Select difficulty:</p>
        <div class="grid-buttons">
          <button onclick="startGame(2, 4, state.gameMode)">Easy (2×4)</button>
          <button onclick="startGame(3, 4, state.gameMode)">Normal (3×4)</button>
          <button onclick="startGame(4, 4, state.gameMode)">Medium (4×4)</button>
          <button onclick="startGame(3, 6, state.gameMode)">Hard (3×6)</button>
          <button onclick="startGame(4, 7, state.gameMode)">Expert (4×7)</button>
        </div>
      </div>
      
      <button onclick="showLeaderboard()" style="margin-top: 20px;">View Leaderboard</button>
    </div>
  `);
}

function selectMode(mode) {
  state.gameMode = mode;
  $("#inst .mode-option").removeClass("selected");
  $(`#inst .mode-option:nth-child(${
    mode === 'logo' ? 1 : mode === 'binary' ? 2 : 3
  })`).addClass("selected");
  $("#difficulty-buttons").fadeIn();
}
// Start the game

 function startGame(rows, cols, mode) {
  resetGame();
  state.gameMode = mode;
  state.gameStarted = true;
  state.totalPairs = (rows * cols) / 2;
  
  // Set timer based on difficulty
  const baseTime = mode === 'both' ? 120 : 90; // Shorter time for single phase
  const timeMultiplier = (rows * cols) / 8;
  state.time = Math.floor(baseTime * timeMultiplier);
  
  updateTimerDisplay();
  startTimer();
  
  // Hide instructions
  $("#ol").fadeOut(500);
  
  // Create the game board for the selected mode
  if (mode === 'logo') {
    createBoard(rows, cols, 1);
    dom.phaseIndicator.textContent = "1/1";
  } else if (mode === 'binary') {
    createBoard(rows, cols, 2);
    dom.phaseIndicator.textContent = "1/1";
  } else {
    createBoard(rows, cols, 1);
    dom.phaseIndicator.textContent = "1/2";
  }
}
  

  
  // Shuffle items
  shuffleArray(items);
  
  // Build the board
  let cardId = 1;
  for (let r = 1; r <= rows; r++) {
    const row = $("<tr>");
    for (let c = 1; c <= cols; c++) {
      const item = items.pop();
      // Inside createBoard function, update the card creation:
const card = $(`
  <td id='card-${cardId}' onclick="handleCardClick(this, ${cardId})">
    <div class='inner'>
      <div class='front'></div>
      <div class='back ${phase === 2 ? 'binary-card' : ''}'>
        ${phase === 1 ? 
          `<div class="image-container">${item}</div>` : 
          `<span>${item.value}</span>`
        }
      </div>
    </div>
  </td>
`);
      
      // Store card data
      card.data('id', cardId);
      card.data('value', phase === 1 ? item : item.value);
      card.data('type', phase === 1 ? 'logo' : item.type);
      card.data('matched', false);
      
      row.append(card);
      cardId++;
    }
    $("table").append(row);
  }
  
  // Update phase indicator
  dom.phaseIndicator.textContent = `${phase}/2`;{
}

// Handle card click
function handleCardClick(cardElement, cardId) {
  if (state.lockBoard || $(cardElement).data('matched')) return;
  
  // Flip the card
  flipCard(cardElement);
  
  if (!state.firstCard) {
    // First card selected
    state.firstCard = cardElement;
  } else {
    // Second card selected
    state.secondCard = cardElement;
    state.moves++;
    dom.movesDisplay.textContent = `Moves: ${state.moves}`;
    checkForMatch();
  }
}

// Flip card animation
function flipCard(cardElement) {
  const $card = $(cardElement);
  if ($card.data('matched')) return;
  
  $card.find('.inner').css('transform', 'rotateY(180deg)');
}

// Flip card back
function unflipCard(cardElement) {
  $(cardElement).find('.inner').css('transform', 'rotateY(0deg)');
}

// Check if cards match
function checkForMatch() {
  state.lockBoard = true;
  
  const isPhase1 = state.currentPhase === 1;
  const card1 = $(state.firstCard);
  const card2 = $(state.secondCard);
  
  let match = false;
  
  if (isPhase1) {
    // Phase 1: Compare image HTML
    match = card1.data('value') === card2.data('value');
  } else {
    // Phase 2: Check if decimal matches binary
    const decimalCard = card1.data('type') === 'decimal' ? card1 : card2;
    const binaryCard = card1.data('type') === 'binary' ? card1 : card2;
    
    // Convert binary to decimal and compare
    const decimalValue = parseInt(decimalCard.data('value'), 10);
    const binaryValue = parseInt(binaryCard.data('value'), 2);
    
    match = decimalValue === binaryValue;
  }
  
  if (match) {
    // Cards match
    handleMatch();
  } else {
    // Cards don't match
    handleMismatch();
  }
}

// Handle matching cards
function handleMatch() {
  $(state.firstCard).data('matched', true);
  $(state.secondCard).data('matched', true);
  
  // Add match animation
  $(state.firstCard).find('.inner').addClass('matched');
  $(state.secondCard).find('.inner').addClass('matched');
  //timeout 
  setTimeout(() => {
  $(state.firstCard).find('.inner').removeClass('matched');
  $(state.secondCard).find('.inner').removeClass('matched');
}, 1000);

  // Update score
  state.matchedPairs++;
  updateScore(10); // Points per match
  
  // Check if phase is complete
  if (state.matchedPairs === state.totalPairs) {
    phaseComplete();
  }
  
  resetTurn();
}

// Handle mismatched cards
function handleMismatch() {
  // Add shake animation
  $(state.firstCard).find('.inner').addClass('mismatch');
  $(state.secondCard).find('.inner').addClass('mismatch');
  
  setTimeout(() => {
    unflipCard(state.firstCard);
    unflipCard(state.secondCard);
    
    // Remove animations
    $(state.firstCard).find('.inner').removeClass('mismatch');
    $(state.secondCard).find('.inner').removeClass('mismatch');
    
    resetTurn();
  }, 1000);
}

// Reset turn state
function resetTurn() {
  setTimeout(() => {
    state.firstCard = null;
    state.secondCard = null;
    state.lockBoard = false;
  }, 500);
}

// Update score
function updateScore(points) {
  state.score += points;
  dom.scoreDisplay.textContent = state.score;
}

// Start timer
function startTimer() {
  clearInterval(state.timerInterval);
  
  state.timerInterval = setInterval(() => {
    state.time--;
    updateTimerDisplay();
    
    if (state.time <= 0) {
      clearInterval(state.timerInterval);
      gameOver(false);
    }
  }, 1000);
}

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(state.time / 60);
  const seconds = state.time % 60;
  dom.timeDisplay.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Phase complete
function phaseComplete() {
  clearInterval(state.timerInterval);
  
  // Calculate phase score (bonus for remaining time)
  const timeBonus = Math.floor(state.time / 5);
  updateScore(timeBonus);
  
  if (state.gameMode === 'both' && state.currentPhase === 1) {
    // Show phase transition for dual challenge
    dom.phaseResults.innerHTML = `
      <h3>Phase 1 Complete!</h3>
      <p>Moves: ${state.moves}</p>
      <p>Time Bonus: +${timeBonus} points</p>
      <p>Total Score: ${state.score}</p>
    `;
    $("#phase-transition").fadeIn();
  } else {
    // Game complete for single phase or final phase of dual challenge
    gameOver(true);
  }
}
// Start next phase
function startNextPhase() {
  state.currentPhase = 2;
  state.matchedPairs = 0;
  state.moves = 0;
  dom.movesDisplay.textContent = `Moves: 0`;
  
  // Reset timer with new time
  const rows = $("table tr").length;
  const cols = $("table tr:first td").length;
  const timeMultiplier = (rows * cols) / 8;
  state.time = Math.floor(120 * timeMultiplier);
  
  updateTimerDisplay();
  startTimer();
  
  // Create phase 2 board
  createBoard(rows, cols, 2);
  
  // Hide transition screen
  $("#phase-transition").fadeOut();
}

// Game over
function gameOver(isWin) {
  if (isWin) {
    // Calculate final score
    const timeBonus = Math.floor(state.time / 5);
    updateScore(timeBonus);
    
    // Save to leaderboard
    saveToLeaderboard();
    
    // Show win message
    showMessage(
      "🎉 Congratulations! 🎉",
      `You completed both phases!<br><br>
      Final Score: ${state.score}<br>
      Total Moves: ${state.moves}<br><br>
      <button onclick="showLeaderboard()">View Leaderboard</button>
      <button onclick="location.reload()">Play Again</button>`
    );
  } else {
    // Show lose message
    showMessage(
      "⏰ Time's Up!",
      `You didn't complete the phase in time.<br><br>
      Score: ${state.score}<br>
      <button onclick="location.reload()">Try Again</button>`
    );
  }
}
// Create game board
function createBoard(rows, cols, phase) {
  $("table").html("");
  
  let items = [];
  if (phase === 1) {
    // Phase 1: Programming logos
    items = [...config.phase1.items].slice(0, state.totalPairs);
    items = [...items, ...items]; // Duplicate for pairs
  } else {
    // Phase 2: Binary numbers
    const binaryItems = [...config.phase2.items].slice(0, state.totalPairs);
    binaryItems.forEach(item => {
      items.push({ type: 'decimal', value: item.decimal });
      items.push({ type: 'binary', value: item.binary });
    });
  }
  
  // Shuffle items
  shuffleArray(items);
  
  // Build the board
  let cardId = 1;
  for (let r = 1; r <= rows; r++) {
    const row = $("<tr>");
    for (let c = 1; c <= cols; c++) {
      const item = items.pop();
      const card = $(`
        <td id='card-${cardId}' onclick="handleCardClick(this, ${cardId})">
          <div class='inner'>
            <div class='front'></div>
            <div class='back ${phase === 2 ? 'binary-card' : ''}'>
              ${phase === 1 ? item : `<span>${item.value}</span>`}
            </div>
          </div>
        </td>
      `);
      
      // Store card data
      card.data('id', cardId);
      card.data('value', phase === 1 ? item : item.value);
      card.data('type', phase === 1 ? 'logo' : item.type);
      card.data('matched', false);
      
      row.append(card);
      cardId++;
    }
    $("table").append(row);
  }
}

// Show message
function showMessage(title, content) {
  dom.messageBox.innerHTML = `
    <h2>${title}</h2>
    <div>${content}</div>
  `;
  dom.messageBox.style.display = 'block';
}

// Reset game state
function resetGame() {
  clearInterval(state.timerInterval);
  
  state.currentPhase = 1;
  state.score = 0;
  state.moves = 0;
  state.matchedPairs = 0;
  state.totalPairs = 0;
  state.firstCard = null;
  state.secondCard = null;
  state.lockBoard = false;
  state.gameMode = 'both'; // Reset to default
  
  dom.scoreDisplay.textContent = '0';
  dom.movesDisplay.textContent = 'Moves: 0';
  dom.phaseIndicator.textContent = '1/2';
}

// Shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Leaderboard functions
function saveToLeaderboard() {
  const playerName = prompt("Enter your name for the leaderboard:", "Player");
  if (!playerName) return;
  
  const entry = {
    name: playerName,
    score: state.score,
    moves: state.moves,
    date: new Date().toLocaleDateString()
  };
  
  let leaderboard = JSON.parse(localStorage.getItem('memoryMasterLeaderboard') || '[]');
  leaderboard.push(entry);
  
  // Sort by score (descending)
  leaderboard.sort((a, b) => b.score - a.score);
  
  // Keep only top 10
  if (leaderboard.length > 10) {
    leaderboard = leaderboard.slice(0, 10);
  }
  
  localStorage.setItem('memoryMasterLeaderboard', JSON.stringify(leaderboard));
}

function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('memoryMasterLeaderboard')) || [];
  
  let html = '<div class="leaderboard-header">';
  html += '<span>Rank</span><span>Name</span><span>Score</span><span>Moves</span>';
  html += '</div>';
  
  if (leaderboard.length === 0) {
    html += '<p>No entries yet. Be the first!</p>';
  } else {
    leaderboard.forEach((entry, index) => {
      html += `
        <div class="leaderboard-entry">
          <span>${index + 1}</span>
          <span>${entry.name}</span>
          <span>${entry.score}</span>
          <span>${entry.moves}</span>
        </div>
      `;
    });
  }
  
  dom.leaderboardResults.innerHTML = html;
  dom.leaderboardModal.style.display = 'flex';
}

function closeLeaderboard() {
  dom.leaderboardModal.style.display = 'none';
}

// Quit game
function quitGame() {
  if (confirm("Are you sure you want to quit?")) {
    resetGame();
    $("table").html("");
    $("#ol").fadeIn(500); // Show the instruction overlay
    $("#message-box").hide(); // Hide any message box
    $("#phase-transition").hide(); // Hide phase transition if visible
    $("#leaderboard-modal").hide(); // Hide leaderboard if visible
  }
}

// Expose functions to global scope
window.startGame = startGame;
window.handleCardClick = handleCardClick;
window.startNextPhase = startNextPhase;
window.showLeaderboard = showLeaderboard;
window.closeLeaderboard = closeLeaderboard;
window.quitGame = quitGame;