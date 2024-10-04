// تحويل الصوت إلى نص باستخدام Web Speech API
const recordBtn = document.getElementById('record-btn');
const stopBtn = document.getElementById('stop-btn');
const transcriptTextArea = document.getElementById('transcript');
let recognition, mediaRecorder, audioChunks = [];

// تحقق من دعم المتصفح لواجهات API المطلوبة
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA'; // اللغة العربية
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        transcriptTextArea.value = transcript;
    };

    // البدء بالتسجيل الصوتي
    recordBtn.addEventListener('click', async () => {
        audioChunks = [];
        recognition.start();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.start();
        recordBtn.disabled = true;
        stopBtn.disabled = false;
    });

    // إيقاف التسجيل الصوتي
    stopBtn.addEventListener('click', () => {
        recognition.stop();
        mediaRecorder.stop();

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = 'recorded_audio.wav';
            link.click();
        };

        recordBtn.disabled = false;
        stopBtn.disabled = true;
    });
} else {
    alert('المتصفح الذي تستخدمه لا يدعم ميزة التعرف على الصوت.');
}
