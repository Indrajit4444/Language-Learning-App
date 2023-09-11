
# Language Learning App

*This app is under Development.*

Language Learning App is solely focused on to improve your language skills.

  

### How to Setup:

 Install and setup Latest version of `Node Js` and `MongoDB` in your system. Open up your terminal and and cd over to both server and client and type command
 `npm init`
 Create a database name `LanguageGameDB` in your system ( I used my local system if you want to use another change the link on `server/server.js-> Line 11`) . 
 Now Create some demo question on `LanguageGameDB` with the collection name of `questions` and follow the schema from `server/models/question.js`.
 Now create some account and see the question appear in the screen. For now I haven't yet implemented browsing of question so to see any question on frontend just change the user data (the user who is logged on that time) from users collection. Change `lasttypeOfQs` (last type of question attended (easy, medium, hard)) and change the question number accordingly.
 
### On This Commit:
On this first commit I implemented LogIn, Register, Authentication, connection with MongoDB, Question and user Database.

Also setup the system where REACT client display question by api calling and server send correct answer in response whenever a user clicked any option and client display right and wrong answers by color.

When user press next user will get new question.

if user gets 3 right answers consicutively he/she will receive harder question and if user gets 3 wrong answers consicutively he/she will get easier question.

Added Progress Section (Currently in Dummy Mode).
### Upcoming  Changes:

 - Progress section is in dummy mode will be functional
 - A reset section will be introduced that can wipe out users progress
 - A feature will be introduced where a user can add new question  