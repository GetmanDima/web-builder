import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { RMQService } from './rmq.service';

@Controller()
export class RMQController {
  constructor(private rmqService: RMQService) {}

  @EventPattern('generate-code')
  async handleBookCreatedEvent(data: {projectId: string}) {
    this.rmqService.generateCode(data.projectId);
  }
}