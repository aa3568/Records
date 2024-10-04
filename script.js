/* إعدادات عامة */
body {
    font-family: 'Cairo', sans-serif;
    background-color: #1e1e1e;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background-color: #2c2c2c;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
    color: #fff;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #f1f1f1;
}

.controls {
    margin-bottom: 20px;
}

.btn {
    background-color: #ff9800;
    border: none;
    color: #fff;
    padding: 15px 20px;
    border-radius: 50px;
    font-size: 18px;
    cursor: pointer;
    margin: 10px;
    transition: background-color 0.3s ease;
}

.btn:disabled {
    background-color: #666;
    cursor: not-allowed;
}

.btn:hover {
    background-color: #e67e22;
}
