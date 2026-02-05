import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

const App = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl">Home App - Standalone Mode</h1>
            <p className="text-gray-400 mt-4">
                This app exposes HomePage via Module Federation.
            </p>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
