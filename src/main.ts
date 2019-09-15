import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { authz } from './authorization.middleware';
import { join } from 'path';
import { newEnforcer } from 'casbin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(authz(async () => {
    try {
      const enforcer = await newEnforcer(join(__dirname, 'casbin_conf/model.conf'), join(__dirname, 'casbin_conf/policy.csv'));
      return enforcer;
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.log(e);
    }
  }));
  await app.listen(3000);
}
bootstrap();
