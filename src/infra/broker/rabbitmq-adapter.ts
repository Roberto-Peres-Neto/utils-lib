// import type { Channel, Connection, ConsumeMessage } from 'amqplib'
// import amqp from 'amqplib'


// export class RabbitMqAdapter {
//   private static connection: Connection
//   private static channel: Channel

//   static async connect(): Promise<void> {
//     if (this.connection && this.channel) return

//     const { RABBITMQ_URL, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } = process.env
//     const uri = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_URL}:${RABBITMQ_PORT}`

//     this.connection = await amqp.connect(uri)
//     this.channel = await this.connection.createChannel()
//   }

//   static async publishToQueue(queue: string, message: any): Promise<void> {
//     await this.connect()
//     await this.channel.assertQueue(queue, { durable: true })
//     this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
//   }

//   static async consumeQueue(queue: string, callback: (msg: ConsumeMessage) => void): Promise<void> {
//     await this.connect()
//     await this.channel.assertQueue(queue, { durable: true })
//     this.channel.consume(queue, (msg) => {
//       if (msg) {
//         callback(msg)
//         this.channel.ack(msg)
//       }
//     })
//   }

//   static async publishToExchange(
//     exchange: string,
//     routingKey: string,
//     message: any,
//     type: 'direct' | 'topic' | 'fanout' | 'headers' = 'direct',
//     headers: Record<string, any> = {}
//   ): Promise<void> {
//     await this.connect()
//     await this.channel.assertExchange(exchange, type, { durable: true })

//     const options = type === 'headers'
//       ? { headers, persistent: true }
//       : { persistent: true }

//     this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), options)
//   }

//   static async consumeExchange(
//     exchange: string,
//     routingKey: string,
//     callback: (msg: ConsumeMessage) => void,
//     type: 'direct' | 'topic' | 'fanout' | 'headers' = 'direct',
//     headers: Record<string, any> = {}
//   ): Promise<void> {
//     await this.connect()
//     await this.channel.assertExchange(exchange, type, { durable: true })

//     const { queue } = await this.channel.assertQueue('', { exclusive: true })

//     if (type === 'headers') {
//       await this.channel.bindQueue(queue, exchange, '', { arguments: headers })
//     } else {
//       await this.channel.bindQueue(queue, exchange, routingKey)
//     }

//     this.channel.consume(queue, (msg) => {
//       if (msg) {
//         callback(msg)
//         this.channel.ack(msg)
//       }
//     })
//   }

//   static async disconnect(): Promise<void> {
//     await this.channel?.close()
//     await this.connection?.close()
//   }
// }
