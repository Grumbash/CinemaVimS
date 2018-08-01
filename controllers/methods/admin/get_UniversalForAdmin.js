exports.getAll_UniversalForAdmin = (req, res, data) => {
  data.Model.find().then(elems => res.json(elems));
};

exports.getById_UniversalForAdmin = (req, res, data) => {};
