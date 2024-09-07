import React from 'react';
import ChatRoomList from './components/ChatRoomList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>채팅 애플리케이션</h1>
      </header>
      <main>
        <ChatRoomList />
      </main>
    </div>
  );
}

export default App;
