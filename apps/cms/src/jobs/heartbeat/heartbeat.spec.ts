import { prismaMock } from '../../prisma-mock';
import { createHeartbeat } from './heartbeat';
import { vi } from 'vitest';
import { Prisma } from '@prisma/client';

describe('createHeartbeat', () => {
  it('creates a heartbeat entry with the given referrer', async () => {
    const dateTime = new Date();

    vi.setSystemTime(dateTime);

    const createdHeartbeat = { id: '1' } as Prisma.PromiseReturnType<
      typeof prismaMock.heartbeat.create
    >;
    prismaMock.heartbeat.create.mockResolvedValueOnce(createdHeartbeat);

    const beat = await createHeartbeat('__test__');

    expect(beat).toEqual(createdHeartbeat);
    expect(prismaMock.heartbeat.create).toHaveBeenCalledWith({
      data: {
        date: dateTime,
        referrer: '__test__',
      },
    });

    vi.useRealTimers();
  });
});
