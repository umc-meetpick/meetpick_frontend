import { createContext, useContext, useState, ReactNode } from "react";
import foodProfileQuery from "../assets/foodProfileQuery"; // 질문 데이터 가져오기

// Message 타입 정의
interface Message {
  question?: string[];
  direction: "incoming" | "outgoing"; // 방향을 제한하여 오류 방지
}

// Context 데이터 타입 정의
type ChatContextType = {
  messages: Message[];
  addMessage: (message: Message) => void;
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
  const [messages, setMessages] = useState<Message[]>([
    { question: foodProfileQuery[0].question, direction: foodProfileQuery[0].direction as "incoming" | "outgoing"}
  ]);

  // 메시지 추가 함수
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
