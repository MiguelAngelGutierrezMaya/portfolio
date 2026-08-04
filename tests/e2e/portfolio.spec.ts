import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('renders the complete portfolio and supports project discovery', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: /i build digital products that feel/i })
  ).toBeVisible();
  await expect(page.locator('[data-site-header]')).toBeVisible();
  await expect(page.locator('.availability')).not.toHaveAttribute('aria-busy', 'true');

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

test('publishes canonical search and LLM discovery metadata', async ({ page, request }) => {
  await page.goto('/');

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\/.+\/$/);
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}'
  );
  expect(structuredData['@graph']).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ '@type': 'ProfilePage' }),
      expect.objectContaining({ '@type': 'Person', name: 'Miguel Angel Gutierrez Maya' }),
    ])
  );

  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('User-agent: OAI-SearchBot');

  const llms = await request.get('/llms.txt');
  expect(llms.headers()['content-type']).toContain('text/plain');
  expect(await llms.text()).toContain('# Migudev');

  const fullContext = await request.get('/llms-full.txt');
  expect(await fullContext.text()).toContain('## Projects');

  const manifest = await request.get('/manifest.webmanifest');
  expect(await manifest.json()).toEqual(expect.objectContaining({ short_name: 'Migudev' }));
});

for (const route of ['/', '/privacy/index.html', '/terms/index.html']) {
  test(`@a11y has no detectable accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
