exports.getAll_UniversalForAdmin = (req, res, data) => {
  data.Model.find().then(elems => res.json(elems));
};
