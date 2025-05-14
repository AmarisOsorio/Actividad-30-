const logoutController = {};

logoutController.logout = async (req , res) => {
    res.clearCookie("authToken")

    return res.json({messsage: "Se cerró sesión"})
}

export default logoutController;