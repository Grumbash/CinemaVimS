/* 
@Accept 
data: {
  Model: ModelName,
  validateFunc: validateFuncName 
}
*/
module.exports = post_UniversalForAdmin = (req, res, data) => {
  if (!(req.body instanceof Array)) {
    postOne(req, res, data);
  } else {
    postMany(req, res, data, req.body);
  }
};

function postOne(req, res, data) {
  const { errors, isValid } = data.validateFunc(body);

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

  const fields = Object.assign({}, body);

  if (fields.id) {
    let proms = data.Model.findById(elem.id).then(elemWrap => {
      if (elemWrap) {
        return data.Model.findOneAndUpdate(
          { _id: elem.id },
          { $set: elem },
          { new: true }
        )
          .then(all => res.json(all))
          .catch(err => res.json(err));
      } else {
        return res
          .status(404)
          .json({
            msg: `Item with id :${elem.id} not founded`
          })
          .catch(err => res.json(err));
      }
    });
    return proms;
  } else {
    return new data.Model(elem)
      .save()
      .then(all => res.json(all))
      .catch(err => res.json(err));
  }
}

function postMany(req, res, data, body) {
  const { errors, isValid } = data.validateFunc(body);

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

  const fields = Object.assign({}, body);

  Promise.all(
    body.map(elem => {
      if (elem.id) {
        let proms = data.Model.findById(elem.id).then(elemWrap => {
          if (elemWrap) {
            return data.Model.findOneAndUpdate(
              { _id: elem.id },
              { $set: elem },
              { new: true }
            );
          } else {
            return { status: 404, msg: `Item with id :${elem.id} not founded` };
          }
        });
        return proms;
      } else {
        return new data.Model(elem).save();
      }
    })
  )
    .then(all => res.json(all))
    .catch(err => res.json(err));
}
