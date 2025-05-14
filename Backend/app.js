import express from "express";
import cookieParser from "cookie-parser";
import clientesRoute from "./src/routes/clientes.js"
import registroclientesRoute from "./src/routes/registroClientes.js"
import peliculasRoute from "./src/routes/peliculas.js"
import empleadosRoute from "./src/routes/empleados.js"
import registroEmpleadosRoute from "./src/routes/registroEmpleados.js"
import recuperacionContraRoute from "./src/routes/recuperacionContra.js"
import loginRoute from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js";


const app = express();

app.use(express.json()); 
app.use(cookieParser());


/****************** R U T A S **********************/

app.use("/api/clientes" , clientesRoute)
app.use("/api/peliculas" , peliculasRoute)
app.use("/api/empleados", empleadosRoute)
app.use("/api/registroClientes" , registroclientesRoute)
app.use("/api/registroEmpleados", registroEmpleadosRoute)

//Login
app.use("/api/login" , loginRoute)
app.use("/api/logout", logoutRoutes)
app.use("/api/recuperacionContra" , recuperacionContraRoute)



export default app;