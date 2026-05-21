import "dotenv/config";
import app from "./app.js";

const HOST = process.env.HOST ?? "localhost";
const PORT = Number(process.env.PORT ?? 3000);

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
