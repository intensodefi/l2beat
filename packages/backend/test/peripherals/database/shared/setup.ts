import { Logger } from '@l2beat/common'

import { Database } from '../../../../src/peripherals/database/shared/Database'

export function setupDatabaseTestSuite() {
  const { database, skip } = getTestDatabase()

  before(async function () {
    if (skip) {
      this.skip()
    } else {
      await database.migrateToLatest()
    }
  })

  after(async () => {
    await database.closeConnection()
  })

  return { database }
}

export function getTestDatabase() {
  const connection = process.env.TEST_DB_URL
  const database = new Database(connection, 'Backend/Test', Logger.SILENT)
  return {
    database,
    skip: connection === undefined,
  }
}
