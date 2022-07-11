var amqp = require('amqplib/callback_api');

import { sendMail } from './mail';
import { rabbitmail } from './rabbitmail';

var userMailId;

// Publisher#####################  

function producer(data) {

    amqp.connect('amqp://localhost', function(error, connection) {
    if (error) {
        throw error;
    }
    connection.createChannel(function(error, channel) {
        if (error) {
            throw error;
        }

        var queue = 'rabq';
        var msg =  JSON.stringify(data) ;
        userMailId=data.mailid;
        console.log("Inside rabbitmq : ", userMailId);
        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" inside rabbitmq:   :::: The sent massae is  %s", msg);
    });
    setTimeout(function() {
        connection.close();
        // process.exit(0);
    }, 1000);
});

// User ################################################
amqp.connect('amqp://localhost', function(error, connection) {
    if (error) {
        throw error;
    }
    connection.createChannel(function(error, channel) {
        if (error) {
            throw error;
        }

        var queue = 'rabq';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(`The queue (${queue}) is reay for operation`);

        channel.consume(queue, function(msg) {
            let messages  = JSON.parse(msg.content) 
            console.log("Received data from registration :  %s",messages );
            rabbitmail(userMailId);
        }, 
        {
            noAck: true
        });
    });
});
};



export {producer};
