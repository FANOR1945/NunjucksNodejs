// Middleware genérico para CRUD

const createItem = (Model) => async (req, res) => {
  try {
    const newItem = new Model(req.body);
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error creando el elemento: ${error.message}` });
  }
};
const getAllItems =
  (Model, refFields = []) =>
  async (req, res) => {
    try {
      // Obtener todas las propiedades del modelo
      const modelFields = Object.keys(Model.schema.paths);
      console.log('Campos del modelo:', modelFields); // Depuración

      // Filtrar las referencias (campos que son Array o ObjectID con ref)
      const referenceFields = modelFields.filter(
        (field) =>
          Model.schema.paths[field].instance === 'Array' ||
          Model.schema.paths[field].instance === 'ObjectID'
      );
      console.log('Campos de referencia:', referenceFields); // Depuración

      // Obtener solo las propiedades básicas (excluyendo las referencias)
      const basicFields = modelFields.filter(
        (field) => !referenceFields.includes(field)
      );
      console.log('Campos básicos:', basicFields); // Depuración

      // Unir las propiedades básicas con las referencias solicitadas
      const selectedFields = [...basicFields, ...refFields.flat()].join(' ');
      console.log('Campos seleccionados para la consulta:', selectedFields); // Depuración

      // Construir la consulta
      let query = Model.find().select(selectedFields);

      // Aplicar populate solo a las referencias permitidas
      refFields.forEach((field) => {
        console.log(`Aplicando populate a: ${field}`); // Depuración

        if (Array.isArray(field)) {
          // Si el campo es un array de referencias (como ['roles', 'permisos'])
          const [mainField, subField] = field;
          query.populate({
            path: mainField, // Primer campo de referencia
            populate: { path: subField }, // Segundo campo de referencia
          });
        } else {
          // Si no hay anidación, solo aplicamos populate directamente
          query.populate(field);
        }
      });

      // Ejecutar la consulta
      const items = await query;
      console.log('Elementos obtenidos:', items); // Depuración

      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Error al obtener los elementos:', error); // Depuración
      res
        .status(500)
        .json({ error: `Error obteniendo los elementos: ${error.message}` });
    }
  };

const getItemById = (Model) => async (req, res) => {
  try {
    const item = await Model.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Elemento no encontrado' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error obteniendo el elemento: ${error.message}` });
  }
};

const updateItem = (Model) => async (req, res) => {
  try {
    const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem) {
      return res
        .status(404)
        .json({ error: 'Elemento no encontrado para actualizar' });
    }
    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error actualizando el elemento: ${error.message}` });
  }
};

const deleteItem = (Model) => async (req, res) => {
  try {
    const deletedItem = await Model.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res
        .status(404)
        .json({ error: 'Elemento no encontrado para eliminar' });
    }
    res.status(200).json({ success: true, data: deletedItem });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error eliminando el elemento: ${error.message}` });
  }
};
// Eliminar un subItem desde un array de referencias (como permisos, roles, etc.)
const deleteSubItem = (Model, subField) => async (req, res) => {
  try {
    const { id, subId } = req.params;

    // Buscar el documento principal
    const item = await Model.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ error: 'Elemento principal no encontrado' });
    }

    // Filtrar el subItem que queremos eliminar
    item[subField] = item[subField].filter(
      (subItemId) => subItemId.toString() !== subId
    );

    await item.save();

    res
      .status(200)
      .json({ success: true, message: 'SubItem eliminado con éxito' });
  } catch (error) {
    console.error('Error eliminando subItem:', error);
    res
      .status(500)
      .json({ error: `Error eliminando subItem: ${error.message}` });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  deleteSubItem,
};
