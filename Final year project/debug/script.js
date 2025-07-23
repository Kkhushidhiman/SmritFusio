// Timer functionality
let timerInterval;
let seconds = 0;
const timerDisplay = document.getElementById('timer');
const startTimerBtn = document.getElementById('start-timer');
const resetTimerBtn = document.getElementById('reset-timer');

function formatTime(secs) {
  const minutes = Math.floor(secs / 60);
  const remainingSeconds = secs % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      seconds++;
      timerDisplay.textContent = formatTime(seconds);
    }, 1000);
    startTimerBtn.textContent = 'Pause';
    startTimerBtn.classList.add('active');
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    startTimerBtn.textContent = 'Resume';
    startTimerBtn.classList.remove('active');
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = 0;
  timerDisplay.textContent = formatTime(seconds);
  startTimerBtn.textContent = 'Start';
  startTimerBtn.classList.add('active');
}

startTimerBtn.addEventListener('click', startTimer);
resetTimerBtn.addEventListener('click', resetTimer);

// Game logic with complete snippets for all languages
const snippetsByLang = {
  html: [
    {
      code: [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '  <title>My Page</title>',
        '</head>',
        '<body>',
        '  <h1>Welcome</h1>',
        '  <img scr="logo.png" alt="Logo">',
        '</body>',
        '</html>'
      ],
      bugLine: 7,
      explanation: "The 'scr' attribute in the img tag is misspelled. It should be 'src'."
    },
    {
      code: [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '  <meta charset="UTF-8">',
        '  <title>Document</title>',
        '</head>',
        '<body>',
        '  <div class="container">',
        '    <p>Hello world</p>',
        '  <div>',
        '</body>',
        '</html>'
      ],
      bugLine: 9,
      explanation: "The closing div tag is missing a forward slash. It should be '</div>'."
    },
    {
      code: [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '  <link rel="stylesheet" href="styles.css">',
        '</head>',
        '<body>',
        '  <a href="https://example.com" target="blank">Example</a>',
        '  <ul>',
        '    <li>Item 1<li>',
        '    <li>Item 2</li>',
        '  </ul>',
        '</body>',
        '</html>'
      ],
      bugLine: 8,
      explanation: "The first li tag is not properly closed. It should be '</li>'."
    },
    {
      code: [
        '<!DOCTYPE html>',
        '<html>',
        '<body>',
        '  <form action="/submit" method="post">',
        '    <input type="text" name="username">',
        '    <input type="submit" value="Send">',
        '  </form>',
        '</body>',
        '</html>'
      ],
      bugLine: 5,
      explanation: "The submit input is missing a closing quote for the type attribute."
    },
    {
      code: [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '  <style>',
        '    .box {',
        '      width: 100px;',
        '      height: 100px;',
        '      background-color: red;',
        '    }',
        '  </style>',
        '</head>',
        '<body>',
        '  <div class="box"></div>',
        '</body>',
        '</html>'
      ],
      bugLine: 12,
      explanation: "The div tag has an extra quote mark after the class name."
    }
  ],
  css: [
    {
      code: [
        'body {',
        '  font-family: Arial, sans-serif;',
        '  margin: 0;',
        '  padding: 0;',
        '  background-color: #f4f4f4;',
        '}',
        '',
        '.container {',
        '  width: 80%;',
        '  margin: auto;',
        '  overflow: hidden;',
        '}',
        '',
        '#header {',
        '  background: #333;',
        '  color: white;',
        '  padding: 10px;',
        '  border-radius: 5px',
        '}'
      ],
      bugLine: 16,
      explanation: "Missing semicolon at the end of the border-radius property."
    },
    {
      code: [
        '.button {',
        '  display: inline-block;',
        '  padding: 10px 20px;',
        '  background-color: blue;',
        '  color: white;',
        '  text-decoration: none;',
        '  border-radius: 5px;',
        '  transition: background-color 0.3s ease;',
        '}',
        '',
        '.button:hover {',
        '  background-color: darkblue;',
        '  cursor: point;',
        '}'
      ],
      bugLine: 12,
      explanation: "The cursor value 'point' is invalid. It should be 'pointer'."
    },
    {
      code: [
        '@media screen and (max-width: 600px) {',
        '  .sidebar {',
        '    display: none;',
        '  }',
        '  .main-content {',
        '    width: 100%',
        '  }',
        '  .mobile-menu {',
        '    display: block;',
        '  }',
        '}'
      ],
      bugLine: 5,
      explanation: "Missing semicolon after the width property."
    },
    {
      code: [
        '.card {',
        '  width: 300px;',
        '  height: 200px;',
        '  background: linear-gradient(to bottom, #ff0000, #0000ff);',
        '  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);',
        '  border-radius: 10px;',
        '  margin: 20px;',
        '  padding 15px;',
        '}'
      ],
      bugLine: 8,
      explanation: "Missing colon after the padding property."
    },
    {
      code: [
        'ul {',
        '  list-style-type: none;',
        '  margin: 0;',
        '  padding: 0;',
        '}',
        '',
        'ul li {',
        '  display: inline-block;',
        '  margin-right: 10px;',
        '}',
        '',
        'ul li a {',
        '  text-decoration: none;',
        '  color: #333;',
        '  font-weight: bold;',
        '  font-size 16px;',
        '}'
      ],
      bugLine: 14,
      explanation: "Missing colon after the font-size property."
    }
  ],
  js: [
    {
      code: [
        'function calculateTotal(price, quantity) {',
        '  const total = price * quantity;',
        '  return total;',
        '}',
        '',
        'function applyDiscount(total) {',
        '  if (total > 100) {',
        '    return total * 0.9;',
        '  } else {',
        '    retun total;',
        '  }',
        '}'
      ],
      bugLine: 9,
      explanation: "Misspelled 'return' keyword as 'retun'."
    },
    {
      code: [
        'const user = {',
        '  name: "John",',
        '  age: 30,',
        '  email: "john@example.com",',
        '  hobbies: ["reading", "swimming"]',
        '};',
        '',
        'console.log(user.hobbies.lenght);'
      ],
      bugLine: 8,
      explanation: "Misspelled 'length' property as 'lenght'."
    },
    {
      code: [
        'const numbers = [1, 2, 3, 4, 5];',
        '',
        'function sumArray(arr) {',
        '  let sum = 0;',
        '  for (let i = 0; i <= arr.length; i++) {',
        '    sum += arr[i];',
        '  }',
        '  return sum;',
        '}'
      ],
      bugLine: 4,
      explanation: "The loop condition should be i < arr.length to avoid an off-by-one error."
    },
    {
      code: [
        'document.addEventListener("DOMContentLoaded", function() {',
        '  const button = document.getElementById("myButton");',
        '  button.addEventListner("click", handleClick);',
        '});'
      ],
      bugLine: 3,
      explanation: "Misspelled 'addEventListener' as 'addEventListner'."
    },
    {
      code: [
        'function fetchData(url) {',
        '  fetch(url)',
        '    .then(response => response.json())',
        '    .then(data => {',
        '      console.log(data);',
        '    })',
        '    .catch(error => {',
        '      console.error("Error:", eror);',
        '    });',
        '}'
      ],
      bugLine: 8,
      explanation: "Misspelled 'error' variable as 'eror' in the catch block."
    }
  ],
  python: [
    {
      code: [
        'def calculate_average(numbers):',
        '    total = sum(numbers)',
        '    count = len(numbers)',
        '    average = total / count',
        '    return averge',
        '',
        'nums = [10, 20, 30, 40, 50]',
        'print(calculate_average(nums))'
      ],
      bugLine: 4,
      explanation: "Misspelled 'average' as 'averge' in the return statement."
    },
    {
      code: [
        'class Person:',
        '    def __init__(self, name, age):',
        '        self.name = name',
        '        self.age = age',
        '    ',
        '    def greet(self):',
        '        print(f"Hello, my name is {self.name} and I am {self.age} years old")',
        '',
        'person = Person("Alice", 25)',
        'person.age = "30"',
        'print(person.age)'
      ],
      bugLine: 9,
      explanation: "Assigning a string to age when it should be a number (no quotes around 30)."
    },
    {
      code: [
        'def fibonacci(n):',
        '    if n <= 0:',
        '        return []',
        '    elif n == 1:',
        '        return [0]',
        '    elif n == 2:',
        '        return [0, 1]',
        '    else:',
        '        sequence = [0, 1]',
        '        for i in range(2, n):',
        '            sequence.append(sequence[i-1] + sequence[i-2]',
        '        return sequence'
      ],
      bugLine: 10,
      explanation: "Missing closing parenthesis in the sequence.append line."
    },
    {
      code: [
        'try:',
        '    result = 10 / 0',
        '    print(result)',
        'except:',
        '    print("An error occured")'
      ],
      bugLine: 4,
      explanation: "Bare except clause should specify the exception type."
    },
    {
      code: [
        'def greet(name):',
        '    print("Hello, " + name',
        '',
        'greet("Alice")'
      ],
      bugLine: 2,
      explanation: "Missing closing parenthesis in the print statement."
    }
  ],
  java: [
    {
      code: [
        'public class Main {',
        '    public static void main(String[] args) {',
        '        int x = 5;',
        '        int y = 10;',
        '        int sum = x + y',
        '        System.out.println("Sum: " + sum);',
        '    }',
        '}'
      ],
      bugLine: 5,
      explanation: "Missing semicolon at the end of the statement."
    },
    {
      code: [
        'import java.util.ArrayList;',
        '',
        'public class ShoppingCart {',
        '    private ArrayList<String> items;',
        '',
        '    public void addItem(String item) {',
        '        items.add(item)',
        '    }',
        '}'
      ],
      bugLine: 7,
      explanation: "Missing semicolon at the end of the items.add(item) statement."
    },
    {
      code: [
        'public class Calculator {',
        '    public static int add(int a, int b) {',
        '        return a + b;',
        '    }',
        '',
        '    public static void main(String[] args) {',
        '        int result = add(5, "10");',
        '        System.out.println("Result: " + result);',
        '    }',
        '}'
      ],
      bugLine: 7,
      explanation: "Passing a string \"10\" where an integer is expected."
    },
    {
      code: [
        'public class Rectangle {',
        '    private int width;',
        '    private int height;',
        '',
        '    public Rectangle(int width, int height) {',
        '        this.width = width;',
        '        this.height = height',
        '    }',
        '}'
      ],
      bugLine: 7,
      explanation: "Missing semicolon at the end of the this.height = height statement."
    },
    {
      code: [
        'import java.util.Scanner;',
        '',
        'public class UserInput {',
        '    public static void main(String[] args) {',
        '        Scanner scanner = new Scanner(System.in);',
        '        System.out.print("Enter your age: ");',
        '        int age = scanner.nextInteger();',
        '        System.out.println("You are " + age + " years old");',
        '    }',
        '}'
      ],
      bugLine: 7,
      explanation: "There's no nextInteger() method. Should be nextInt()."
    }
  ],
  c: [
    {
      code: [
        '#include <stdio.h>',
        '',
        'int main() {',
        '    int num1 = 10;',
        '    int num2 = 20;',
        '    int sum;',
        '    ',
        '    sum = num1 + num2',
        '    printf("Sum: %d\\n", sum);',
        '    ',
        '    return 0;',
        '}'
      ],
      bugLine: 8,
      explanation: "Missing semicolon at the end of the sum = num1 + num2 statement."
    },
    {
      code: [
        '#include <stdio.h>',
        '',
        'void printArray(int arr[], int size) {',
        '    for (int i = 0; i < size; i++) {',
        '        printf("%d ", arr[i]);',
        '    }',
        '    print("\\n");',
        '}'
      ],
      bugLine: 7,
      explanation: "Misspelled 'printf' as 'print'."
    },
    {
      code: [
        '#include <stdio.h>',
        '',
        '#define PI 3.14159',
        '',
        'double calculateArea(double radius) {',
        '    return PI * radius * radius;',
        '}',
        '',
        'int main() {',
        '    double r = 5.0;',
        '    double area = calculateArea(r)',
        '    printf("Area: %.2f\\n", area);',
        '    return 0;',
        '}'
      ],
      bugLine: 11,
      explanation: "Missing semicolon at the end of the area assignment."
    },
    {
      code: [
        '#include <stdio.h>',
        '',
        'int factorial(int n) {',
        '    if (n == 0) {',
        '        return 1;',
        '    } else {',
        '        return n * factorial(n - 1);',
        '    }',
        '}',
        '',
        'int main() {',
        '    int num = 5;',
        '    int result = factorial(num);',
        '    printf("Factorial of %d is %d\\n", num, result)',
        '    return 0;',
        '}'
      ],
      bugLine: 15,
      explanation: "Missing semicolon at the end of the printf statement."
    },
    {
      code: [
        '#include <stdio.h>',
        '',
        'struct Point {',
        '    int x;',
        '    int y;',
        '};',
        '',
        'int main() {',
        '    struct Point p1;',
        '    p1.x = 10;',
        '    p1.y = 20;',
        '    ',
        '    printf("Point coordinates: (%d, %d)\\n", p1.x, p1.y)',
        '    ',
        '    return 0;',
        '}'
      ],
      bugLine: 13,
      explanation: "Missing semicolon at the end of the printf statement."
    }
  ]
};

