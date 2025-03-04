
import { Client, resources } from 'coinbase-commerce-node';
import { products } from '../../data/data';

console.log(process.env.COINBASE_API)
//initiate the coinbase commerce client 
Client.init(String(process.env.COINBASE_API));
const { Charge } = resources;

const coinInitRoute = async(req, res) => {

  const { id } = req.body
  console.log('Received ID:', id);  // Log recieved ID
  if (!id) {
    return res.status(400).send({ error: 'Product ID is required' });
  }
//retrieve product id from req.body and use it to search for product
  const product = products.find(product => product.id === id)
  if (!product) {
    return res.status(404).send({ error: 'Product not found' });
  } else console.log(product)


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
    console.error('Error during charge creation:', e);
    res.status(500).send({ error: e.message || 'Internal Server Error' });
  }

}

export default coinInitRoute