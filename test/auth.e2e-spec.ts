import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const expectedEmail = 'test55@test.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: expectedEmail,
        password: 'myp@ssW',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(expectedEmail);
      });
  });

  it('signup and then get the current user', async () => {
    const expectedEmail = 'test55@test.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: expectedEmail,
        password: 'myp@ssW',
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/current-user')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(expectedEmail);
  });
});
