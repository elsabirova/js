const faker = require('faker');

const checkIsNum = id => !isNaN(+id);
const send400 = (res, message) => res.status(400).send({ message });
const send404 = (res, message) => res.status(404).send({ message });

const appRouter = function (app) {

  const goods = {};

  const users = {
    0: {
      name: faker.name.findName(),
      cart: [],
      id: 0,
    }
  }

  let i = 0;

  for (; i <= 20; i++) {
    goods[i] = ({
      id: i,
      productName: faker.commerce.productName(),
      price: faker.commerce.price(),
      color: faker.commerce.color(),
      productMaterial: faker.commerce.productMaterial()
    });
  }

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/goods', function (req, res) {
    res.status(200).send(Object.values(goods));
  });

  app.get('/goods/:id',  function (req, res) {
    const id = req.params.id;

    if (checkIsNum(id)) {

      const goodie = goods[id];

      if (goodie) {
        res.status(200).send(goodie);
      } else {
        send404(res, 'goodie does not exist');
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  });

  app.get('/users', function (req, res) {
    res.status(200).send(Object.values(users));
  });

  app.get('/users/:id', function(req, res) {
    const id = req.params.id;

    if (checkIsNum(id)) {
      const user = users[id];
      if (user) {
        res.status(200).send(user);
      } else {
        send404(res, 'user does not exist');
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  })


  app.get('/cart/:id', function(req, res) {
    const id = req.params.id;

    if (checkIsNum(id)) {
      const user = users[id];
      if (user) {
        res.status(200).send(user.cart);
      } else {
        res.status(404).send({ message: 'user and cart do not exist' });
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  })

  app.post('/cart/:id', function(req, res) {
    const id = req.params.id;
    const body = req.body;

    if (checkIsNum(+id)) {
      const user = users[id];
      if (user && body.cart) {
        user.cart.push(body.cart)

        res.status(200).send(user.cart);
      } else if (!body.cart) {
        send400(res, 'no item provided');
      } else {
        res.status(404).send({ message: 'user and cart do not exist' });
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  })

  app.delete('/cart/:id', function(req, res) {
    const id = req.params.id;
    const body = req.body;

    if (checkIsNum(+id)) {
      const user = users[id];
      if (user && body.cart) {
        const index = user.cart.indexOf(body.cart);

        user.cart.splice(index, 1);

        if (index > -1) {
          res.status(200).send(user.cart);
        } else {
          send400(res, 'no item exist');
        }
      } else if (!body.cart) {
        send400(res, 'no item provided');
      } else {
        res.status(404).send({ message: 'user and cart do not exist' });
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  })


}

module.exports = appRouter;