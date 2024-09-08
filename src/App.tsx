import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatRoom from "./pages/ChatRoom";


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/chatrooms" element={<ChatRoom />} />
            </Routes>
        </Router>
    );
};

export default App;
