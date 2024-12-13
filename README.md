
# Dolfin Application

## Overview

**Dolfin** is a comprehensive finance management application designed specifically for students. It empowers users to manage their finances effectively by adding budgets and tracking expenses. Based on the budget and recorded expenses, the app provides insightful analytics, allowing students to view detailed breakdowns of their spending habits.

The application visualizes data through intuitive charts and cards, making it easy for students to understand their expense patterns at a glance. By helping users monitor and control their spending, Dolfin aims to support financial literacy and smarter budgeting choices for students.

## Features

- **Add Budgets**: Set up budgets for different categories to manage spending limits.
- **Track Expenses**: Log daily expenses to monitor where money is being spent.
- **Analyze Spending**: Get a breakdown of expenses by category or time period.
- **Data Visualization**: View expense data through various charts and cards to understand financial habits.
- **Mobile Access**: Available on both iOS and Android platforms for ease of use on the go.

## Prerequisites

Ensure you have the following tools installed on your system:

- **Node.js**: Version v22.11.0
- **pnpm** (preferred), **yarn**, or **npm** as the package manager
- **React Native CLI**: Required to build and run the application
- **Xcode** (for iOS development) and **Android Studio** (for Android development)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/dolfin.git
   cd dolfin
   ```

2. **Install Dependencies:** Choose one of the following:

   - **pnpm** (preferred):

     ```bash
     pnpm install
     ```

   - **yarn**:

     ```bash
     yarn install
     ```

   - **npm**:

     ```bash
     npm install
     ```

3. **Install iOS Dependencies (for macOS users):**

   - **pnpm** (preferred):

     ```bash
     pnpm run ios-install
     ```

   - **yarn**:

     ```bash
     yarn ios-install
     ```

   - **npm**:

     ```bash
     npm run ios-install
     ```

## Running the Application

### For Android

- **pnpm** (preferred):

  ```bash
  pnpm run android
  ```

- **yarn**:

  ```bash
  yarn android
  ```

- **npm**:

  ```bash
  npm run android
  ```

### For iOS

- **pnpm** (preferred):

  ```bash
  pnpm run ios
  ```

- **yarn**:

  ```bash
  yarn ios
  ```

- **npm**:

  ```bash
  npm run ios
  ```

## Scripts

The project includes several scripts for development and maintenance:

- **android**: Runs the application on an Android device or emulator.
- **ios**: Runs the application on an iOS simulator.
- **start**: Starts the development server and clears any previous cache.
- **lint**: Runs ESLint to check the code for errors and stylistic issues.
- **test**: Runs unit tests using Jest.
- **format**: Formats code files using Prettier.
- **ios-install**: Clears iOS build cache and installs dependencies.
- **open-xcode**: Opens the iOS project in Xcode for further customization and testing.

## Libraries and Tools Used

### Core Libraries

- **React Native**: A JavaScript framework for building mobile applications.
- **React Navigation**: Handles screen navigation (`@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`).
- **UI Components**: Using `@rneui/themed` for ready-to-use UI components and themes.
- **State Management**: Asynchronous storage through `@react-native-async-storage/async-storage`.

### Additional Dependencies

- **Supabase**: Provides backend services for real-time data and authentication (`@supabase/supabase-js`).
- **React Native Toast**: Displays toast notifications (`react-native-toast-message`).
- **React Native Fast Image**: Optimized image handling (`react-native-fast-image`).
- **Gesture Handling**: Gesture support and animations using `react-native-gesture-handler` and `react-native-reanimated`.
- **SVG Support**: Renders SVG images using `react-native-svg` and `react-native-svg-transformer`.

### Development and Testing Tools

- **TypeScript**: Type-safe development for better code quality.
- **ESLint**: Enforces code consistency.
- **Prettier**: Automatically formats code.
- **Jest**: Testing framework for running unit tests.

## Node Compatibility

This project is compatible with **Node.js v22.11.0**. Ensure your environment is updated to this version or higher as specified in the `package.json` file.

## Project Structure

The project follows a modular structure for maintainability and scalability. Key directories include:

- `src`: Contains core application code.
- `components`: Reusable UI components.
- `screens`: Main screens for various parts of the application.
- `navigation`: Configuration for app navigation.
- `services`: External services, such as Supabase integration.
- `assets`: Static resources, including images and icons.
