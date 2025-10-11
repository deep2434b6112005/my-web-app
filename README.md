<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <!-- head -->
    <header>
        <div class="navbar">
            <div class="logo">WalkBuddy</div>
            <nav>
                <ul>
                    <li><a href="login.html" class="login-btn">Login</a></li>
                    <li><a href="register.html" class="register-btn">Register</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Login Form -->
    <div class="form-container">
       <form class="login-form" action="http://localhost:3000/login" method="POST">
    <h2>Account Login</h2>
    <hr>
    <div class="input-box">
        <span class="icon">👤</span>
        <input type="email" name="email" placeholder="Enter your email" required>
    </div>
    <div class="input-box">
        <span class="icon">🔒</span>
        <input type="password" name="password" placeholder="Enter your password" required>
    </div>
    <div class="options">
        <label><input type="checkbox"> Remember Me</label>
    </div>
    <button type="submit" class="login-submit">Login</button>
</form>

    </div>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register Page</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <!-- Navbar -->
    <header>
        <div class="navbar">
            <div class="logo">WalkBuddy</div>
            <nav>
                <ul>
                    
                    <li><a href="login.html" class="login-btn">Login</a></li>
                    <li><a href="register.html" class="register-btn">Register</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Registration Form -->
    <div class="form-container">
       <form class="login-form" action="http://localhost:3000/register" method="POST">
    <h2>Create Account</h2>
    <hr>
    <div class="input-box">
        <span class="icon">👤</span>
        <input type="text" name="name" placeholder="Enter your full name" required>
    </div>
    <div class="input-box">
        <span class="icon">📧</span>
        <input type="email" name="email" placeholder="Enter your email" required>
    </div>
    <div class="input-box">
        <span class="icon">🔑</span>
        <input type="password" name="password" placeholder="Create a password" required>
    </div>
    <div class="input-box">
        <span class="icon">🔒</span>
        <input type="password" placeholder="Confirm your password" required>
    </div>
    <div class="options">
        <label><input type="checkbox" required> I agree to the Terms & Conditions</label>
    </div>
    <button type="submit" class="login-submit">Register</button>
</form>

    </div>
</body>
</html>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}


body {
    background: #1e1e1e;
    color: #000;
}


header {
    background: #000;
    padding: 15px 50px;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 25px;
}

nav ul li a {
    text-decoration: none;
    color: #fff;
    font-size: 16px;
    transition: 0.3s;
}

nav ul li a:hover {
    color: #c5c5c5;
}

/* Login & Register Buttons */
.login-btn {
    background: #fff;
    color: #000;
    padding: 6px 14px;
    border-radius: 8px;
}

.register-btn {
    background: #8b5d5d;
    color: #fff;
    padding: 6px 14px;
    border-radius: 8px;
}


.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
}

.login-form {
    background: #fff;
    padding: 40px 30px;
    border-radius: 15px;
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
    width: 320px;
    text-align: center;
}


.login-form h2 {
    margin-bottom: 10px;
    font-weight: bold;
}


.input-box {
    display: flex;
    align-items: center;
    background: #f1f1f1;
    border-radius: 25px;
    margin: 15px 0;
    padding: 10px 15px;
}

.input-box .icon {
    font-size: 18px;
    margin-right: 8px;
}

.input-box input {
    border: none;
    outline: none;
    background: transparent;
    flex: 1;
    font-size: 14px;
    color: #333;
}

.options {
    text-align: left;
    margin: 10px 0;
    font-size: 14px;
}

.login-submit {
    width: 100%;
    background: #8b5d5d;
    color: #fff;
    border: none;
    border-radius: 25px;
    padding: 12px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
    transition: 0.3s;
}

.login-submit:hover {
    background: #734c4c;
}
