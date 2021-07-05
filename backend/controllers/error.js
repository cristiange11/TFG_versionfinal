/*exports.get404 = (req, res, next) => {
    const error = new Error('Not found.');
    error.statusCode = 404;
    next(error);
  };
  
  exports.get500 = (error, req, res, next) => {
    const data = error.data;
    res.status(error.statusCode || 500);
    res.json({
      error: {
        message: error.message,
        data: data,
      },
    });
  };

  exports.get409 = (error, req, res, next) => {
    const data = error.data;
    res.status(error.statusCode || 409);
    res.json({
      error: {
         message: "Usuario ya registrado" ,
         data:data     
      },
    });
  };
  exports.get401 = (error, req, res, next) => {
    const data = error.data;
    res.status(error.statusCode || 401);
    res.json({
      error: {
         message: "Usuario y contraseña no son correctas." ,
         data:data     
      },
    });
  };*/