export default function handler(req, res) {
  //Update status into orders table after checking transaction status
  //Insert into orders table after checking the transaction status
  //Initiate shipping
  //redirect  user to the order confirmation page
  res.status(200).json({ body: req.body });
}
