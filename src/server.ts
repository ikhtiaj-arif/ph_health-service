import { Server } from "http";
import app from "./app";

const port = 5000;

async function bootstrap() {
  const server: Server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrap();
