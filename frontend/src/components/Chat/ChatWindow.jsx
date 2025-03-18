import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Send,
  Paperclip,
  PhoneCall,
  Video,
  UserPlus,
  Smile,
} from "lucide-react";
import chatWallpaper from "../../assets/photos/ChatWallpaper.jpg";

const AlloChat = ({ darkMode, socket }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data) => {
      setMessagesReceived((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
          type: "received",
        },
      ]);
    });

    socket.on("connect", () => {
      console.log("Connected to socket server");
      setMessagesReceived([
        { message: "userjoined" + socket.id, username: "you" },
      ]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("receive_message");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  const sendMessage = () => {
    if (messageText.trim()) {
      const messageData = {
        message: messageText,
        username: socket.id,
        room: room,
        __createdtime__: new Date().toLocaleTimeString(),
      };

      socket.emit("send_message", messageData);
      setMessagesReceived((prevMessages) => [
        ...prevMessages,
        { ...messageData, type: "sent" },
      ]);
      setMessageText("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Conversations List */}
      <div
        className={`w-1/4 p-4 border-r ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Conversations</h2>
        </div>
        <input
          type="text"
          placeholder="Rechercher des conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setRoom()}
          className={`w-full pl-10 pr-4 py-2 rounded-lg ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
          }`}
        />
      </div>

      {/* Conversation Details */}
      <div
        className={`w-3/4 flex flex-col ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
        style={{
          backgroundImage: `url(${chatWallpaper})`,
          backgroundSize: "cover",
        }}
      >
        (
        <>
          {/* Room Area */}
          <div>
            <input
              type="text"
              placeholder="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className={`flex-1 p-2 rounded-lg ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
              }`}
            />
            <button
              onClick={() => setRoom(room)}
              className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600"
            >
              asdasd
            </button>
          </div>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messagesReceived.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "sent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-lg mx-2 p-3 rounded-lg ${
                    message.type === "sent"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p className="font-semibold">{message.username}</p>
                  <p>{message.message}</p>
                  <p className="text-xs mt-1 text-gray-500">
                    {message.__createdtime__}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Message Input */}
          <div
            className={`p-4 border-t ${
              darkMode
                ? "border-gray-800 bg-gray-800"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Envoyer un message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className={`flex-1 p-2 rounded-lg ${
                  darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                }`}
              />
              <button
                onClick={sendMessage}
                className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </>
        ) : (
        <div className="flex-1 flex items-center justify-center">
          <p
            className={`text-xl ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Sélectionnez une conversation
          </p>
        </div>
        )
      </div>
    </div>
  );
};

export default AlloChat;
