import express from "express";
import cookieParser from "cookie-parser";
import clientesRoute from "./src/routes/clientes.js"
import registroclientesRoute from "./src/routes/registroClientes.js"
import peliculasRoute from "./src/routes/peliculas.js"
import empleadosRoute from "./src/routes/empleados.js"
import registroEmpleados from "./src/routes/registroEmpleados.js"


const app = express();

app.use(express.json()); 
app.use(cookieParser());

/****************** R U T A S **********************/

app.use("/api/clientes" , clientesRoute)
app.use("/api/peliculas" , peliculasRoute)
app.use("/api/empleados", empleadosRoute)
app.use("/api/registroClientes" , registroclientesRoute)
app.use("/api/registroEmpleados", registroEmpleados)

//Login




export default app;