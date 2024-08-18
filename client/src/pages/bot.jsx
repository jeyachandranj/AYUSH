import React, { useState } from 'react';
import './bot.css'; 
const Bot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input,setInput]=useState("");
    const [messages, setMessages] = useState([]);
    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };
    const handleSendMessage = () => {
        fetch('http://localhost:5000/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(typeof data);
            setMessages([...messages, {
                sender: 'user',
                text: input,
            },
            {
                sender: 'bot',
                text: data.output,
            }]);
            setInput('');
            })
            .catch(error => console.error('Error:', error));
    };
    
    function handleChange(event){
        setInput(event.target.value);
    }
    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {!isOpen && <div className="chatbot-icon" onClick={toggleChatbot}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1TquK3v0EcAM-B1UrmEl-Crdmmj-iSJcHng&s" alt="Chatbot" width="150px" height="150px" className='bot-image'/>
            </div>}
            { isOpen && <div className="chatbot-window">
                <div className="chatbot-header">
                    <h2>Chatbot</h2>
                    <button onClick={toggleChatbot} className='close-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </button>
                </div>
                <div className="chatbot-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={"message-text "+message.sender}>
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className="chatbot-input fixed-bottom">
                    <input type="text" placeholder="Type your message..." onChange={handleChange} value={input}/>
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>}
        </div>
    );
};

export default Bot;
