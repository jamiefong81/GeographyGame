# GeographyGame

## Info
Name: Jamie Fong
Email: jamie.fong@vanderbilt.edu


## Video Demo
In case I completely messed something up when uploading this onto Github, here is a video demo of my web app:
https://streamable.com/5lacac

## How To Run
1. Ensure all necessary packages are downloaded by running "npm install"
2. Go into ./backend folder
3. Run "node .\processData.js"
4. Then in ./frontend folder, run "npm start"

## Explantion
This application is built using React for the front-end and Node/Express for the backend. I also utilized Bootstrap to help with the design.

To create the accounts and the leader board, I used MongoDB to store the usernames, passwords, and scores.

The general geography questions are from the OpenTDB API. Because state capitals are the constant and there are only 50 of them, I decided to just use a CSV file. The flag questions are made using flagsapi. However, flagsapi only has country codes not the country name, so I used restcountries to get the name.

## If I Had More Time
If I had more time, I would've found a way to produce hints. Initially, I planned to use AI to produce the hints, but that ended up costing money. I did manage to get one AI to work from AI/ML, but it didn't work well because it just gave the answer everytime.

I also would've increased the type of games that I had. I would've done more complex games like given this country name, click it on the map. Or name as many countries as you can in one minute.

Additionally, I would've made the login more secure. I realize the authentication is not the most secure. I did it this way as a proof of concept, but given more time, I would've included hashing and salting or even have used Google OAuth so users could sign in with Google.

## Concluding Thoughts
I truly enjoyed doing this project. It allowed me to get more experience in React and with conditional rendering. This also gave me time working with authentication (though a cheeto defense), which is something I haven't had a lot of experience with. I am thankful for the opportunity to improve my skills and to learn more about different aspects of web design.
