import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('renders the complete portfolio and supports project discovery', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: /i build digital products that feel/i })
  ).toBeVisible();
  await expect(page.locator('[data-site-header]')).toBeVisible();

  const projectIsland = page.locator('astro-island[component-url*="ProjectExplorer"]');
  await projectIsland.scrollIntoViewIfNeeded();
  await expect(projectIsland).not.toHaveAttribute('ssr', '');
  await page.getByRole('button', { name: 'Mobile' }).click();
  await expect(page.getByText('Showing 9 of 23 projects')).toBeVisible();

  await page.getByRole('searchbox').fill('SwiftUI');
  await expect(page.getByRole('heading', { name: 'Expense Tracker' })).toBeVisible();
});

test('supports keyboard navigation and accessible form feedback', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  const contactIsland = page.locator('astro-island[component-url*="ContactForm"]');
  await contactIsland.scrollIntoViewIfNeeded();
  await expect(contactIsland).not.toHaveAttribute('ssr', '');
  await page.getByRole('button', { name: /start a conversation/i }).click();
  await expect(page.getByRole('status')).toContainText('Review the highlighted fields');
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-invalid', 'true');
});

for (const route of ['/', '/privacy/', '/terms/']) {
  test(`@a11y has no detectable accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
