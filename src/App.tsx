import AppLayout from '@/layouts/AppLayout';
import { useGlobalStore } from '@/store/globalStore';
import Chats from './pages/Chats';
import Home from './pages/Home';


const App = () => {
    const globalStore = useGlobalStore();
    return (
        <AppLayout>
            {
                globalStore.isChatting ? <Chats /> : <Home/>
            }
        </AppLayout >
    );
};

export default App;