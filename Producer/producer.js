// This is the producer who produce the event.

// Step 1: Connect to RabbitMQ server
// Step 2: Create a new channel on that connection (Init channel once).
// Step 3: Create the exchange.
// Step 4: Publish the message to the exhange with a routing key.

import amqp from 'amqplib'
import config from './config.js'

export class Producer {
  channel

  async createChannel() {
    // Step 1: Connect to RabbitMQ server
    // Step 2: Create a new channel on that connection (Init channel once).
    const connection = await amqp.connect(config.rabbitMQ.url)
    this.channel = connection.createChannel()
  }

  async publishMessage(routingKey, message) {
    // Step 4: Publish the message to the exhange with a routing key.
    if (!this.channel) {
      await this.createChannel()
    }

    const exchangeName = config.rabbitMQ.exchangeName

    await this.channel.assertExchange(exchangeName, 'direct')

    const logDetails = {
      logType: routingKey,
      message: message,
      timestamp: new Date(),
    }

    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    )

    console.log(`Message ${message} sent to exchange ${exchangeName}.`)
  }
}
