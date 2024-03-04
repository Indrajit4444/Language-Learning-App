

# Language Learning App

<p align="left"><a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a>   <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> </a> 
<a href="https://babeljs.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/babeljs/babeljs-icon.svg" alt="babel" width="40" height="40"/> </a> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a></p>

A Full Stack Web Application based on MERN. After creating an account a user will receive a MCQ question on their screen. On clicking to any of the option, the right and wrong answer will be colored. By pressing Next user will receive next question. In the beginning the question will be easy type. If a user answered 3 question consecutively right user will be upgraded to next level and so on, but if user consecutively answered 3 wrong answer he will be degraded to previous level. User can see their progress on progress bar and also can reset their progress. User can also add a question by clicking the Add Question button.
<p align="center">
<img src="https://github.com/Indrajit4444/Language-Learning-App/assets/91719986/d7c0aa73-5a68-4276-a357-6b9bada15eb3 " width="45%">
<img src="https://github.com/Indrajit4444/Language-Learning-App/assets/91719986/785ae15e-e39e-4654-82f5-be70fefcece6" width="45%">
<img src="https://github.com/Indrajit4444/Language-Learning-App/assets/91719986/ff308f5a-c1a1-450d-9f98-36bfb74a41ee" width="45%">
<img src="https://github.com/Indrajit4444/Language-Learning-App/assets/91719986/98e454e4-bca6-4f68-9751-cc15d67a04cc" width="45%">
</p>

### How to Setup:

 Install and setup Latest version of `Node Js` and `MongoDB` in your system. Open up your terminal and and cd over to both server and client and type command
 `npm init`
 Create a database name `LanguageGameDB` in your system ( I used my local system if you want to use another change the link on `server/server.js-> Line 20`) . Update the lists of `server/allowedSites.js` to update the frontend address that are allowed to communicate with server. Update `client/src/baseUrl.js` to your backend address.
 Now Create some demo question on `LanguageGameDB` with the collection name of `questions` and follow the schema from `server/models/question.js`.
 Now create some account and see the question appear in the screen.
 
### On This Commit:

- Used CORS for communication of different origin