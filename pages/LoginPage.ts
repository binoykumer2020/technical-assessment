import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/', {
      waitUntil: 'commit',
    });

    await this.page
      .getByRole('textbox', { name: 'Username' })
      .waitFor({ state: 'visible' });

    await this.page
      .getByRole('textbox', { name: 'Password' })
      .waitFor({ state: 'visible' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);

    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);

    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async verifyDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async verifyInvalidCredentialsError(): Promise<void> {
    await expect(this.page.getByText('Invalid credentials')).toBeVisible();
  }
}
