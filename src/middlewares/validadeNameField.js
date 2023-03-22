const validadeNameField = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(404).json({ type: 'INVALID_VALUE', message: 'Nome precisa ser preenchido' });
  }

  if (typeof name !== 'string') {
    return res.status(404).json({ type: 'INVALID_VALUE', message: 'Nome precisa ser uma string' });
  }

  if (name.length < 2) {
    return res.status(404).json(
      { type: 'INVALID_VALUE', message: 'Nome precisa ser maior que 2 letras' },
    );
  }

  next();
};

module.exports = validadeNameField;