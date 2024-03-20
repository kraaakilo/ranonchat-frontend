export const defaultSocketUrl = "wss://echo.websocket.org";
export const appSocketUrl = import.meta.env.PROD ? "wss://ranonchat-backend.onrender.com" : "ws://localhost:3000";