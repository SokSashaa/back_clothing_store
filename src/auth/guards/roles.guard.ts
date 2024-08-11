import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../user/consts/enums';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../decorators/role.decorator';
import { PUBLIC_KEY } from '../../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const _isPublic = this.reflector.getAllAndOverride<Roles[]>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles || _isPublic) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requireRoles.some((roleItem) => user.role === roleItem);
  }
}
