const prisma = require("../db/prisma");

const getMenus = async (req, res) => {
const { keyword } = req.query;
  try {
    const menus = await prisma.menu.findMany({
        where :{
            name:{ contains: keyword || "" }
        },
      select: {
        menuId: true,
        name: true,
        price: true,
        isBestSeller: true,
        type: {
          select: {
            typeId: true,
            name: true,
          },
        },
      },
    });

    res.json(menus);
  } catch (err) {
    console.error("Error fetching menus:", err);

    res.status(500).json({ error: "Database error" });
  }
};

const getMenuById = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await prisma.menu.findUnique({
      where: { menuId: Number(id) },
      select: {
        menuId: true,
        name: true,
        price: true,
        isBestSeller: true,
        type: {
          select: {
            typeId: true,
            name: true,
          },
        },
      },
    });

    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    res.json(menu);
  } catch (err) {
    console.error("Error fetching menu:", err);

    res.status(500).json({ error: "Database error" });
  }
};

const createMenu = async (req, res) => {
  let { name, price, isBestSeller, typeId } = req.body;
  if (!name || !price || !typeId) {
    return res
      .status(400)
      .json({ error: "Name, price, and type ID are required" });
  }

  try {
    const newMenu = await prisma.menu.create({
      data: {
        name: name,
        price: parseFloat(price),
        isBestSeller: isBestSeller,
        typeId: Number(typeId),
      },
    });

    res.status(201).json(newMenu);
  } catch (err) {
    console.error("Error creating menu:", err);

    res.status(500).json({ error: "Database error" });
  }
};

const updateMenu = async (req, res) => {
  const { id } = req.params;

  const { name, price, isBestSeller, typeId } = req.body;

  try {
    const updatedMenu = await prisma.menu.update({
      where: { menuId: Number(id) },

      data: {
        name: name,
        price: parseFloat(price),
        isBestSeller: isBestSeller,
        typeId: Number(typeId),
      },
    });

    res.json(updatedMenu);
  } catch (err) {
    console.error("Error updating menu:", err);

    res.status(404).json({ error: "Menu not found or database error" });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.menu.delete({
      where: { menuId: Number(id) },
    });

    res.json({ message: "Menu deleted successfully", id: Number(id) });
  } catch (err) {
    console.error("Error deleting menu:", err);

    res.status(404).json({ error: "Menu not found" });
  }
};


module.exports = {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};
