# React + TypeScript + Vite

This project provides a minimal setup to get React working in Vite with HMR and some ESLint rules, integrated with a Flask backend server.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- Python (for Flask server)
- Virtualenv (for creating a virtual environment for Flask)

### Setup Instructions

1. **Install Dependencies**

   - Navigate to the project root directory and run:
     ```bash
     npm install
     ```
   - For the Flask server, create a virtual environment and install dependencies:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     ```

2. **Launch the Flask Server**

   - Activate the virtual environment:
     ```bash
     source venv/bin/activate
     ```
   - Start the Flask server by running:
     ```bash
     python server.py
     ```
   - The Flask server will run on `http://localhost:3002`.

3. **Run the Frontend (Chatbot Interview)**

   - In a new terminal, navigate to the chatbot interview project directory.
   - Start the frontend development server with:
     ```bash
     npm run dev
     ```
   - This will launch the Vite development server on `http://localhost:5173`.

### Additional Configuration

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the ESLint configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```
