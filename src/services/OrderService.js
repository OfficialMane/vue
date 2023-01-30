
const url = 'http://node-env.eba-u2thtivw.eu-west-2.elasticbeanstalk.com/orders';

class OrderService {

  // Create order
  static createOrder(user_name, contact_number, item_id, total_items) {
    return fetch(url,{
      method:  'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user_name,
        phoneNumber: contact_number,
        lessonId: item_id,
        numberOfSpace: total_items
      })
    })
  }
}

export default OrderService;

