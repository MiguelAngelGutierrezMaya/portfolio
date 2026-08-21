import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route(/\/media\/(companies|projects)\//, route =>
    route.fulfill({
      status: 200,
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10"><rect width="16" height="10" fill="#171a20"/></svg>',
    })
  );
});

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
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect(page.getByText('Showing 12 of 30 projects')).toBeVisible();

  await page.getByRole('searchbox').fill('React Native');
  await expect(page.getByRole('heading', { name: 'Assignar Pay Mobile' })).toBeVisible();

  await page.getByRole('searchbox').fill('SwiftUI');
  await expect(page.getByRole('heading', { name: 'Biky AI Native' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Expense Tracker' })).toBeVisible();
});

test('serves optimized managed images without runtime transformations', async ({ page }) => {
  const failedImages = new Set<string>();
  page.on('response', response => {
    if (response.request().resourceType() === 'image' && !response.ok()) {
      failedImages.add(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/', { waitUntil: 'networkidle' });

  const portrait = page.getByRole('img', { name: /miguel/i });
  const logo = page.locator('.brand__logo').first();
  await expect(portrait).toBeVisible();
  await expect(logo).toBeVisible();
  await expect(portrait).toHaveJSProperty('complete', true);
  await expect(logo).toHaveJSProperty('complete', true);
  expect(
    await portrait.evaluate(image => (image as HTMLImageElement).naturalWidth)
  ).toBeGreaterThan(0);
  expect(await logo.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(
    await page
      .locator('img')
      .evaluateAll(images => images.map(image => (image as HTMLImageElement).currentSrc))
  ).not.toEqual(expect.arrayContaining([expect.stringContaining('/_image/')]));
  expect([...failedImages]).toEqual([]);
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

test('publishes direct WhatsApp contact and private portfolio media', async ({ page, request }) => {
  await page.goto('/');

  const whatsappLinks = page.getByRole('link', { name: /whatsapp/i });
  await expect(whatsappLinks.first()).toHaveAttribute('href', 'https://wa.me/573113230033');

  const firstProject = page.locator('.project-card').first();
  await firstProject.scrollIntoViewIfNeeded();
  const projectPreview = firstProject.locator('.project-card__preview');
  await expect(projectPreview).toBeVisible();
  await expect
    .poll(() => projectPreview.evaluate(image => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);

  const firstExperience = page.locator('.experience-item').first();
  await firstExperience.scrollIntoViewIfNeeded();
  const companyLogo = firstExperience.locator('.experience-item__logo');
  await expect(companyLogo).toBeVisible();
  await expect
    .poll(() => companyLogo.evaluate(image => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);

  const unpublishedCompany = await request.get('/media/companies/not-published');
  expect(unpublishedCompany.status()).toBe(404);
});

test('opens project imagery in an accessible detail dialog', async ({ page }) => {
  await page.goto('/');

  const projectIsland = page.locator('astro-island[component-url*="ProjectExplorer"]');
  await projectIsland.scrollIntoViewIfNeeded();
  await expect(projectIsland).not.toHaveAttribute('ssr', '');

  const trigger = page.getByRole('button', {
    name: 'View Biky AI Native image in detail',
  });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();

  const dialog = page.getByRole('dialog', { name: 'Biky AI Native' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('img', { name: /biky ai native/i })).toBeVisible();
  await expect(dialog.getByText('SwiftUI')).toBeVisible();
  await expect
    .poll(() =>
      dialog
        .getByRole('img', { name: /biky ai native/i })
        .evaluate(image => (image as HTMLImageElement).naturalWidth)
    )
    .toBeGreaterThan(0);

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(
    page.getByRole('button', { name: 'View Assignar Core API image in detail' })
  ).toHaveCount(0);
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
