
# Chat App

This is a chat application built using Next.js, React, Firebase, SCSS, React Bootstrap, and the Emojihub API. The app allows users to create an account using their email and password, search for other users by their display name, and add them to their account. Once added, both users can exchange messages, photos, and emojis.

## Installation

To run the app locally, clone the repository and run the following commands:

```
npm install
npm run dev
```

This will start the app in development mode on http://localhost:3000.

## Features

- **User authentication**: Users can create an account using their email and password and log in to access the app's features.

- **Adding and removing users**: Users can search for and add other users to their contacts. Removing a user will also remove them from the user's contact list, but won't delete messages sent between the two users.

- **Real-time message updates**: The app uses Firebase's Realtime Database to update messages in real-time, allowing users to see messages as they're sent and received without having to refresh the page.

- **Profile customization**: Users can change their display name and profile photo, which will be updated immediately for other users who have added them as a contact.

- **Message deletion**: Users can delete any messages they've sent.

- **Sending messages, photos, and emojis**: Users can send messages, photos, and emojis using the app's built-in input field and the Emojihub API.

- **message timestamp**: Each message sent has timestamp indicating when the message was sent

- **Emoji support**: The app uses the Emojihub API to fetch a list of emojis that users can use in their messages.

- **User presence**: The app shows when a user is online or offline with a small circle beside their display name. The circle will turn green when the user is online and gray when they are offline.

- **Last message and message timestamp**: Each user has a section that shows the last sent message.

## Technologies Used

- Next.js
- React
- Firebase
- SCSS
- React Bootstrap
- Emojihub API

## Future Improvements

- Allowing users to block other users.
- Implement push notifications for new messages or other events in the app using Firebase Cloud Messaging or a third-party service like OneSignal.
- Allowing users to react to messages with emojis or other icons, similar to how Facebook Messenger or Slack works.
