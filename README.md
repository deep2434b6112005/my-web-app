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



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WalkBuddy</title>
  <link rel="stylesheet" href="walk.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
  <!-- Top header -->
  <div class="head" style="display:flex; justify-content:space-between; align-items:center; padding:10px;">
    <h1 style="color: blue;">WalkBuddy</h1>
    <div class="profile-menu">
      <button class="profile-button">M</button>
      <div class="dropdown-content">
        <a href="#">Find Friends</a>
        <a href="#">My Profile</a>
        <a href="#">Settings</a>
        <a href="#">Apps</a>
        <a href="#">Subscriber Perks</a>
        <a href="#">Log Out</a>
      </div>
    </div>
  </div>

  <!-- Intro Section -->
  <div class="intro" style="display:flex; align-items:center; gap:20px; padding:20px;">
    
    <!-- Image -->
    <div style="flex:1;">
      <img src="http://localhost:3000/image/walk.webp" alt="Walking buddies" style="border-radius:10px; max-width:100%; height:auto;">
      
    </div>

    <!-- Text -->
    <div class="intro-left" style="flex:1;">
      <h1 style="font-size:60px;">Find walking buddies nearby — walk safer, walk happier</h1>
      <p style="font-size:30px;">Quickly find local walkers by time, pace, and route. Schedule walks, RSVP, and share routes.</p>
      <div>
        <button style="box-shadow:0 7px 29px rgba(100,100,111,0.2); width:160px; height:50px; border-radius:20px; margin:10px;">Explore buddies</button>
        <button style="box-shadow:0 7px 29px rgba(100,100,111,0.2); width:160px; height:50px; border-radius:20px; margin:10px;">Favorite Companion</button>
      </div>
    </div>
  </div>

<div style="margin-bottom: 20px;">
<div>
  <h1>Quick Book</h1>
<div style="display: flex;">
  <!--morning-->
  <div style="margin: 20px;">
    <img src="http://localhost:3000/image/morning.webp" style="width: 480px; height: 480px; border-radius: 20px;" class="slot"> 
    <h2>Morning Stroll</h2>
    <h3>6:00 AM - 7:00 AM</h3>
  </div>
<!--evening-->
  <div style="margin: 20px;" >
    <img src="http://localhost:3000/image/evening.webp" style="width: 480px; height: 480px; border-radius: 20px; " class="slot"> 
    <h2>Evening Walk</h2>
    <h3>6:00 PM - 7:00 PM</h3>
  </div>
<!--week end-->
  <div style="margin: 20px; padding-right: 20px;">
    <img src="http://localhost:3000/image/week.webp" style="width: 480px; height: 480px; border-radius: 20px;" class="slot"> 
    <h2>Weekend Hike </h2>
      <h3>9:00 AM -11:00 AM<h3>
    
    
  </div>
  </div>

</div>
</div>

<!--bar home,map,friends,bookmark,profile-->
<div class="bar" >

  <p style="padding-left: 35px;">
    <i class="fa-solid fa-house"></i>
    <button style="border: none;background-color: white;">HOME</button>
  </p>
  <p>
    <i class="fa-solid fa-map-location-dot"></i>
    <button style="border: none;background-color: white;" >MAP</button>
  </p>
  <p>
    <i class="fa-solid fa-user-group"></i>
    <button style="border: none;background-color: white;" onclick="window.location.replace('friend.html')">FRIENDS</button>
  </p>
  <p>
    <i class="fa-solid fa-bookmark"></i>
  <button style="border: none;background-color: white;">BOOKMARK</button>
  </p>
  <p>
    <i class="fa-solid fa-user"></i>
  <button style="border: none;background-color: white;" onclick="">PROFILE</button>  
  </p>
</div>
</body>
</html>
