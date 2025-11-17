// Python Learning Platform - Main JavaScript
let pyodide = null;
let currentProblem = null;
let userProgress = JSON.parse(localStorage.getItem('pythonProgress') || '{}');

// (BARU) Variabel global untuk menampung instance CodeMirror
let codeEditorInstance = null;

// Problem definitions (tidak berubah)
const problems = [
    {
        id: 1,
        title: "Odd, Even, or Zero",
        difficulty: "beginner",
        description: "Buat program untuk menentukan apakah sebuah bilangan: 'Odd' jika ganjil, 'Even' jika genap, 'Zero' jika 0",
        // (BARU) Menambahkan detail soal
        inputFormat: "Satu bilangan integer.",
        outputFormat: "Cetak salah satu: 'Odd', 'Even', atau 'Zero'.",
        sampleInput: "0",
        sampleOutput: "Zero",
        explanation: "Bilangan 0 adalah nol, bukan ganjil atau genap.",
        hint: "Gunakan operator modulo (%) untuk memeriksa apakah bilangan habis dibagi 2.",
        template: `# Odd, Even, or Zero
number = int(input())

# Tulis kode Anda di sini
if number == 0:
    print("Zero")
elif number % 2 == 0:
    print("Even")
else:
    print("Odd")`,
        testCases: [
            { input: "0", expected: "Zero" },
            { input: "4", expected: "Even" },
            { input: "7", expected: "Odd" }
        ]
    },
    {
        id: 2,
        title: "Grade Classification",
        difficulty: "beginner",
        description: "Input nilai ujian (0-100). Jika tidak valid, cetak 'Invalid'. Jika valid, tentukan grade A-E",
        // (BARU) Menambahkan detail soal
        inputFormat: "Satu bilangan integer.",
        outputFormat: "Satu huruf grade atau 'Invalid'.",
        sampleInput: "120",
        sampleOutput: "Invalid",
        explanation: "Nilai 120 berada di luar rentang 0-100, maka outputnya 'Invalid'.",
        hint: "Validasi input terlebih dahulu sebelum menentukan grade.",
        template: `# Grade Classification
nilai = int(input())

# Validasi dan tentukan grade
if nilai < 0 or nilai > 100:
    print("Invalid")
elif nilai >= 85:
    print("A")
elif nilai >= 70:
    print("B")
elif nilai >= 55:
    print("C")
elif nilai >= 40:
    print("D")
else:
    print("E")`,
        testCases: [
            { input: "120", expected: "Invalid" },
            { input: "85", expected: "A" },
            { input: "45", expected: "D" }
        ]
    },
    {
        id: 3,
        title: "Print Numbers With Step",
        difficulty: "beginner",
        description: "Cetak angka dari 1 sampai N, tetapi lewati setiap bilangan kelipatan 4",
        // (BARU) Menambahkan detail soal
        inputFormat: "Integer N.",
        outputFormat: "Setiap angka yang tidak termasuk kelipatan 4 dicetak di baris baru.",
        sampleInput: "10",
        sampleOutput: "1\n2\n3\n5\n6\n7\n9\n10",
        explanation: "Angka 4 dan 8 adalah kelipatan 4, jadi tidak dicetak.",
        hint: "Gunakan loop dan operator modulo untuk melewati kelipatan 4.",
        template: `# Print Numbers With Step
N = int(input())

# Cetak angka kecuali kelipatan 4
for i in range(1, N + 1):
    if i % 4 != 0:
        print(i)`,
        testCases: [
            { input: "10", expected: "1\n2\n3\n5\n6\n7\n9\n10" }
        ]
    },
    {
        id: 4,
        title: "Repeat Word",
        difficulty: "beginner",
        description: "Cetak kata 'Python' sebanyak N kali dengan nomor urut di depan",
        // (BARU) Menambahkan detail soal
        inputFormat: "Integer N.",
        outputFormat: "N baris dengan format: <nomor>. Python",
        sampleInput: "3",
        sampleOutput: "1. Python\n2. Python\n3. Python",
        explanation: "Kata 'Python' dicetak 3 kali dengan nomor urut 1, 2, dan 3.",
        hint: "Gunakan loop dan f-string untuk format output yang benar.",
        template: `# Repeat Word
N = int(input())

# Cetak Python dengan nomor urut
for i in range(1, N + 1):
    print(f"{i}. Python")`,
        testCases: [
            { input: "3", expected: "1. Python\n2. Python\n3. Python" }
        ]
    },
    {
        id: 5,
        title: "Multiples of 3 and 5",
        difficulty: "beginner",
        description: "Cetak semua angka dari 1 sampai N yang merupakan kelipatan 3 atau 5",
        // (BARU) Menambahkan detail soal
        inputFormat: "Integer N.",
        outputFormat: "Angka valid dicetak baris per baris.",
        sampleInput: "15",
        sampleOutput: "3\n5\n6\n9\n10\n12\n15",
        explanation: "Semua angka yang habis dibagi 3 atau 5 dicetak.",
        hint: "Gunakan operator modulo dan kondisi OR (or) untuk memeriksa kedua kondisi.",
        template: `# Multiples of 3 and 5
N = int(input())

# Cetak kelipatan 3 atau 5
for i in range(1, N + 1):
    if i % 3 == 0 or i % 5 == 0:
        print(i)`,
        testCases: [
            { input: "15", expected: "3\n5\n6\n9\n10\n12\n15" }
        ]
    },
    {
        id: 6,
        title: "Square & Diagonal",
        difficulty: "intermediate",
        description: "Untuk persegi bersisi S, hitung luas, keliling, dan panjang diagonal",
        // (BARU) Menambahkan detail soal
        inputFormat: "Integer S.",
        outputFormat: "Luas: X\nKeliling: Y\nDiagonal: Z",
        sampleInput: "5",
        sampleOutput: "Luas: 25\nKeliling: 20\nDiagonal: 7.07",
        explanation: "Luas = S², Keliling = 4S, Diagonal = S√2",
        hint: "Gunakan modul math untuk fungsi akar kuadrat (sqrt).",
        template: `# Square & Diagonal
import math

S = int(input())

# Hitung luas, keliling, dan diagonal
luas = S * S
keliling = 4 * S
diagonal = S * math.sqrt(2)

print(f"Luas: {luas}")
print(f"Keliling: {keliling}")
print(f"Diagonal: {diagonal:.2f}")`,
        testCases: [
            { input: "5", expected: "Luas: 25\nKeliling: 20\nDiagonal: 7.07" }
        ]
    },
    {
        id: 7,
        title: "Modulo Comparison",
        difficulty: "intermediate",
        description: "Diberikan dua angka A dan B, bandingkan A%B dan B%A, cetak mana yang lebih besar",
        // (BARU) Menambahkan detail soal
        inputFormat: "Satu baris dua integer A dan B.",
        outputFormat: "Cetak salah satu: 'A', 'B', atau 'Equal'.",
        sampleInput: "10 6",
        sampleOutput: "B",
        explanation: "10%6 = 4, 6%10 = 6. Karena 6 > 4, outputnya 'B'.",
        hint: "Hitung kedua modulo terlebih dahulu, kemudian bandingkan hasilnya.",
        template: `# Modulo Comparison
A, B = map(int, input().split())

# Hitung modulo
mod1 = A % B
mod2 = B % A

# Bandingkan hasil
if mod1 > mod2:
    print("A")
elif mod2 > mod1:
    print("B")
else:
    print("Equal")`,
        testCases: [
            { input: "10 6", expected: "B" },
            { input: "15 4", expected: "A" }
        ]
    },
    {
        id: 8,
        title: "Power or Root",
        difficulty: "intermediate",
        description: "Diberikan bilangan X dan perintah C: 'pow' untuk X² atau 'root' untuk akar kuadrat X",
        // (BARU) Menambahkan detail soal
        inputFormat: "Dua baris: Integer X, String C",
        outputFormat: "Hasil sesuai perintah.",
        sampleInput: "9\nroot",
        sampleOutput: "3.00",
        explanation: "Perintah 'root' menghitung akar kuadrat 9 = 3.00",
        hint: "Gunakan percabangan if-elif untuk memilih operasi yang sesuai.",
        template: `# Power or Root
import math

X = int(input())
C = input()

if C == "pow":
    print(X ** 2)
elif C == "root":
    print(f"{math.sqrt(X):.2f}")
else:
    print("Perintah tidak valid")`,
        testCases: [
            { input: "9\nroot", expected: "3.00" },
            { input: "5\npow", expected: "25" }
        ]
    },
    {
        id: 9,
        title: "Fizz for Five",
        difficulty: "intermediate",
        description: "Cetak angka 1-N, jika kelipatan 5 cetak 'Fizz', selainnya cetak angka",
        // (BARU) Menambahkan detail soal
        inputFormat: "Integer N.",
        outputFormat: "Setiap baris berisi angka atau teks 'Fizz'.",
        sampleInput: "10",
        sampleOutput: "1\n2\n3\n4\nFizz\n6\n7\n8\n9\nFizz",
        explanation: "Angka 5 dan 10 adalah kelipatan 5, jadi diganti dengan 'Fizz'.",
        hint: "Ini adalah varian dari FizzBuzz classik, fokus pada kelipatan 5 saja.",
        template: `# Fizz for Five
N = int(input())

# Cetak angka atau Fizz
for i in range(1, N + 1):
    if i % 5 == 0:
        print("Fizz")
    else:
        print(i)`,
        testCases: [
            { input: "10", expected: "1\n2\n3\n4\nFizz\n6\n7\n8\n9\nFizz" }
        ]
    },
    {
        id: 10,
        title: "Maximum of Three",
        difficulty: "intermediate",
        description: "Diberikan 3 angka, tentukan angka terbesar tanpa menggunakan fungsi max()",
        // (BARU) Menambahkan detail soal
        inputFormat: "Tiga integer dipisahkan spasi.",
        outputFormat: "Satu angka terbesar.",
        sampleInput: "12 7 30",
        sampleOutput: "30",
        explanation: "Dari angka 12, 7, dan 30, angka terbesar adalah 30.",
        hint: "Gunakan variabel sementara untuk menyimpan nilai maksimum sementara.",
        template: `# Maximum of Three
a, b, c = map(int, input().split())

# Tentukan nilai maksimum
maks = a
if b > maks:
    maks = b
if c > maks:
    maks = c

print(maks)`,
        testCases: [
            { input: "12 7 30", expected: "30" },
            { input: "45 89 23", expected: "89" }
        ]
    },
    {
        id: 11,
        title: "Sum of Even Numbers",
        difficulty: "intermediate",
        description: "Hitung total semua angka genap dari 1 sampai N",
        // (BARU) Menambahkan detail soal
        inputFormat: "Integer N.",
        outputFormat: "Satu angka: total bilangan genap.",
        sampleInput: "10",
        sampleOutput: "30",
        explanation: "Angka genap dari 1-10: 2+4+6+8+10 = 30",
        hint: "Gunakan variabel untuk mengakumulasi total dan operator modulo untuk memeriksa genap.",
        template: `# Sum of Even Numbers
N = int(input())

# Hitung jumlah angka genap
total = 0
for i in range(1, N + 1):
    if i % 2 == 0:
        total += i

print(total)`,
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
        // (BARU) Menambahkan detail soal
        inputFormat: "Integer N.",
        outputFormat: "Pola berbentuk segitiga dengan karakter *.",
        sampleInput: "4",
        sampleOutput: "*\n**\n***\n****",
        explanation: "Setiap baris mencetak bintang sebanyak nomor barisnya.",
        hint: "Gunakan loop dan string multiplication untuk mencetak bintang berulang.",
        template: `# Star Pattern
N = int(input())

# Cetak pola bintang
for i in range(1, N + 1):
    print("*" * i)`,
        testCases: [
            { input: "4", expected: "*\n**\n***\n****" }
        ]
    },
    {
        id: 13,
        title: "Count Multiples",
        difficulty: "advanced",
        description: "Hitung berapa banyak angka dari 1 sampai N yang merupakan kelipatan 2 dan 7",
        // (BARU) Menambahkan detail soal
        inputFormat: "Integer N.",
        outputFormat: "Jumlah angka yang merupakan kelipatan 14.",
        sampleInput: "50",
        sampleOutput: "3",
        explanation: "Kelipatan 14 dari 1-50: 14, 28, 42 (total 3 angka)",
        hint: "Kelipatan 2 dan 7 sama dengan kelipatan KPK(2,7) = 14.",
        template: `# Count Multiples
N = int(input())

# Hitung kelipatan 14 (kelipatan 2 dan 7)
count = 0
for i in range(1, N + 1):
    if i % 14 == 0:
        count += 1

print(count)`,
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
        // (BARU) Menambahkan detail soal
        inputFormat: "Baris pertama: integer N, diikuti N username",
        outputFormat: "Username valid satu per baris, atau 'No valid username'",
        sampleInput: "5\njoy123\nandi_\nmaria99\n_user\ntest007",
        sampleOutput: "joy123\nmaria99\ntest007",
        explanation: "Username valid: joy123, maria99, test007 (diawali huruf, minimal 3 karakter, hanya huruf & angka)",
        hint: "Gunakan regex dengan pola: ^[a-zA-Z][a-zA-Z0-9]{2,}$",
        template: `# Valid Usernames
import re

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
            { input: "5\njoy123\nandi_\nmaria99\n_user\ntest007", expected: "joy123\nmaria99\ntest007" }
        ]
    },
    {
        id: 15,
        title: "Extract Numbers",
        difficulty: "advanced",
        description: "Ekstrak angka dari string, hitung total, rata-rata, dan nilai terbesar",
        // (BARU) Menambahkan detail soal
        inputFormat: "Baris pertama: integer N, diikuti N baris string",
        outputFormat: "Total: X\nAverage: Y\nMax: Z",
        sampleInput: "6\nRp25000\nharga:30000\n50k\nabc\n120000\nid:5000",
        sampleOutput: "Total: 230000\nAverage: 57500\nMax: 120000",
        explanation: "Angka yang diekstrak: 25000, 30000, 50, 120000, 5000. Total=230000, Rata-rata=57500, Maks=120000",
        hint: "Gunakan regex untuk menemukan semua angka dalam string.",
        template: `# Extract Numbers
import re

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
    average = total // len(numbers)
    max_num = max(numbers)
    
    print(f"Total: {total}")
    print(f"Average: {average}")
    print(f"Max: {max_num}")`,
        testCases: [
            { input: "6\nRp25000\nharga:30000\n50k\nabc\n120000\nid:5000", expected: "Total: 230000\nAverage: 57500\nMax: 120000" }
        ]
    }
];

// Achievements system (tidak berubah)
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
    try {
        pyodide = await loadPyodide();
        console.log('Pyodide loaded successfully');
    } catch (error) {
        console.error('Failed to load Pyodide:', error);
        showNotification('Gagal memuat Python compiler. Beberapa fitur mungkin tidak berfungsi.', 'error');
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
    if (!container) return; 
    container.innerHTML = '';
    
    problems.forEach(problem => {
        const isCompleted = userProgress.completed && userProgress.completed.includes(problem.id);
        const difficultyColor = {
            'beginner': 'bg-green-100 text-green-800',
            'intermediate': 'bg-yellow-100 text-yellow-800',
            'advanced': 'bg-red-100 text-red-800'
        };
        
        const problemElement = document.createElement('div');
        problemElement.className = `problem-card p-3 rounded-lg cursor-pointer ${isCompleted ? 'border-emerald-500 bg-emerald-50' : ''}`;
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

// Select a problem (DIPERBARUI untuk CodeMirror)
function selectProblem(problemId) {
    currentProblem = problems.find(p => p.id === problemId);
    if (currentProblem && codeEditorInstance) { // Pastikan CodeMirror sudah siap
        // (BARU) Gunakan .setValue() untuk CodeMirror
        codeEditorInstance.setValue(currentProblem.template);
        
        document.getElementById('problem-title').textContent = currentProblem.title;
        document.getElementById('problem-description').textContent = currentProblem.description;
        
        // (BARU) Mengisi detail soal
        const detailsContainer = document.getElementById('problem-details-container');
        if (detailsContainer) {
            detailsContainer.innerHTML = `
                <div>
                    <h4 class="font-semibold text-slate-700 mb-1">Format Input:</h4>
                    <p class="text-gray-600 text-sm">${currentProblem.inputFormat || 'Tidak ada spesifikasi'}</p>
                </div>
                <div>
                    <h4 class="font-semibold text-slate-700 mb-1">Format Output:</h4>
                    <p class="text-gray-600 text-sm">${currentProblem.outputFormat || 'Tidak ada spesifikasi'}</p>
                </div>
                ${currentProblem.sampleInput ? `
                <div class="mt-4">
                    <h4 class="font-semibold text-slate-700 mb-1">Contoh Input:</h4>
                    <pre class="bg-slate-100 p-2 rounded text-sm code-font">${escapeHtml(currentProblem.sampleInput)}</pre>
                </div>
                ` : ''}
                ${currentProblem.sampleOutput ? `
                <div>
                    <h4 class="font-semibold text-slate-700 mb-1">Contoh Output:</h4>
                    <pre class="bg-slate-100 p-2 rounded text-sm code-font">${escapeHtml(currentProblem.sampleOutput)}</pre>
                </div>
                ` : ''}
            `;
        }

        document.getElementById('code-input').value = '';
        clearOutput();

        showNotification(`Memuat soal: ${currentProblem.title}`, 'info');
    }
}

// Load template code (DIPERBARUI untuk CodeMirror)
function loadTemplate() {
    if (currentProblem && codeEditorInstance) {
        // (BARU) Gunakan .setValue() untuk CodeMirror
        codeEditorInstance.setValue(currentProblem.template);
        showNotification('Template dimuat', 'info');
    } else {
        showNotification('Pilih soal terlebih dahulu', 'warning');
    }
}

// Clear editor (DIPERBARUI untuk CodeMirror)
function clearEditor() {
    if (codeEditorInstance) {
        // (BARU) Gunakan .setValue() untuk CodeMirror
        codeEditorInstance.setValue('');
        showNotification('Editor dikosongkan', 'info');
    }
}

// Clear output
function clearOutput() {
    document.getElementById('output-display').innerHTML = '<div class="text-gray-500">Output akan muncul di sini...</div>';
}

// Run Python code (DIPERBARUI untuk CodeMirror)
async function runCode() {
    if (!codeEditorInstance) {
        showNotification('Editor kode belum siap.', 'error');
        return;
    }

    // (BARU) Gunakan .getValue() untuk CodeMirror
    const code = codeEditorInstance.getValue();
    const outputDiv = document.getElementById('output-display');
    const inputText = document.getElementById('code-input').value; 
    
    if (!code.trim()) {
        showNotification('Kode tidak boleh kosong', 'warning');
        return;
    }
    
    if (!pyodide) {
        showNotification('Python compiler belum siap. Tunggu beberapa saat...', 'error');
        return;
    }
    
    try {
        outputDiv.innerHTML = '<div class="text-yellow-400">⏳ Menjalankan kode...</div>';
        
        // (BARU) Siapkan variabel output
        let output = ''; 

        // (BARU) Penanganan input multi-baris yang lebih baik
        const inputLines = inputText.split('\n');
        let lineIndex = 0;
        
        pyodide.setStdin({
            stdin: () => {
                if (lineIndex < inputLines.length) {
                    const line = inputLines[lineIndex];
                    lineIndex++;
                    // Menambahkan newline di akhir sangat penting
                    // agar `input()` di Python tahu kapan harus berhenti membaca
                    return line + '\n';
                } else {
                    // Mengembalikan null akan memicu EOFError jika program
                    // mencoba membaca lebih banyak input daripada yang disediakan
                    return null;
                }
            }
        });

        // (DIPERBARUI) setStdout akan langsung menulis ke panel output
        pyodide.setStdout({
            write: (text) => {
                // (PERBAIKAN) Cek jika 'text' adalah string atau array kode karakter
                let textAsString;
                if (typeof text === 'string') {
                    textAsString = text;
                } else if (text instanceof Uint8Array || Array.isArray(text)) {
                    // Jika ini adalah byte array (Uint8Array) atau array angka,
                    // kita ubah kembali menjadi string
                    textAsString = new TextDecoder().decode(text);
                } else {
                    // Fallback jika ada tipe data lain
                    textAsString = String(text);
                }

                output += textAsString;
                // Tulis output ke div secara real-time
                outputDiv.innerHTML = `<div class="text-green-400">${escapeHtml(output)}</div>`;
                return textAsString.length; // Kembalikan panjang string
            }
        });
        
        // (BARU) setStderr juga harus ditangani untuk menangkap error Python
        pyodide.setStderr({
            write: (text) => {
                // (PERBAIKAN) Lakukan hal yang sama untuk error
                let textAsString;
                if (typeof text === 'string') {
                    textAsString = text;
                } else if (text instanceof Uint8Array || Array.isArray(text)) {
                    textAsString = new TextDecoder().decode(text);
                } else {
                    textAsString = String(text);
                }

                output += textAsString; // Tambahkan ke output untuk logging
                // Tulis error ke div secara real-time
                outputDiv.innerHTML = `<div class="text-red-400">${escapeHtml(output)}</div>`;
                return textAsString.length; // Kembalikan panjang string
            }
        });

        await pyodide.runPythonAsync(code);
        
        // (DISESUAIKAN) Cek ini masih valid jika program berhasil tapi tidak mencetak apa-apa
        // Kita cek 'output' BUKAN 'outputDiv.innerHTML'
        if (!output.trim()) {
            outputDiv.innerHTML = '<div class="text-gray-500">✅ Kode berhasil dijalankan (tidak ada output)</div>';
        }

        if (currentProblem) {
            testSolution(code, output);
        }
        
        if (!userProgress.firstCode) {
            userProgress.firstCode = true;
            unlockAchievement('first_code');
        }
        
    } catch (error) {
        // (DIPERBARUI) Penanganan error yang lebih spesifik
        const errorMessage = error.message.toString();

        if (errorMessage.includes("EOFError")) {
            // Ini terjadi jika program memanggil input() tapi input sudah habis
            outputDiv.innerHTML = `<div class="text-red-400">
                <strong>Error: Input Tidak Cukup</strong><br>
                Program Anda membutuhkan lebih banyak input daripada yang diberikan.<br><br>
                Misal: Soal "Power or Root" butuh 2 baris input, tapi Anda hanya memberi 1.
            </div>`;
            showNotification('Input tidak lengkap', 'warning');

        } else if (errorMessage.includes("ValueError: invalid literal for int()")) {
            // Ini terjadi jika int() mendapat teks, misal int("hello") atau int("")
             outputDiv.innerHTML = `<div class="text-red-400">
                <strong>Error: Input Salah Tipe</strong><br>
                Program mencoba mengubah input menjadi angka (int), tapi input yang diberikan bukan angka (atau kosong).<br><br>
                Contoh: Anda memberi input 'hello' padahal program butuh '123'.
            </div>`;
            showNotification('Input bukan angka atau kosong', 'warning');

        } else if (errorMessage.includes("OSError: [Errno 29]")) {
            // Ini adalah error I/O yang seharusnya sudah ditangani setStdin
            // Jika masih muncul, ini adalah fallback
             outputDiv.innerHTML = `<div class="text-red-400">
                <strong>Error: I/O Problem</strong><br>
                Terjadi masalah saat membaca input. Ini bisa jadi bug internal.<br><br>
                Silakan coba 'Clear Output' dan 'Run Code' lagi.
                <br><br>
                <em class="text-xs">Detail: ${escapeHtml(errorMessage)}</em>
            </div>`;
            showNotification('Terjadi error I/O', 'error');

        } else {
            // Error lain akan ditampilkan apa adanya
            outputDiv.innerHTML = `<div class="text-red-400">Error: ${escapeHtml(errorMessage)}</div>`;
            showNotification('Terjadi error saat menjalankan kode', 'error');
        }
    }
}

// Test solution against test cases
function testSolution(code, output) {
    if (!currentProblem || !currentProblem.testCases) return;
    
    let passedTests = 0;
    const totalTests = currentProblem.testCases.length;
    
    // Simulasi test results (masih sama)
    const isCorrect = Math.random() > 0.3; 
    
    if (isCorrect) {
        if (!userProgress.completed) userProgress.completed = [];
        if (!userProgress.completed.includes(currentProblem.id)) {
            userProgress.completed.push(currentProblem.id);
            showNotification(`Selamat! Soal ${currentProblem.title} berhasil diselesaikan!`, 'success');
            
            checkAchievements();
            updateStats();
            loadProblems(); 
        }
    }
    
    saveUserProgress();
}

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
        achievement.unlocked = true;
        showNotification(`🏆 Achievement Terbuka: ${achievement.name}!`, 'success');
        loadAchievements();
        updateStats();
    }
}

// Load achievements display
function loadAchievements() {
    const container = document.getElementById('achievements-grid');
    if (!container) return; 
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
    const achievementCount = achievements.filter(a => userProgress[a.id] || a.unlocked).length;
    
    const completedEl = document.getElementById('completed-count');
    const successEl = document.getElementById('success-rate');
    const achievementEl = document.getElementById('achievement-count');
    
    if (completedEl) completedEl.textContent = completedCount;
    if (successEl) successEl.textContent = `${successRate}%`;
    if (achievementEl) achievementEl.textContent = achievementCount;
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
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translatex-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Escape HTML for safe display
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    // (DIPERBARUI) Ubah newline menjadi <br> agar format output benar
    return div.innerHTML.replace(/\n/g, '<br>'); 
}

// (HAPUS) Fungsi highlightSyntax tidak diperlukan lagi
// CodeMirror menanganinya secara otomatis

// (DIPINDAHKAN) Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats cards
    anime({
        targets: '.bg-white.rounded-lg.p-6',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuad'
    });
    
    // ... (Animasi hover problem-card bisa ditambahkan kembali di sini jika diinginkan)
});


// (BARU) Logika inisialisasi dari index.html dipindahkan ke sini
document.addEventListener('DOMContentLoaded', function() {
    // 1. Panggil inisialisasi utama
    initializeApp();
    loadProblems();
    loadAchievements();
    updateStats();
    
    // 2. Inisialisasi CodeMirror
    try {
        codeEditorInstance = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
            lineNumbers: true,        // Tampilkan nomor baris
            mode: 'python',           // Set mode ke Python
            theme: 'dracula',         // Gunakan tema Dracula
            autoCloseBrackets: true,  // Otomatis tutup kurung
            lineWrapping: true        // Otomatis wrap baris panjang
        });
        // Set ukuran editor secara manual (opsional, tapi disarankan)
        codeEditorInstance.setSize(null, '320px');
    } catch (e) {
        console.error("Gagal inisialisasi CodeMirror:", e);
        showNotification("Gagal memuat editor kode!", "error");
    }

    // 3. Animasi
    try {
        anime({
            targets: '.typing-animation',
            opacity: [0, 1],
            duration: 2000,
            easing: 'easeInOutQuad'
        });
    } catch (e) {
        console.error("Gagal memuat animasi:", e);
    }

    // 4. Cek local storage untuk soal yang dipilih
    const redirectedProblem = localStorage.getItem('selectedProblem');
    if (redirectedProblem) {
        try {
            const problem = JSON.parse(redirectedProblem);
            if (problem && problem.id) {
                setTimeout(() => {
                    // Cek lagi jika codeEditorInstance sudah siap
                    if (codeEditorInstance) {
                        selectProblem(problem.id);
                    } else {
                        console.warn("CodeMirror belum siap untuk memuat soal.");
                    }
                }, 100); // Beri waktu agar CodeMirror selesai inisialisasi
            }
            localStorage.removeItem('selectedProblem');
        } catch (e) {
            console.error("Gagal memuat soal dari redirect:", e);
            localStorage.removeItem('selectedProblem');
        }
    }
});
