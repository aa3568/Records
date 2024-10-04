// تحويل الصوت إلى نص باستخدام Web Speech API
const recordBtn = document.getElementById('record-btn');
const stopBtn = document.getElementById('stop-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
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

    let lastTranscript = '';  // لتخزين النص الأخير

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + ' '; // إضافة نص جديد مع مساحة
        }
        // تحقق مما إذا كان النص الجديد مختلفًا عن النص الأخير
        if (transcript !== lastTranscript) {
            lastTranscript = transcript;  // تحديث النص الأخير
            // إضافة النص الجديد إلى النص الموجود بدلاً من استبداله
            transcriptTextArea.value += transcript;
        }
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

    // مسح النص
    clearBtn.addEventListener('click', () => {
        transcriptTextArea.value = '';  // مسح النص الموجود
        lastTranscript = '';  // إعادة تعيين النص الأخير
    });

    // نسخ النص
    copyBtn.addEventListener('click', () => {
        transcriptTextArea.select();  // تحديد النص
        document.execCommand('copy');  // نسخ النص المحدد
    });
} else {
    alert('المتصفح الذي تستخدمه لا يدعم ميزة التعرف على الصوت.');
}
