import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRuleGuard } from 'src/guards/user-rules.guard';

export const UseRule = (rule?: number) : PropertyDecorator => {

  if (!rule) {
    return applyDecorators(
      SetMetadata('useRule', rule),
      UseGuards(AuthGuard('jwt')),
    );
  }

  
  return applyDecorators(
    SetMetadata('useRule', rule),
    UseGuards(AuthGuard('jwt'), UserRuleGuard),
  );

};


/*
*
* Używamy np. z naszym PasswordProtectGuard
*
* @UseGuards(PasswordProtectGuard)
* @UsePassword('Password1')
* jakasAkcja() {
* //
* }
*
* */