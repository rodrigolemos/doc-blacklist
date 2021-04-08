import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export async function getServerConnection(name = 'default'): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      url: process.env.DATABASE_URL
    }),
  );
};
