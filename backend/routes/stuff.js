const router = require('express').Router();
let Stuff = require('../models/stuff.model');

router.route('/').get((req, res) => {
  Stuff.find()
    .then(stuffs => res.json(stuffs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const price = Number(req.body.price);
  const duration = Date.parse(req.body.duration);
  const date = Date.parse(req.body.date);

  const newStuff = new Stuff({
    username,
    price,
    duration,
    date,
  });

  newStuff.save()
  .then(() => res.json('Stuff added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Stuff.findById(req.params.id)
    .then(stuff => res.json(stuff))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Stuff.findByIdAndDelete(req.params.id)
    .then(() => res.json('Stuff deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Stuff.findById(req.params.id)
    .then(stuff => {
      stuff.username = req.body.username;
      stuff.price = Number(req.body.price);
      stuff.duration = Date.parse(req.body.duration);
      stuff.date = Date.parse(req.body.date);

      stuff.save()
        .then(() => res.json('Stuff updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;