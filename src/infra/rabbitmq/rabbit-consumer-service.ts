// // src/infra/rabbitmq/rabbit-consumer-service.ts

// import { RabbitMqAdapter } from "../broker"

// export class RabbitConsumerService {
//   static async start(): Promise<void> {
//     await RabbitMqAdapter.connect()

//     await RabbitMqAdapter.consumeQueue('fila-login', (msg) => {
//       const data = JSON.parse(msg.content.toString())
//       console.log('📥 fila-login:', data)
//     })

//     await RabbitMqAdapter.consumeQueue('fila-checkup', (msg) => {
//       const data = JSON.parse(msg.content.toString())
//       console.log('📥 fila-checkup:', data)
//     })

//     await RabbitMqAdapter.consumeExchange(
//       'exchange-notificacoes',
//       'notificacao.email.*',
//       (msg) => {
//         const data = JSON.parse(msg.content.toString())
//         console.log('📨 exchange-notificacoes:', data)
//       },
//       'topic'
//     )
//   }
// }
