import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import addMonumento from "./resolvers/addMonumento.ts";
import getMonumentos from "./resolvers/getMonumentos.ts";
import getMonumentoID from "./resolvers/getMonumentoID.ts";
import deleteMonumento from "./resolvers/deleteMonumento.ts";
import updateMonumento from "./resolvers/updateMonumento.ts";


const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); //

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
await mongoose.connect(MONGO_URL);
console.info("Conectado a mongo")
}catch(e){
console.error(e);
}
const app = express();
app.use(express.json());

//endpoints
app
.post("/api/monumentos", addMonumento)
.delete("/api/monumentos/:id", deleteMonumento)
.get("/api/monumentos", getMonumentos)
.get("/api/monumentos/:id", getMonumentoID)
.put("/api/monumentos/:id", updateMonumento)

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
