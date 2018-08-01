/* 
@Accept 
data: {
  Model: ModelName,
  validateFunc: validateFuncName 
}
*/
module.exports = post_UniversalForAdmin = (req, res, data) => {
  const { errors, isValid } = data.validateFunc(req.body);

  //Check Permission
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  const fields = Object.assign({}, req.body);

  data.Model.findById(fields.id).then(elem => {
    if (elem) {
      data.Model.findOneAndUpdate(
        { _id: fields.id },
        { $set: fields },
        { new: true }
      )
        .then(elem => res.json(elem))
        .catch(err => res.json(err, `Can't update`));
    } else {
      new data.Model(fields).save().then(elem => res.json(elem));
    }
  });
};
