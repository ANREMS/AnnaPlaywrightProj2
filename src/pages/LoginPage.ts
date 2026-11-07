import { BasePage } from './BasePage';
import { config } from '../support/config';

export class LoginPage extends BasePage {
  private readonly username = this.byTest('username');
  private readonly password = this.byTest('password');
  private readonly loginButton = this.byTest('login-button');
  private readonly error = this.byTest('error');

  async open(): Promise<void> {
    await this.page.goto(config.baseUrl);
    await this.loginButton.waitFor();
  }

  async login(user: string, pass: string): Promise<void> {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }

  async errorText(): Promise<string> {
    await this.error.waitFor();
    return (await this.error.innerText()).trim();
  }
}
