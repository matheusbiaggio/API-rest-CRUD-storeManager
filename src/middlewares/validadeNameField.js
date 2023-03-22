const validadeNameField = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ type: 'INVALID_VALUE', message: '"name" is required' });
  }

  if (typeof name !== 'string') {
    return res.status(404).json({ type: 'INVALID_VALUE', message: 'Nome precisa ser uma string' });
  }

  if (name.length < 5) {
    return res.status(422).json(
      { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' },
    );
  }

  next();
};

module.exports = validadeNameField;