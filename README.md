# Personal Expenses Tracker App

A minimal and functional mobile application for tracking personal expenses. Built with React Native and Firebase, this app allows users to securely manage their financial transactions from their mobile devices.

## 🚀 Features

- 🔐 Email/password authentication (Firebase Auth)
- ➕ Add, edit, delete expenses
- 📋 View expense list sorted by date (latest first)
- 📅 Date picker for selecting transaction dates
- 🗂️ Category selection (e.g., Food, Transport, Bills)
- 💰 Multi-currency support
- 🎨 Clean and minimal UI
- 🔒 Secure per-user data access (Firestore rules)
- ⚙️ State management with Redux Toolkit

## 🛠️ Tech Stack

- **Frontend:** React Native (CLI setup), TypeScript
- **Backend:** Firebase (Authentication + Firestore Database)
- **State Management:** Redux Toolkit
- **UI Library:** Native styles

## 📦 Installation & Setup

1. **Clone the repo**
   git clone https://github.com/your-username/expenses-tracker.git
   cd expenses-tracker
   

2. **Install dependencies**
   npm install

3. **Configure Firebase**
   - Create a Firebase project.
   - Enable Email/Password authentication.
   - Create a Firestore database.
   - Replace your Firebase config inside the app.

4. **Run the app**
   npx react-native run-android # or run-ios

## 🤔 Why Firebase?

Firebase was chosen for its simplicity and strong integration with React Native:
- Easy setup for authentication data storage
- Built-in security rules for access control
- Scalable for future growth

## 🧪 Known Issues / Limitations

- No offline support implemented.
- No persistent login if user manually clears app data.
- No unit tests added (optional based on scope).

## 👨‍💻 Author
- Your Name – Volodymyr

## 📲 Demo APK
To test the app without setting up the environment locally, you can download the prebuilt APK:

👉 Download ExpensesApp.apk
https://drive.google.com/file/d/102zbStXeSiOUPpYS6y-Xs-vjz7utXcaO/view?usp=drive_link

⚠️ The app is built with real Firebase credentials. Before committing the code to the repository, the firebaseConfig.ts file was replaced with a placeholder version containing fake keys.

If you'd like to run the project locally with your own Firebase setup, rename firebaseConfig.example.ts to firebaseConfig.ts and paste your credentials there.
