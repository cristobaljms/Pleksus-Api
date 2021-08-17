import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class AppService {
  public constructor(
    @InjectTwilio() private readonly client: TwilioClient,
    private readonly sendGrid: SendGridService,
  ) {}

  async sendSMS(target_phone_number: string, body: string): Promise<any> {
    try {
      return await this.client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: target_phone_number,
      });
    } catch (e) {
      return e;
    }
  }

  async sendMAIL(to, from, subject, text, html): Promise<any> {
    try {
      return await this.sendGrid.send({
        to,
        from,
        subject,
        text,
        html,
      });
    } catch (e) {
      return e;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