// Game state
let currentLang = 'html';
let score = 0;
let level = 1;

// DOM elements
const snippetContainer = document.getElementById('snippet-container');
const feedback = document.getElementById('feedback');
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score-value');
const highscoreDisplay = document.getElementById('highscore');
const languageSelector = document.getElementById('language');
const nextButton = document.getElementById('next-btn');
const successSound = document.getElementById('success-sound');
const errorSound = document.getElementById('error-sound');

let currentSnippet = null;

// Load a random snippet for the current language
function loadSnippet() {
  const snippets = snippetsByLang[currentLang];
  
  // Check if snippets exist for the current language
  if (!snippets || snippets.length === 0) {
    snippetContainer.innerHTML = '<div class="code-line">No snippets available for this language</div>';
    feedback.textContent = 'Please select another language';
    return;
  }
  
  currentSnippet = snippets[Math.floor(Math.random() * snippets.length)];

  snippetContainer.innerHTML = '';
  currentSnippet.code.forEach((line, index) => {
    const div = document.createElement('div');
    div.className = 'code-line';
    div.textContent = line;
    div.addEventListener('click', () => checkAnswer(index));
    snippetContainer.appendChild(div);
  });

  feedback.textContent = '';
}

// Check if the selected line is the bug
function checkAnswer(index) {
  const lines = document.querySelectorAll('.code-line');
  lines.forEach(line => line.classList.remove('correct', 'wrong'));

  if (index === currentSnippet.bugLine) {
    lines[index].classList.add('correct');
    feedback.textContent = `✅ Correct! ${currentSnippet.explanation}`;
    score += 10;
    level += 1;
    successSound.play().catch(e => console.log("Audio play failed:", e));
  } else {
    lines[index].classList.add('wrong');
    feedback.textContent = `❌ Wrong! ${currentSnippet.explanation}`;
    score = Math.max(score - 5, 0);
    errorSound.play().catch(e => console.log("Audio play failed:", e));
  }

  levelDisplay.textContent = level;
  scoreDisplay.textContent = score;
  highscoreDisplay.textContent = Math.max(score, parseInt(highscoreDisplay.textContent));
}

// Event listeners
languageSelector.addEventListener('change', () => {
  currentLang = languageSelector.value;
  score = 0;
  level = 1;
  levelDisplay.textContent = level;
  scoreDisplay.textContent = score;
  resetTimer();
  loadSnippet();
});

nextButton.addEventListener('click', loadSnippet);

// Initialize game
loadSnippet();
// Create floating particles
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('particles-container');
  document.body.appendChild(particlesContainer);
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100 + 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Call this after DOM loads
document.addEventListener('DOMContentLoaded', createParticles);