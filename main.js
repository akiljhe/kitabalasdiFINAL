// Python Learning Platform - Main JavaScript
let pyodide = null;
let currentProblem = null;
let userProgress = JSON.parse(localStorage.getItem('pythonProgress') || '{}');

// Problem definitions
const problems = [
    {
        id: 1,
        title: "Odd, Even, or Zero",
        difficulty: "beginner",
        description: "Buat program untuk menentukan apakah sebuah bilangan: 'Odd' jika ganjil, 'Even' jika genap, 'Zero' jika 0",
        template: `# Odd, Even, or Zero
# Program akan membaca satu baris input
bilangan = int(input())

# Tulis kode Anda di sini
`,
        testCases: [
            { input: "0", expected: "Zero" },
            { input: "4", expected: "Even" },
            { input: "7", expected: "Odd" },
            { input: "-1", expected: "Odd" },
            { input: "-10", expected: "Even" }
        ]
    },
    {
        id: 2,
        title: "Grade Classification",
        difficulty: "beginner",
        description: "Input nilai ujian (0-100). Jika tidak valid, cetak 'Invalid'. Jika valid, tentukan grade A-E",
        template: `# Grade Classification
# Program akan membaca satu baris input
nilai = int(input())

# Validasi dan tentukan grade
`,
        testCases: [
            { input: "120", expected: "Invalid" },
            { input: "-10", expected: "Invalid" },
            { input: "85", expected: "A" },
            { input: "70", expected: "B" },
            { input: "55", expected: "C" },
            { input: "40", expected: "D" },
            { input: "39", expected: "E" }
        ]
    },
    {
        id: 3,
        title: "Print Numbers With Step",
        difficulty: "beginner",
        description: "Cetak angka dari 1 sampai N, tetapi lewati setiap bilangan kelipatan 4",
        template: `# Print Numbers With Step
# Program akan membaca satu baris input
N = int(input())

# Cetak angka kecuali kelipatan 4
`,
        testCases: [
            { input: "10", expected: "1\n2\n3\n5\n6\n7\n9\n10" },
            { input: "4", expected: "1\n2\n3" }
        ]
    },
    {
        id: 4,
        title: "Repeat Word",
        difficulty: "beginner",
        description: "Cetak kata 'Python' sebanyak N kali dengan nomor urut di depan",
        template: `# Repeat Word
# Program akan membaca satu baris input
N = int(input())

# Cetak Python dengan nomor urut
`,
        testCases: [
            { input: "3", expected: "1. Python\n2. Python\n3. Python" },
            { input: "1", expected: "1. Python" }
        ]
    },
    {
        id: 5,
        title: "Multiples of 3 and 5",
        difficulty: "beginner",
        description: "Cetak semua angka dari 1 sampai N yang merupakan kelipatan 3 atau 5",
        template: `# Multiples of 3 and 5
# Program akan membaca satu baris input
N = int(input())

# Cetak kelipatan 3 atau 5
`,
        testCases: [
            { input: "15", expected: "3\n5\n6\n9\n10\n12\n15" }
        ]
    },
    {
        id: 6,
        title: "Square & Diagonal",
        difficulty: "intermediate",
        description: "Untuk persegi bersisi S, hitung luas, keliling, dan panjang diagonal (bulatkan 2 desimal)",
        template: `# Square & Diagonal
import math

# Program akan membaca satu baris input
S = int(input())

# Hitung luas, keliling, dan diagonal
`,
        testCases: [
            { input: "5", expected: "Luas: 25\nKeliling: 20\nDiagonal: 7.07" },
            { input: "1", expected: "Luas: 1\nKeliling: 4\nDiagonal: 1.41" }
        ]
    },
    {
        id: 7,
        title: "Modulo Comparison",
        difficulty: "intermediate",
        description: "Diberikan dua angka A dan B, bandingkan A%B dan B%A, cetak mana yang lebih besar",
        template: `# Modulo Comparison
# Program akan membaca satu baris input
A, B = map(int, input().split())

# Hitung modulo
`,
        testCases: [
            { input: "10 6", expected: "B" },
            { input: "15 4", expected: "A" },
            { input: "5 5", expected: "Equal" }
        ]
    },
    {
        id: 8,
        title: "Power or Root",
        difficulty: "intermediate",
        description: "Diberikan bilangan X dan perintah C: 'pow' untuk X² atau 'root' untuk akar kuadrat X",
        template: `# Power or Root
import math

# Program akan membaca dua baris input
X = int(input())
C = input()

`,
        testCases: [
            { input: "9\nroot", expected: "3.00" },
            { input: "5\npow", expected: "25" },
            { input: "16\nroot", expected: "4.00" }
        ]
    },
    {
        id: 9,
        title: "Fizz for Five",
        difficulty: "intermediate",
        description: "Cetak angka 1-N, jika kelipatan 5 cetak 'Fizz', selainnya cetak angka",
        template: `# Fizz for Five
# Program akan membaca satu baris input
N = int(input())

# Cetak angka atau Fizz
`,
        testCases: [
            { input: "10", expected: "1\n2\n3\n4\nFizz\n6\n7\n8\n9\nFizz" }
        ]
    },
    {
        id: 10,
        title: "Maximum of Three",
        difficulty: "intermediate",
        description: "Diberikan 3 angka, tentukan angka terbesar tanpa menggunakan fungsi max()",
        template: `# Maximum of Three
# Program akan membaca satu baris input
a, b, c = map(int, input().split())

# Tentukan nilai maksimum
`,
        testCases: [
            { input: "12 7 30", expected: "30" },
            { input: "45 89 23", expected: "89" },
            { input: "100 10 1", expected: "100" }
        ]
    },
    {
        id: 11,
        title: "Sum of Even Numbers",
        difficulty: "intermediate",
        description: "Hitung total semua angka genap dari 1 sampai N",
        template: `# Sum of Even Numbers
# Program akan membaca satu baris input
N = int(input())

# Hitung jumlah angka genap
`,
        testCases: [
            { input: "10", expected: "30" },
            { input: "20", expected: "110" }
        ]
    },
    {
        id: 12,
        title: "Star Pattern",
        difficulty: "advanced",
        description: "Cetak pola segitiga menggunakan karakter * dengan tinggi N",
        template: `# Star Pattern
# Program akan membaca satu baris input
N = int(input())

# Cetak pola bintang
`,
        testCases: [
            { input: "4", expected: "*\n**\n***\n****" }
        ]
    },
    {
        id: 13,
        title: "Count Multiples",
        difficulty: "advanced",
        description: "Hitung berapa banyak angka dari 1 sampai N yang merupakan kelipatan 2 dan 7",
        template: `# Count Multiples
# Program akan membaca satu baris input
N = int(input())

# Hitung kelipatan 14 (kelipatan 2 dan 7)
`,
        testCases: [
            { input: "50", expected: "3" },
            { input: "100", expected: "7" }
        ]
    },
    {
        id: 14,
        title: "Valid Usernames",
        difficulty: "advanced",
        description: "Filter username yang valid menggunakan regex: diawali huruf, boleh huruf & angka, minimal 3 karakter",
        template: `# Valid Usernames
import re

# Program akan membaca N baris input
N = int(input())
valid_usernames = []

# Pola regex untuk username valid
pattern = r'^[a-zA-Z][a-zA-Z0-9]{2,}$'

for _ in range(N):
    username = input()
    if re.match(pattern, username):
        valid_usernames.append(username)

# Cetak hasil
if valid_usernames:
    for username in valid_usernames:
        print(username)
else:
    print("No valid username")`,
        testCases: [
            { input: "5\njoy123\nandi_\nmaria99\n_user\ntest007", expected: "joy123\nmaria99\ntest007" },
            { input: "2\n123joy\n_test", expected: "No valid username" }
        ]
    },
    {
        id: 15,
        title: "Extract Numbers",
        difficulty: "advanced",
        description: "Ekstrak angka dari string, hitung total, rata-rata, dan nilai terbesar. Bulatkan rata-rata (gunakan //).",
        template: `# Extract Numbers
import re

# Program akan membaca N baris input
N = int(input())
numbers = []

for _ in range(N):
    line = input()
    # Ekstrak angka dari baris
    found_numbers = re.findall(r'\d+', line)
    numbers.extend(map(int, found_numbers))

# Hitung statistik
if numbers:
    total = sum(numbers)
    # Gunakan pembulatan ke bawah (floor division)
    average = total // len(numbers) 
    max_num = max(numbers)
    
    print(f"Total: {total}")
    print(f"Average: {average}")
    print(f"Max: {max_num}")
else:
    print("Total: 0")
    print("Average: 0")
    print("Max: 0")
`,
        testCases: [
            { input: "6\nRp25000\nharga:30000\n50k\nabc\n120000\nid:5000", expected: "Total: 180050\nAverage: 36010\nMax: 120000" },
            { input: "2\nTidak ada angka\nsama sekali", expected: "Total: 0\nAverage: 0\nMax: 0"}
        ]
    }
];

