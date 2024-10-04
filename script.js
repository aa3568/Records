// تحويل الصوت إلى نص باستخدام Web Speech API
const recordBtn = document.getElementById('record-btn');
const stopBtn = document.getElementById('stop-btn');
const transcriptTextArea = document.getElementById('transcript');
let recognition;
let isRecording = false;  // حالة التسجيل

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

    recognition.onend = () => {
        // عندما يتوقف التعرف عن العمل، تحقق مما إذا كنا لا نزال في حالة التسجيل
        if (isRecording) {
            // إعادة بدء التسجيل
            recognition.start();
        } else {
            // إعادة تمكين الأزرار
            recordBtn.disabled = false;
            stopBtn.disabled = true;
        }
    };

    // البدء بالتسجيل الصوتي وتحويله إلى نص
    recordBtn.addEventListener('click', () => {
        isRecording = true;  // تحديد أن التسجيل جارٍ
        recognition.start();
        recordBtn.disabled = true;
        stopBtn.disabled = false;
    });

    // إيقاف التحدث
    stopBtn.addEventListener('click', () => {
        isRecording = false;  // تحديد أن التسجيل توقف
        recognition.stop();
    });
} else {
    alert('المتصفح الذي تستخدمه لا يدعم ميزة التعرف على الصوت.');
}
