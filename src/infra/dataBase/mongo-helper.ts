import { MongoClient, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = new MongoClient(uri)
    await this.client.connect()
    console.log('✅ Conectado ao MongoDB com sucesso')
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null as unknown as MongoClient
    }
  },

  isConnected(): boolean {
    return !!this.client && this.client instanceof MongoClient && this.client?.db()?.databaseName !== undefined
  },


  async getCollection(name: string): Promise<Collection> {
    if (!this.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  }
}
