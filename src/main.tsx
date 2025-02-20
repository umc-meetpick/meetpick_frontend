import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ProfileContextProvider } from './context/profileInfoContext'
import { ChatProvider } from "./context/useChatContext"
import { FoodProfileContextProvider } from './context/foodProfileInfo'
import { ExerciseProfileContextProvider } from './context/exerciseInfoContext'
import { StudyProfileContextProvider } from './context/studyInfoContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <ProfileContextProvider>
      <ChatProvider>
        <FoodProfileContextProvider>
          <ExerciseProfileContextProvider>
            <StudyProfileContextProvider>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </StudyProfileContextProvider>
          </ExerciseProfileContextProvider>
        </FoodProfileContextProvider>
      </ChatProvider>
    </ProfileContextProvider>
)

