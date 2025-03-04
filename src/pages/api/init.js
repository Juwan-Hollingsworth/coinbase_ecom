
import { Client, resources } from 'coinbase-commerce-node';
import { products } from '../../data';

//initiate the coinbase commerce client 
Client.init(String(process.env.COINBASE_API));
const { Charge } = resources;

const coinInitRoute = async(req, res) => {

  const { id } = req.body
//retrieve product id from req.body and use it to search for product
  const product = products.find(product => product.id === id)

  try {

    const chargeData = {
      name: product.name,
      description: product.description,
      pricing_type: "fixed_price",
      local_price: {
        amount: product.price,
        currency: product.currency,
      },
      metadata: {
        id: product.id,
        userID: 1
      },
    };
//create a charge by sending a request to coinbase 
    const charge = await Charge.create(chargeData);
//upon success send charged object to client
    res.send(charge);

  } catch (e) {
    res.status(500).send({ error:e });
  }

}

export default coinInitRoute