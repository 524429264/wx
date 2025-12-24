# WeChat H5 Replica (AI Powered)

A high-fidelity WeChat-style H5 mobile web application featuring AI-powered chat interactions, a contact list, a discovery feed (Moments), and full PWA support.

## 🌟 Features

- **AI Chat Experience**: Integrated with Google Gemini API for real-time, streaming responses. Chat with the "Gemini 智能助手" just like a real contact.
- **Mobile-First UI**: Crafted with Tailwind CSS to mimic the authentic WeChat H5 experience, including the navigation bar, chat bubbles, and the "Moments" (朋友圈) layout.
- **PWA Ready**: Supports Progressive Web App standards. Can be installed on mobile home screens for a standalone app experience.
- **Offline Capabilities**: Includes a service worker for basic asset caching.
- **Responsive Components**: 
  - `ChatList`: Manages conversation previews and unread counts.
  - `ChatWindow`: Handles message streaming and auto-scrolling.
  - `DiscoverView`: A replica of WeChat Moments with image support.
  - `Layout`: Responsive wrapper with safe-area support for mobile devices.

## 🛠 Tech Stack

- **React**: Modern functional components and hooks.
- **Tailwind CSS**: Utility-first styling for high-performance UI.
- **Google Gemini API (@google/genai)**: Powering the intelligent chat responses.
- **Service Workers**: For offline support and PWA functionality.

## 🚀 Getting Started

1. **API Key**: This app requires a valid Gemini API key provided via the environment variable `process.env.API_KEY`.
2. **Accessing the App**: Open the `index.html` in a modern browser. For the best experience, use a mobile device or toggle "Mobile View" in your browser's developer tools.
3. **PWA Installation**: On mobile browsers, use "Add to Home Screen" to install the app as a native-like experience.

## 📂 Project Structure

- `App.tsx`: Central state management and routing logic.
- `components/`: Modular UI components for different views.
- `services/`: API interaction logic.
- `types.ts`: TypeScript definitions for consistency.
- `manifest.json`: PWA configuration.
- `sw.js`: Service worker for caching.

## 📝 License

This project is created for educational and demonstration purposes. All visual assets (icons, layouts) are inspired by WeChat for design demonstration.
