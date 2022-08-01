import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entities/user.entity';
import { Like } from 'typeorm';


@Injectable()
export class UserRuleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const user: { id: string, username: string } = context.switchToHttp().getRequest().user;

    if (!user) return false;

    const rule = this.reflector.get<number>('useRule', context.getHandler());

    if (!rule) return false;

    const userRule = await User.findOne({
      select: ['rule'],
      where: {
        id: user.id,
        rule: Like(`%${rule}%`),
      },

    });
    
    if (userRule) {
      return true;
    }

    return false;

  }
}
