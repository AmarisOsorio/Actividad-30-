const clientesController = {};
import clientesModel from "../models/Clientes.js"


/********************** S E L E C T **************************/


clientesController.getCliente = async (req , res) => {
    const clientes = await clientesModel.find()
    res.json(clientes)
};


/********************** D E L E T E **************************/


clientesController.deleteCliente = async (req , res) => {
    await clientesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Se ha eliminado un cliente"})
};


/********************** U P D A T E **************************/


clientesController.updateCliente = async (req , res) => {
    const {  } = req.body;
    const updatedCliente = await clientesModel.findByIdAndUpdate(req.params.id, { nombre , correo , contrasenia , telefono , direccion , activo } , {new: true})
    res.json({message: "Se ha actualizado un cliente"});
};

export default clientesController;