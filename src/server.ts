import { Server } from "http";
import app from "./app";
import config from "./config";

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

bootstrap();
