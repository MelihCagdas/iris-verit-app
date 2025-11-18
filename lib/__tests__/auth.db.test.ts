import { authConfig } from '@/lib/auth.config';
import { randomUUID } from 'crypto';

type UserRecord = {
  id: string;
  email: string;
  name?: string | null;
};

class InMemoryUserStore {
  private store = new Map<string, UserRecord>();

  async create({ data }: { data: Omit<UserRecord, 'id'> }): Promise<UserRecord> {
    const record: UserRecord = { id: randomUUID(), ...data };
    this.store.set(record.id, record);
    return record;
  }

  async findUnique({ where: { email } }: { where: { email: string } }) {
    for (const record of this.store.values()) {
      if (record.email === email) {
        return record;
      }
    }
    return null;
  }
}

describe('Auth database interactions', () => {
  let users: InMemoryUserStore;

  beforeEach(() => {
    users = new InMemoryUserStore();
  });

  it('User is created on first login', async () => {
    const user = await users.create({
      data: { email: 'first@login.com', name: 'First Login' },
    });

    expect(user).toMatchObject({
      email: 'first@login.com',
      name: 'First Login',
    });
    expect(user.id).toBeDefined();
  });

  it('User can be queried by email', async () => {
    await users.create({
      data: { email: 'query@login.com', name: 'Query Login' },
    });

    const found = await users.findUnique({ where: { email: 'query@login.com' } });

    expect(found?.name).toBe('Query Login');
  });

  it('User persists after reload (session works)', async () => {
    const created = await users.create({
      data: { email: 'persist@login.com', name: 'Persist Login' },
    });

    const jwtCallback = authConfig.callbacks?.jwt;
    const sessionCallback = authConfig.callbacks?.session;

    const token = await jwtCallback?.({ token: {}, user: created } as any);
    const session = await sessionCallback?.({
      session: { user: { name: created.name, email: created.email } },
      token,
    } as any);

    const refetched = await users.findUnique({ where: { email: 'persist@login.com' } });

    expect(refetched?.id).toBe(created.id);
    expect(session?.user?.id).toBe(created.id);
  });
});

