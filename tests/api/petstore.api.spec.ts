import { test, expect } from '@playwright/test';
import { ENV } from '../../utils/environment';
import { petData } from '../../test-data/petData';

test.describe('Pet Management API', () => {
  test('Create Pet Successfully', async ({ request }) => {
    const response = await request.post(`${ENV.apiBaseUrl}/pet`, {
      data: petData,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toMatchObject({
      id: petData.id,
      name: petData.name,
      status: petData.status,
      category: petData.category,
    });

    expect(body.photoUrls).toEqual(petData.photoUrls);
    expect(body.tags).toEqual(petData.tags);
    expect(body).toMatchObject(petData);
  });

  test('Create Pet with Invalid Payload', async ({ request }) => {
    const response = await request.post(`${ENV.apiBaseUrl}/pet`, {
      data: {
        id: 'invalid-id',
      },
    });

    expect(response.status()).not.toBe(200);
  });
});
