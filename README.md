# Weather App - [Live Link](https://weather-app-eight-henna.vercel.app/)

Weather app using the Weatherapi API, See the [weatherapi.com API documentation](https://www.weatherapi.com/docs/) for more information.

## Description

This is a weather app that displays the current weather, hourly forecast, and 7-day forecast for a given location. The app uses the Weatherapi API to fetch weather data. The user can toggle between Celsius/Fahrenheit and Metric/Imperial units. The settings panel is a modal that is positioned next to the settings button. The app automatically gets the user's location and uses it as the default city value. The user can search for a city and navigate to it. The search input is debounced to reduce API requests until the user completes typing. The app is responsive and works on mobile, tablet, and desktop devices with smooth transitions.

## Features

- Real-time weather forecast (current, hourly, and 7-day)
- Toggle between Celsius/Fahrenheit and Metric/Imperial units
- Configurable settings panel with a modal positioned next to the settings button
- Smooth transitions with Vue.js
- Automatically get the user's location and use it as the default city value
- Search for a city and navigate to it
- Debounced search input to reduce API requests until the user completes typing

## Project Build Stacks and Tools

This project was built with the following technologies and tools:

- **Framework**: Vue.js 3.5
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS – A utility-first CSS framework used for responsive and consistent styling across components.
- **HTTP Requests**: Axios – Axios is configured with a custom client (axios.create) to handle API requests, setting the base URL, headers, and API key.
- **Date Formatting**: moment.js – Used for handling date and time formatting, such as determining day/night and displaying formatted timestamps.
- **Slider**: Swiper.js – Provides a smooth slider experience for displaying the hourly weather forecast.
- **Tooltips**: Tippy.js – Adds tooltips to the app, such as in the AQI (Air Quality Index) section in the current weather.
- **Linting & Formatting**: ESLint and Prettier – Used to enforce consistent code style and formatting, helping maintain code readability and quality.
- **Icons**: Custom SVG icons – Sourced from Figma designs specific to this app.
- **SVG Handling**: vite-svg-loader – Enables SVGs to be imported and used as Vue components, which simplifies icon integration.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YerrouHamza/Weather-app.git
   ```
2. Navigate to the project folder:
   ```bash
   cd Weather-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Instructions on how to run or use the project.

- **Development server**:
  ```bash
  npm run dev
  ```
- **Build for production**:
  ```bash
  npm run build
  ```
