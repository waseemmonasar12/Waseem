// --- خوارزمية التشفير البسيطة (Substitution Cipher) ---
// يمكنك تعقيدها لاحقاً، لكن هذه تجعل النص يبدو رائعاً كرموز
const charMap = {
    'ا': '∆', 'ب': '✦', 'ت': '⊚', 'ث': '☂', 'ج': '☾', 'ح': '⚡', 'خ': '✶', 
    'd': 'Ð', 'e': '€', 'f': '₣', 'g': '₲', 'h': 'Ħ', 'i': '!',
    ' ': '＿', '1': '⓵', '2': '⓶' 
    // ملاحظة: لغرض العرض، سنستخدم Base64 مع تعديلات بسيطة لضمان دعم كل الحروف
};

function customEncrypt(text) {
    // 1. تحويل النص إلى Base64 ليقبل كل اللغات
    let b64 = btoa(unescape(encodeURIComponent(text)));
    // 2. استبدال بعض الحروف برموز لجعلها تبدو سرية
    return b64.replace(/a/g, 'Ω').replace(/e/g, '∑').replace(/=/g, '♦').replace(/A/g, 'Ψ');
}

function customDecrypt(cipher) {
    try {
        // 1. إعادة الرموز إلى صيغة Base64 الأصلية
        let cleanB64 = cipher.replace(/Ω/g, 'a').replace(/∑/g, 'e').replace(/♦/g, '=').replace(/Ψ/g, 'A');
        // 2. فك تشفير Base64 إلى نص
        return decodeURIComponent(escape(atob(cleanB64)));
    } catch (e) {
        return "خطأ: الرموز غير صالحة!";
    }
}

// --- منطق الواجهة (UI Logic) ---

// إرسال رسالة في الشات
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const text = messageInput.value;
    if (text.trim() === "") return;

    // إنشاء عنصر الرسالة (رسالتي)
    const msgDiv = document.createElement('div');
    msgDiv.className = "flex justify-end animate-pulse"; // وميض بسيط عند الإرسال
    msgDiv.innerHTML = `
        <div class="bg-indigo-600 text-white px-4 py-2 rounded-l-xl rounded-br-xl max-w-xs md:max-w-md shadow-lg">
            <p>${text}</p>
            <span class="text-xs text-indigo-200 block mt-1 text-left">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
    `;
    
    chatBox.appendChild(msgDiv);
    messageInput.value = "";
    
    // التمرير لأسفل
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // إزالة تأثير الوميض بعد لحظة
    setTimeout(() => msgDiv.classList.remove('animate-pulse'), 500);

    // محاكاة رد تلقائي (للتجربة)
    setTimeout(() => receiveMockReply(), 1500);
}

function receiveMockReply() {
    const replies = ["مرحباً! هل استلمت الرموز؟", "أرسل لي الشفرة.", "تمام، الموقع يعمل بامتياز."];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    const msgDiv = document.createElement('div');
    msgDiv.className = "flex justify-start";
    msgDiv.innerHTML = `
        <div class="bg-gray-700 text-gray-200 px-4 py-2 rounded-r-xl rounded-bl-xl max-w-xs md:max-w-md shadow-lg">
            <p>${randomReply}</p>
            <span class="text-xs text-gray-400 block mt-1 text-right">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
    `;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// --- منطق أدوات التشفير ---

function toggleTools() {
    const tools = document.getElementById('crypto-tools');
    if (tools.classList.contains('scale-0')) {
        tools.classList.remove('scale-0');
        tools.classList.add('scale-100');
    } else {
        tools.classList.remove('scale-100');
        tools.classList.add('scale-0');
    }
}

function switchTab(mode) {
    const encryptPanel = document.getElementById('encrypt-panel');
    const decryptPanel = document.getElementById('decrypt-panel');
    const btnEncrypt = document.getElementById('btn-encrypt');
    const btnDecrypt = document.getElementById('btn-decrypt');

    if (mode === 'encrypt') {
        encryptPanel.classList.remove('hidden');
        decryptPanel.classList.add('hidden');
        btnEncrypt.className = "flex-1 py-1 text-sm bg-indigo-600 rounded text-white shadow transition";
        btnDecrypt.className = "flex-1 py-1 text-sm text-gray-300 transition";
    } else {
        encryptPanel.classList.add('hidden');
        decryptPanel.classList.remove('hidden');
        btnEncrypt.className = "flex-1 py-1 text-sm text-gray-300 transition";
        btnDecrypt.className = "flex-1 py-1 text-sm bg-indigo-600 rounded text-white shadow transition";
    }
}

function processEncryption() {
    const input = document.getElementById('plain-text').value;
    const result = customEncrypt(input);
    document.getElementById('cipher-result').value = result;
}

function processDecryption() {
    const input = document.getElementById('cipher-input').value;
    const result = customDecrypt(input);
    document.getElementById('plain-result').value = result;
}

function copyToClipboard(elementId) {
    const copyText = document.getElementById(elementId);
    copyText.select();
    document.execCommand("copy"); // طريقة قديمة لكنها مدعومة جيداً
    alert("تم نسخ الرموز!");
}
