const Aksara = require("../models/aksara");
// Use the functions in authController.js
/**
 * @swagger
 * /aksara:
 *   post:
 *     summary: Create a new Aksara
 *     tags: [Aksara]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aksara'
 *     responses:
 *       200:
 *         description: The Aksara was successfully created
 *       500:
 *         description: Some server error
 */
const createAksara = async (req, res) => {
  const { name, urlImage } = req.body;

  // Make sure name and url are not falsy
  if (!name || !urlImage) {
    return res.status(400).json({ message: "Invalid aksara data" });
  }

  try {
    await Aksara.createAksara(name, urlImage);
    res.status(200).json({ message: "Aksara created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /aksara/{id}:
 *   get:
 *     summary: Get an Aksara by ID
 *     tags: [Aksara]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Aksara not found
 *       500:
 *         description: Some server error
 */
const readAksara = async (req, res) => {
  try {
    const id = req.params.id;
    const aksara = await Aksara.readAksara(id);
    res.json(aksara);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
* /aksara:
 *   get:
 *     summary: Get all Aksara
 *     tags: [Aksara]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Some server error
 */
const listAllAksara = async (req, res) => {
  try {
    const aksaras = await Aksara.listAllAksara();
    res.json(aksaras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAksara,
  readAksara,
  listAllAksara,
};