// Achievements system
const achievements = [
    { id: 'first_code', name: 'First Code', description: 'Menulis kode pertama', icon: '🎯', unlocked: false },
    { id: 'problem_solver', name: 'Problem Solver', description: 'Menyelesaikan 5 soal', icon: '🧩', unlocked: false },
    { id: 'code_master', name: 'Code Master', description: 'Menyelesaikan 10 soal', icon: '🏆', unlocked: false },
    { id: 'python_expert', name: 'Python Expert', description: 'Menyelesaikan semua soal', icon: '🐍', unlocked: false },
    { id: 'perfect_score', name: 'Perfect Score', description: 'Menyelesaikan soal tanpa error', icon: '⭐', unlocked: false },
    { id: 'speed_coder', name: 'Speed Coder', description: 'Menyelesaikan soal dalam waktu cepat', icon: '⚡', unlocked: false },
    { id: 'debug_hero', name: 'Debug Hero', description: 'Memperbaiki error dengan baik', icon: '🐛', unlocked: false },
    { id: 'pattern_master', name: 'Pattern Master', description: 'Menyelesaikan semua soal pola', icon: '🎨', unlocked: false }
];

// Initialize Pyodide
async function initializePyodide() {
    const runButton = document.getElementById('run-button');
    const outputDiv = document.getElementById('output-display');
    try {
        outputDiv.innerHTML = '<div class="text-yellow-400">Memuat Python Compiler (Pyodide)...</div>';
        runButton.disabled = true;
        runButton.textContent = "Memuat...";
        pyodide = await loadPyodide();
        console.log('Pyodide loaded successfully');
        outputDiv.innerHTML = '<div class="text-green-400">Pyodide berhasil dimuat. Selamat datang!</div>';
        runButton.disabled = false;
        runButton.textContent = "▶ Run Code";
    } catch (error) {
        console.error('Failed to load Pyodide:', error);
        outputDiv.innerHTML = `<div class="text-red-400">Error: Gagal memuat Python compiler. Coba muat ulang halaman.</div>`;
        showNotification('Gagal memuat Python compiler. Beberapa fitur mungkin tidak berfungsi.', 'error');
        runButton.textContent = "Error";
    }
}

