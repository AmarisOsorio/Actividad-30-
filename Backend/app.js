import express from "express";
import cookieParser from "cookie-parser";
import clientesRoute from "./src/routes/clientes.js"
import registroclientesRoute from "./src/routes/registroClientes.js"
import peliculasRoute from "./src/routes/peliculas.js"


const app = express();

app.use(express.json()); 
app.use(cookieParser());

/****************** R U T A S **********************/

app.use("/api/clientes" , clientesRoute)
app.use("/api/peliculas" , peliculasRoute)

//Login
app.use("/api/registroClientes" , registroclientesRoute)



export default app;