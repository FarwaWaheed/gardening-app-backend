const getAllPlants = async (req, res) => {
    try {
      const { category, climate, soil, search } = req.query;
  
      // Build dynamic filter object
      const filter = {};
      if (category) filter.category = category;
      if (climate) filter.climate = climate;
      if (soil) filter.soil = soil;
      if (search) filter.name = { $regex: search, $options: 'i' }; // case-insensitive match
  
      const plants = await Plant.find(filter);
  
      res.status(200).json(plants);
    } catch (error) {
      console.error('Error fetching plants:', error);
      res.status(500).json({ message: 'Server error while retrieving plants' });
    }
  };
  
