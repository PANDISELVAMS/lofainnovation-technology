// Generic CRUD factory reused across every admin-manageable content type
// (Service, Product, Portfolio, Partner, Position)

export default function crudController(Model, { publicFilter } = {}) {
  return {
    // Public-facing items
    getPublic: async (req, res) => {
      try {
        const filter = publicFilter || {};

        const items = await Model.find(filter).sort({
          order: 1,
          createdAt: 1,
        });

        res.json(items);
      } catch (error) {
        console.error("Get public items error:", error);

        res.status(500).json({
          message: "Could not load items",
        });
      }
    },

    // Admin items
    getAll: async (req, res) => {
      try {
        const items = await Model.find().sort({
          order: 1,
          createdAt: 1,
        });

        res.json(items);
      } catch (error) {
        console.error("Get admin items error:", error);

        res.status(500).json({
          message: "Could not load items",
        });
      }
    },

    // Create new item
    create: async (req, res) => {
      try {
        // Get the last created item
        const lastItem = await Model.findOne().sort({
          createdAt: -1,
        });

        // Automatically calculate next position
        const nextOrder = lastItem
          ? Number(lastItem.order || 0) + 1
          : 1;

        const item = await Model.create({
          ...req.body,
          order: nextOrder,
        });

        res.status(201).json(item);
      } catch (error) {
        console.error("Create item error:", error);

        res.status(500).json({
          message: error.message || "Could not create item",
        });
      }
    },

    // Update existing item
    update: async (req, res) => {
      try {
        const item = await Model.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!item) {
          return res.status(404).json({
            message: "Not found",
          });
        }

        res.json(item);
      } catch (error) {
        console.error("Update item error:", error);

        res.status(500).json({
          message: error.message || "Could not update item",
        });
      }
    },

    // Delete item
    remove: async (req, res) => {
      try {
        const item = await Model.findByIdAndDelete(
          req.params.id
        );

        if (!item) {
          return res.status(404).json({
            message: "Not found",
          });
        }

        res.json({
          message: "Deleted successfully",
        });
      } catch (error) {
        console.error("Delete item error:", error);

        res.status(500).json({
          message: "Could not delete item",
        });
      }
    },
  };
}