# Chatting APP
### Chatting-app is a simple chat application with login authentication, multiple chat rooms, and file upload/download capabilities. The application is built using HTML, Bootstrap, and JavaScript. The application is built using HTML, CSS, Bootstrap, Javascript, Babel, and Webpack. It uses Firestore for real-time data storage and retrieval. 

## Features

- **User Authentication:** Log in with a username and password.
- **Room Selection:** Choose from different chat rooms: #general, #technical, #music.
- **Real-time Chat:** See messages and files in real-time.
- **File Upload:** Upload files to share with others.

## File Structure:

### Scripts/
- **index.html:** HTML file for the main application interface.
- **app.js:** JavaScript file handling UI interactions and Firestore communication.
- **chat.js:** JavaScript file defining the ChattingRoom class for managing chats.
- **ChatUI.js:** JavaScript file defining the ChatUI class for rendering chat messages.
### root/
- **styles.css:** Style functions related to the application.
- **webpack.config.cjs:** This file contains the config related to the webpack modules.



## **Fix Pending:** 
#### In Chat.js the update name condition needs a modification. Need to check on the if condition and if possible add a filter method instead of the if condition.
