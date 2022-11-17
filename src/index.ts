import { Server } from "./server";

let server = new Server().app;

let port = 5100;

server.listen(port, () => { 
    console.log(`Iksana : PORT ${port}`);
});






