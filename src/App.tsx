import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatRoomListPage from "./pages/ChatRoomListPage";
import ChatRoomPage from "./pages/ChatRoomPage";


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/chatrooms" element={<ChatRoomListPage />} />
                <Route path="/chatroom/:roomId" element={<ChatRoomPage />} />
            </Routes>
        </Router>
    );
};

export default App;
