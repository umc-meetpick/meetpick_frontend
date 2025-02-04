import { createContext, useContext, useState, ReactNode } from "react";

// Message 타입 정의
interface Message {
  question?: string[];
  direction: "incoming" | "outgoing"; // 방향을 제한하여 오류 방지
  type?: "last"
}

// Context 데이터 타입 정의
type ChatContextType = {
  messages: Message[];
  addMessage: (message: Message) => void;
  resetMessages: () => void; 
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

// ChatProvider Props 타입 정의
interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  // 메시지 추가 함수
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const resetMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, resetMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
