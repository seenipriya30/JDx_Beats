import { createRoot } from "react-dom/client";
import AuthContext from "./context/AuthContext";
import UserContext from "./context/UserContext";
import App from "./App";
import AlbumContext from "./context/AlbumContext";
import AudioPlayerContext from "./context/AudioPlayerContext";

createRoot(document.getElementById("root")).render(<AuthContext>
    <UserContext>
        <AlbumContext>
            <AudioPlayerContext>
            <App/>
            </AudioPlayerContext>
        </AlbumContext>
    </UserContext>
</AuthContext>)