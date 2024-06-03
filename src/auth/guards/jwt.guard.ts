import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
//   constructor(private readonly reflector: Reflector) {
//     super();
//   }
//
//   canActivate(
//       ctx: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const _isPublic = isPublic(ctx, this.reflector);
//     if (_isPublic) {
//       return true;
//     }
//     return super.canActivate(ctx);
//   }
// }
