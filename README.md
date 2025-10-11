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
