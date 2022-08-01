import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { User } from 'src/user/entities/user.entity';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { UseRule } from 'src/decorators/use-rule.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/')
  @UseRule()
  showHello(
  @UserObj() user: User,
  ) {
    return `${user.username} ${user.password} Jesteś zalogowany !`;
  }


  @Get('/adminPanel')
  @UseRule(9)
  adminPanel(
  @UserObj() user: User,
  ) {
    return `${user.username} ${user.password} Jesteś zalogowany jako admin!`;
  }

}
