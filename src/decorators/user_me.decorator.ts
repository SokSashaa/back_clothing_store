import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserMe = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user ? req.user : null;
  },
);
