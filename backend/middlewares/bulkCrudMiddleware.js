const deleteItemsBulk = (Model) => async (req, res) => {
  try {
    const { ids } = req.body; // Suponiendo que los IDs a eliminar vienen en el cuerpo de la solicitud
    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ error: 'Debe proporcionar una lista de IDs válidos.' });
    }

    const deletedItems = await Model.deleteMany({ _id: { $in: ids } });

    if (deletedItems.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: 'No se encontraron elementos para eliminar.' });
    }

    res.status(200).json({
      success: true,
      message: `${deletedItems.deletedCount} elementos eliminados.`,
      data: deletedItems,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error eliminando los elementos: ${error.message}` });
  }
};
module.exports = {
  deleteItemsBulk,
};