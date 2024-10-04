// تحويل الصوت إلى نص باستخدام Web Speech API
const recordBtn = document.getElementById('record-btn');
const stopBtn = document.getElementById('stop-btn');
const transcriptTextArea = document.getElementById('transcript');
let recognition;

// تحقق من دعم المتصفح لواجهات API المطلوبة
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA'; // اللغة العربية
    recognition.continuous = true;  // يسمح بالاستمرار في التسجيل
    recognition.interimResults = true;  // لعرض النص أثناء الحديث

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        transcriptTextArea.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error("حدث خطأ:", event.error);
    };

    // البدء بالتسجيل الصوتي وتحويله إلى نص
    recordBtn.addEventListener('click', () => {
        recognition.start();
        recordBtn.disabled = true;
        stopBtn.disabled = false;
    });

    // إيقاف التحدث
    stopBtn.addEventListener('click', () => {
        recognition.stop();
        recordBtn.disabled = false;
        stopBtn.disabled = true;
    });
} else {
    alert('المتصفح الذي تستخدمه لا يدعم ميزة التعرف على الصوت.');
}