// Initialize application
async function initializeApp() {
    await initializePyodide();
    loadUserProgress();
}

// Load user progress from localStorage
function loadUserProgress() {
    const saved = localStorage.getItem('pythonLearningProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
        updateStats();
    }
}

// Save user progress to localStorage
function saveUserProgress() {
    localStorage.setItem('pythonLearningProgress', JSON.stringify(userProgress));
}

// Load problems into sidebar
function loadProblems() {
    const container = document.getElementById('problem-list');
    if (!container) return; // Hanya jalankan jika elemen ada
    container.innerHTML = '';
    
    problems.forEach(problem => {
        const isCompleted = userProgress.completed && userProgress.completed.includes(problem.id);
        const difficultyColor = {
            'beginner': 'bg-green-100 text-green-800',
            'intermediate': 'bg-yellow-100 text-yellow-800',
            'advanced': 'bg-red-100 text-red-800'
        };
        
        const problemElement = document.createElement('div');
        problemElement.className = `problem-card p-3 rounded-lg cursor-pointer`;
        problemElement.id = `problem-card-${problem.id}`;
        problemElement.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-slate-800 text-sm">${problem.title}</h4>
                ${isCompleted ? '<span class="text-emerald-500 text-xs">✓</span>' : ''}
            </div>
            <span class="text-xs px-2 py-1 rounded-full ${difficultyColor[problem.difficulty]}">${problem.difficulty}</span>
        `;
        
        problemElement.addEventListener('click', () => selectProblem(problem.id));
        container.appendChild(problemElement);
    });
}

// Select a problem
function selectProblem(problemId) {
    currentProblem = problems.find(p => p.id === problemId);
    if (currentProblem) {
        document.getElementById('code-editor').value = currentProblem.template;
        document.getElementById('editor-title').textContent = `Editor: ${currentProblem.title}`;
        showNotification(`Memuat soal: ${currentProblem.title}`, 'info');

        // Update active card style
        document.querySelectorAll('.problem-card').forEach(card => card.classList.remove('active'));
        document.getElementById(`problem-card-${problemId}`).classList.add('active');

        // Set run button text
        document.getElementById('run-button').textContent = "▶ Run Test Cases";
    }
}

// Load template code
function loadTemplate() {
    if (currentProblem) {
        document.getElementById('code-editor').value = currentProblem.template;
        showNotification('Template dimuat', 'info');
    } else {
        showNotification('Pilih soal terlebih dahulu', 'warning');
    }
}

// Clear editor
function clearEditor() {
    document.getElementById('code-editor').value = '';
    document.getElementById('editor-title').textContent = 'Code Editor';
    document.getElementById('run-button').textContent = "▶ Run Code";
    currentProblem = null;
    document.querySelectorAll('.problem-card').forEach(card => card.classList.remove('active'));
    showNotification('Editor dikosongkan', 'info');
}

// Clear output
function clearOutput() {
    document.getElementById('output-display').innerHTML = '<div class="text-gray-500">Output akan muncul di sini...</div>';
}

// =================================================================
// === FUNGSI INTI BARU: RUNCODE DENGAN TEST CASE ===
// =================================================================

async function runCode() {
    const code = document.getElementById('code-editor').value;
    const outputDiv = document.getElementById('output-display');
    const runButton = document.getElementById('run-button');
    
    if (!code.trim()) {
        showNotification('Kode tidak boleh kosong', 'warning');
        return;
    }
    
    if (!pyodide) {
        showNotification('Python compiler belum siap. Tunggu beberapa saat...', 'error');
        return;
    }

    runButton.disabled = true;
    runButton.textContent = "Menjalankan...";

    // Check if a problem is selected
    if (currentProblem) {
        // --- MENJALANKAN TEST CASES ---
        outputDiv.innerHTML = `<div class="text-yellow-400">⏳ Menjalankan Test Case untuk: ${currentProblem.title}...</div><br>`;
        const testCases = currentProblem.testCases;
        let passedCount = 0;
        let finalOutput = outputDiv.innerHTML; // Simpan pesan "Menjalankan..."

        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const inputLines = testCase.input.replace(/\\n/g, '\n').split('\n');
            
            finalOutput += `--- Test Case ${i + 1} ---<br>`;
            finalOutput += `Input:<br><pre>${escapeHtml(testCase.input)}</pre>`;
            outputDiv.innerHTML = finalOutput; // Update UI
            
            try {
                // 1. Mock input() function in Python
                // Kita bungkus input dalam list JSON
                const mockInputScript = `
import sys
_test_inputs = ${JSON.stringify(inputLines)}
_input_index = 0
def input(prompt=""):
    global _input_index
    if _input_index < len(_test_inputs):
        val = _test_inputs[_input_index]
        _input_index += 1
        return val
    raise EOFError("End of test case input")
`;
                await pyodide.runPythonAsync(mockInputScript);

                // 2. Run user's code
                let output = '';
                pyodide.setStdout({
                    write: (text) => { output += text; }
                });
                
                await pyodide.runPythonAsync(code);
                
                // 3. Compare results
                const expected = testCase.expected.replace(/\r\n/g, '\n').trim();
                const actual = output.replace(/\r\n/g, '\n').trim();

                finalOutput += `Expected Output:<br><pre>${escapeHtml(expected)}</pre>`;
                finalOutput += `Your Output:<br><pre class="${expected === actual ? 'text-green-400' : 'text-red-400'}">${escapeHtml(actual || "(Output Kosong)")}</pre>`;

                if (expected === actual) {
                    passedCount++;
                    finalOutput += `<span class="text-green-400">Status: Lolos ✅</span><br><br>`;
                } else {
                    finalOutput += `<span class="text-red-400">Status: Gagal ❌</span><br><br>`;
                    // Stop on first failure
                    outputDiv.innerHTML = finalOutput;
                    break; 
                }
                
            } catch (error) {
                finalOutput += `<span class="text-red-400">Runtime Error: ${escapeHtml(error.message)}</span><br><br>`;
                // Stop on error
                outputDiv.innerHTML = finalOutput;
                break;
            }
            outputDiv.innerHTML = finalOutput; // Update UI after each case
        } // End of test case loop

        // Final Result
        if (passedCount === testCases.length) {
            finalOutput += `<br><strong class="text-green-400 text-lg">SELAMAT! Semua ${testCases.length} test case lolos!</strong>`;
            
            // Mark problem as completed
            if (!userProgress.completed) userProgress.completed = [];
            if (!userProgress.completed.includes(currentProblem.id)) {
                userProgress.completed.push(currentProblem.id);
                showNotification(`Selamat! Soal ${currentProblem.title} berhasil diselesaikan!`, 'success');
                checkAchievements();
                updateStats();
                loadProblems(); // Refresh problem list
            }
            saveUserProgress();

        } else {
            finalOutput += `<br><strong class="text-red-400 text-lg">GAGAL. ${passedCount} dari ${testCases.length} test case lolos.</strong>`;
        }
        outputDiv.innerHTML = finalOutput;

    } else {
        // --- MENJALANKAN SEBAGAI COMPILER BIASA ---
        outputDiv.innerHTML = '<div class="text-yellow-400">⏳ Menjalankan kode... (Tidak ada soal dipilih)</div>';
        try {
            let output = '';
            pyodide.setStdout({
                write: (text) => { output += text; }
            });
            
            // Ini akan gagal jika kode menggunakan input()
            await pyodide.runPythonAsync(code);
            
            if (!output) {
                 outputDiv.innerHTML = '<div class="text-gray-500">✅ Kode berhasil dijalankan (tidak ada output)</div>';
            } else {
                 outputDiv.innerHTML = `<div class="text-white">${escapeHtml(output)}</div>`;
            }
            
            // Unlock first code achievement
            if (!userProgress.firstCode) {
                userProgress.firstCode = true;
                unlockAchievement('first_code');
            }
            saveUserProgress();

        } catch (error) {
            if (error.message.includes("StdinNotImplementedError") || error.message.includes("EOFError")) {
                outputDiv.innerHTML = `<div class="text-red-400">Error: Kode Anda menggunakan input().<br><br>Untuk menggunakan input(), silakan pilih soal dari "Daftar Latihan" agar kami bisa menyediakan input untuk test case.</div>`;
            } else {
                outputDiv.innerHTML = `<div class="text-red-400">Error: ${escapeHtml(error.message)}</div>`;
            }
            showNotification('Terjadi error saat menjalankan kode', 'error');
        }
    }
    
    // Kembalikan tombol ke state semula
    runButton.disabled = false;
    runButton.textContent = currentProblem ? "▶ Run Test Cases" : "▶ Run Code";
}

// =================================================================
// === AKHIR FUNGSI BARU ===
// =================================================================

// Check and unlock achievements
function checkAchievements() {
    const completedCount = userProgress.completed ? userProgress.completed.length : 0;
    
    if (completedCount >= 5 && !userProgress.problemSolver) {
        userProgress.problemSolver = true;
        unlockAchievement('problem_solver');
    }
    
    if (completedCount >= 10 && !userProgress.codeMaster) {
        userProgress.codeMaster = true;
        unlockAchievement('code_master');
    }
    
    if (completedCount >= 15 && !userProgress.pythonExpert) {
        userProgress.pythonExpert = true;
        unlockAchievement('python_expert');
    }
}

// Unlock achievement
function unlockAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
        userProgress[achievementId] = true; // Simpan progres
        achievement.unlocked = true;
        showNotification(`🏆 Achievement Terbuka: ${achievement.name}!`, 'success');
        loadAchievements();
        updateStats();
    }
}

// Load achievements display
function loadAchievements() {
    const container = document.getElementById('achievements-grid');
    if (!container) return; // Hanya jalankan jika elemen ada
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const isUnlocked = userProgress[achievement.id] || achievement.unlocked;
        
        const achievementElement = document.createElement('div');
        achievementElement.className = `text-center p-4 rounded-lg ${isUnlocked ? 'achievement-badge text-white' : 'bg-gray-200 text-gray-500'}`;
        achievementElement.innerHTML = `
            <div class="text-3xl mb-2">${achievement.icon}</div>
            <h4 class="font-semibold text-sm mb-1">${achievement.name}</h4>
            <p class="text-xs opacity-80">${achievement.description}</p>
        `;
        
        container.appendChild(achievementElement);
    });
}

// Update statistics
function updateStats() {
    const completedCount = userProgress.completed ? userProgress.completed.length : 0;
    const totalProblems = problems.length;
    const successRate = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;
    
    // Hitung achievement yang unlocked
    let achievementCount = 0;
    achievements.forEach(a => {
        if(userProgress[a.id]) {
            achievementCount++;
        }
    });
    
    const completedCountEl = document.getElementById('completed-count');
    const successRateEl = document.getElementById('success-rate');
    const achievementCountEl = document.getElementById('achievement-count');

    if (completedCountEl) completedCountEl.textContent = completedCount;
    if (successRateEl) successRateEl.textContent = `${successRate}%`;
    if (achievementCountEl) achievementCountEl.textContent = achievementCount;
}

// Show notification
function showNotification(message, type = 'info') {
    const colors = {
        'info': 'bg-blue-500',
        'success': 'bg-green-500',
        'warning': 'bg-yellow-500',
        'error': 'bg-red-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Escape HTML for safe display
function escapeHtml(text) {
    if (typeof text !== 'string') {
        text = String(text);
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize syntax highlighting (basic implementation)
// Fungsi ini tidak terpakai di index.html tapi mungkin berguna
function highlightSyntax(code) {
    // This is a basic implementation. For production, use a proper syntax highlighter
    return code
        .replace(/\b(def|if|elif|else|for|while|import|from|return|class|try|except)\b/g, '<span class="syntax-keyword">$1</span>')
        .replace(/(["\'])([^"\']*)\1/g, '<span class="syntax-string">$1$2$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')
        .replace(/(#.*$)/gm, '<span class="syntax-comment">$1</span>');
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats cards (jika ada)
    const statsCards = document.querySelectorAll('.bg-white.rounded-lg.p-6');
    if (statsCards.length > 0) {
        anime({
            targets: statsCards,
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutQuad'
        });
    }
});
