const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product] 
    
  }).then ((data) => {
    res.json(data); 
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    include: [Product]
  }).then((categoryData) => {
    res.json(categoryData)
  });
  
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory); 
  })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const newCategory = await  Category.update(req.body, {
       where: {
        id: req.params.id
       }
     })

  res.json('Category was updated!')
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  ).then((deleteCategory) => {
    res.json(deleteCategory)
  });
});

module.exports = router;
