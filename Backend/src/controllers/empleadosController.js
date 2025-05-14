const empleadosController = {};
import empleadosModel from "../models/Empleados.js";


/********************** S E L E C T **************************/


empleadosController.getEmployees = async (req , res) => {
    const employees = await empleadosModel.find()
    res.json(employees)
};


/********************** D E L E T E **************************/


empleadosController.deleteEmployees = async (req , res) => {
    await employeesModel.findByIdAndDelete(req.params.id)
    res.json({message: "El registro del empleado se ha eliminado"})
};


/********************** U P D A T E **************************/


empleadosController.updateEmployees = async (req , res) => {
    const { nombre , correo , contrasenia , telefono , direccion , puesto , fecha_contratacion , salario , activo } = req.body;
    const updatedProduct = await empleadosModel.findByIdAndUpdate(req.params.id, { nombre , correo , contrasenia , telefono , direccion , puesto , fecha_contratacion , salario , activo } , {new: true})
    res.json({message: "El registro del empleado se ha actualizado"});
};


export default empleadosController;
