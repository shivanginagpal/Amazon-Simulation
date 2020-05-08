var connection = new require('./kafka/Connection');

//topics files
var signupLoginTopics = require('./services/signUpLogin_topic');
var sellerProfileTopics = require('./services/sellerProfile_topic');
var customerProfileTopics = require('./services/customerProfile_topic');
var sellerTopics = require('./services/sellerTopic');
var adminTopics = require('./services/admin_topic');
var customerTopics = require('./services/customer_topics');
var cartTopics = require('./services/cart_topics');
var orderTopics = require('./services/order_topic');


const mongoose = require('mongoose');

const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
    .connect(db,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 100,
            useCreateIndex: true
        })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        //console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        switch (topic_name) {

            case 'signupLogin_topic':
                fname.signUpLoginService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;

            case 'customerProfile_topic':
                fname.customerProfileService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'sellerProfile_topic':
                fname.sellerProfileService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'seller_topic':
                fname.sellerService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'admin_topic':
                fname.adminService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'customer_topic':
                fname.customerService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'cart_topic':
                fname.cartService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'order_topic':
                fname.orderService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
        }

    });
}

function response(data, res, producer) {
    //console.log('after handle', res);
    var payloads = [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partition: 0
        }
    ];
    producer.send(payloads, function (err, data) {
        //console.log('producer send', data);
    });
    return;
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signupLogin_topic", signupLoginTopics);
handleTopicRequest("customerProfile_topic", customerProfileTopics);
handleTopicRequest("sellerProfile_topic", sellerProfileTopics);
handleTopicRequest("seller_topic", sellerTopics);
handleTopicRequest("admin_topic", adminTopics);
handleTopicRequest("customer_topic", customerTopics);
handleTopicRequest("cart_topic", cartTopics);
handleTopicRequest("order_topic", orderTopics);