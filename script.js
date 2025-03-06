// Dictionary (word -> translation)
const dictionary = {
    сәлем: "привет",
    әлем: "мир",
    алма: "яблоко",
    ит: "собака",
    мысық: "кошка",
    үй: "дом",
    автомобиль: "машина",
    кітап: "книга",
    күн: "солнце",
    ай: "луна",
    ат: "лошадь",
    қой: "овца",
    түлкі: "лиса",
    аю: "медведь",
    қасқыр: "волк",
    қоян: "заяц",
    құс: "птица",
    балық: "рыба",
    тау: "гора",
    өзен: "река",
    теңіз: "море",
    орман: "лес",
    шаңырақ: "небо",
    бұлақ: "родник",
    шағыл: "пляж",
    стакан: "стакан",
    үстел: "стол",
    орындық: "стул",
    телефон: "телефон",
    компьютер: "компьютер",
    дүкен: "магазин"
};
  
  // Get DOM elements
  const wordContainer = document.getElementById("word-container");
  const userInput = document.getElementById("user-input");
  const feedback = document.getElementById("feedback");
  
  // Function to get a random word from the dictionary
  function getRandomWord() {
    const words = Object.keys(dictionary);
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
  
  // Generate a pool of 6 unique random words
  function generateWordPool() {
    const words = [];
    while (words.length < 6) {
      const word = getRandomWord();
      if (!words.includes(word)) {
        words.push(word);
      }
    }
    return words;
  }
  
  // Display words in a row
  function displayWords(words) {
    const wordRow = document.createElement("div");
    wordRow.className = "word-row";
    words.forEach((word, index) => {
      const wordDiv = document.createElement("div");
      wordDiv.className = "word";
      wordDiv.textContent = word;
      if (index === 0) {
        wordDiv.classList.add("active"); // Highlight the first word
      }
      wordRow.appendChild(wordDiv);
    });
    wordContainer.appendChild(wordRow);
  }
  
  // Word pools
  const wordPools = {
    all: Object.keys(dictionary),
    animals: ['ит', 'мысық', 'ат', 'қой', 'түлкі', 'аю', 'қасқыр', 'қоян', 'құс', 'балық'],
    nature: ['күн', 'ай', 'әлем', 'тау', 'өзен', 'теңіз', 'орман', 'шаңырақ', 'бұлақ', 'шағыл'],
    objects: ['үй', 'автомобиль', 'кітап', 'алма', 'стакан', 'үстел', 'орындық', 'телефон', 'компьютер', 'дүкен']
  };
  
  // Generate word pool from selected category
  function generateWordPoolFromSelection(poolType) {
    const words = [];
    const availableWords = wordPools[poolType];
    
    // Если в категории меньше 6 слов, используем все доступные
    if (availableWords.length <= 6) {
        return availableWords;
    }
    
    // Если слов больше 6, выбираем случайные уникальные
    while (words.length < 6) {
        const word = availableWords[Math.floor(Math.random() * availableWords.length)];
        if (!words.includes(word)) {
            words.push(word);
        }
    }
    return words;
  }
  
  // Update word pool based on selection
  function updateWordPool(poolType) {
    const newPool = generateWordPoolFromSelection(poolType);
    
    // Проверяем, что пул не пустой
    if (newPool.length === 0) {
        alert('В этой категории нет слов!');
        return;
    }
    
    wordPool = newPool;
    // Reset game
    wordContainer.innerHTML = '';
    displayWords(wordPool);
    currentWordIndex = 0;
    
    // Убедимся, что первый элемент активен
    if (wordContainer.children[0]) {
        wordContainer.children[0].children[0].classList.add('active');
    }
  }
  
  // Add event listeners for pool buttons
  document.querySelectorAll('.pool-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      document.querySelectorAll('.pool-btn').forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      // Update word pool
      updateWordPool(button.dataset.pool);
    });
  });
  
  // Initialize with all words
  let wordPool = generateWordPoolFromSelection('all');
  displayWords(wordPool);
  
  let currentWordIndex = 0;
  
  // Check user input
  userInput.addEventListener("input", () => {
    const typedText = userInput.value.trim().toLowerCase();
    const currentWord = wordPool[currentWordIndex].toLowerCase();
  
    // Re-add the active class if input is cleared
    if (typedText.length === 0) {
        const wordRow = wordContainer.children[0];
        wordRow.children[currentWordIndex].classList.add("active");
        return;
    }
  
    if (typedText === currentWord) {
        const wordRow = wordContainer.children[0];
        const wordDiv = wordRow.children[currentWordIndex];
        
        // Add translation
        const translationDiv = document.createElement("div");
        translationDiv.className = "translation";
        translationDiv.textContent = dictionary[currentWord];
        wordDiv.appendChild(translationDiv);
  
        // Smooth transition
        requestAnimationFrame(() => {
            translationDiv.style.opacity = "1";
        });
  
        // Move to next word
        currentWordIndex++;
        userInput.value = "";
  
        // Update active word
        if (currentWordIndex < wordPool.length) {
            wordRow.children[currentWordIndex - 1].classList.remove("active");
            wordRow.children[currentWordIndex].classList.add("active");
        }
  
        // When all words are completed
        if (currentWordIndex >= wordPool.length) {
            setTimeout(() => {
                const currentRow = wordContainer.children[0];
                currentRow.style.opacity = '0';
                
                setTimeout(() => {
                    wordContainer.innerHTML = '';
                    wordPool = generateWordPool();
                    displayWords(wordPool);
                    currentWordIndex = 0;
                    
                    const newRow = wordContainer.children[0];
                    newRow.style.opacity = '0';
                    requestAnimationFrame(() => {
                        newRow.style.opacity = '1';
                    });
                }, 300);
            }, 500);
        }
    }
  });
  