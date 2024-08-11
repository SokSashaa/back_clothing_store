import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../../user/consts/enums';
import { PUBLIC_KEY } from '../../decorators/public.decorator';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const _isPublic = this.reflector.getAllAndOverride<Roles[]>(PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (_isPublic) {
      return true;
    }
    return super.canActivate(ctx);
  }
}
