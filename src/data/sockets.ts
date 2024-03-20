export const defaultSocketUrl = "wss://echo.websocket.org";
export const appSocketUrl = import.meta.env.PROD ? "wss://ranonchat-backend.vercel.app" : "ws://localhost:3000";