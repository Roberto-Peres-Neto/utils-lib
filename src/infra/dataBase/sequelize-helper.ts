import { QueryTypes, Sequelize, Transaction } from 'sequelize'

export const SequelizeHelper = {
  client: null as unknown as Sequelize,
  async connect(): Promise<void> {
    if (this.client) return // evita reconectar

    console.log('🔌 Conectando ao SQL Server...')
    console.log('🔥 SQL CONFIG:', {
      host: process.env.SQLSERVER_SERVER,
      database: process.env.SQLSERVER_DATABASE,
      user: process.env.SQLSERVER_USER,
      port: process.env.SQLSERVER_PORT
    })

    this.client = new Sequelize(
      process.env.SQLSERVER_DATABASE as string,
      process.env.SQLSERVER_USER as string,
      process.env.SQLSERVER_PASSWORD as string,
      {
        dialect: 'mssql',
        host: process.env.SQLSERVER_SERVER,
        port: Number(process.env.SQLSERVER_PORT),
        logging: process.env.SQLSERVER_DATABASE === 'SGBDDEV' ? false : console.log,
        dialectOptions: {
          options: {
            requestTimeout: Number(process.env.SQLSERVER_TIMEOUT) || 30000,
            connectTimeout: Number(process.env.SQLSERVER_TIMEOUT) || 30000,
            validateBulkLoadParameters: true,
            encrypt: true,
            trustServerCertificate: true,
            cryptoCredentialsDetails: {
              ciphers: 'DEFAULT@SECLEVEL=0'
            }
          }
        },
        pool: {
          max: 30
        }
      }
    )
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null as unknown as Sequelize
    }
  },

  async query<T extends object = any>(
    sql: string,
    replacements: Record<string, unknown> = {},
    transaction: Transaction | null = null
  ): Promise<T[]> {
    if (!this.client) {
      await this.connect()
    }

    return this.client.query<T>(sql, {
      type: QueryTypes.SELECT,
      raw: true,
      replacements,
      transaction: transaction ?? undefined
    })
  }
}
