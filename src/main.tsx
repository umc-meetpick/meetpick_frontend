import  { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProfileContextProvider } from './context/profileInfoContext.tsx'
import { ChatProvider } from "./context/useChatContext.tsx"
import { FoodProfileContextProvider } from './context/foodProfileInfo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfileContextProvider>
      <ChatProvider>
        <FoodProfileContextProvider>
          <App />
        </FoodProfileContextProvider>
      </ChatProvider>
    </ProfileContextProvider>
  </StrictMode>,
)
