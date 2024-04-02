const signUp = async (req:any, res:any) => {
  try {
    res.json({ status: "ok", message: "Signed up successfully" });
  } catch (err:any) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//Signin
const signIn = async (req:any, res:any) => {
  try {
    res.status(200).send({
      status: true,
      message: "Loggedin successfully",
      logged: true,    });
  } catch (err:any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export {
  signUp,
  signIn,
};
