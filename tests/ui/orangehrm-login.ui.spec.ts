import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ENV } from '../../utils/environment';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('User can login successfully', async () => {
    await loginPage.login(ENV.username, ENV.password);
    await loginPage.verifyDashboard();
  });

  test('User cannot login with an invalid password', async () => {
    await loginPage.login(ENV.username, ENV.invalidPassword);
    await loginPage.verifyInvalidCredentialsError();
  });
});
