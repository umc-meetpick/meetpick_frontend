import  { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProfileContextProvider } from './context/profileInfoContext.tsx'
import { ChatProvider } from "./context/useChatContext.tsx"
import { FoodProfileContextProvider } from './context/foodProfileInfo.tsx'
import { ExerciseProfileContextProvider } from './context/exerciseInfoContext.tsx'
import { StudyProfileContextProvider } from './context/studyInfoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfileContextProvider>
      <ChatProvider>
        <FoodProfileContextProvider>
          <ExerciseProfileContextProvider>
            <StudyProfileContextProvider>
              <App />
            </StudyProfileContextProvider>
          </ExerciseProfileContextProvider>
        </FoodProfileContextProvider>
      </ChatProvider>
    </ProfileContextProvider>
  </StrictMode>,
)

