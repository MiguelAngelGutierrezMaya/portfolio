import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { fileURLToPath } from 'node:url';

test.beforeEach(async ({ page }) => {
  await page.route(/\/media\/(companies|projects)\//, route =>
    route.fulfill({
      status: 200,
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10"><rect width="16" height="10" fill="#171a20"/></svg>',
    })
  );
});

test('negotiates the browser language and keeps explicit locale URLs stable', async ({
  page,
  request,
}) => {
  const spanishRedirect = await request.get('/', {
    headers: { 'Accept-Language': 'es-CO,es;q=0.9,en;q=0.7' },
    maxRedirects: 0,
  });
  const englishRedirect = await request.get('/', {
    headers: { 'Accept-Language': 'en-US,en;q=0.9' },
    maxRedirects: 0,
  });

  expect(spanishRedirect.status()).toBe(302);
  expect(spanishRedirect.headers().location).toBe('/es/');
  expect(spanishRedirect.headers().vary).toContain('Accept-Language');
  expect(englishRedirect.status()).toBe(302);
  expect(englishRedirect.headers().location).toBe('/en/');

  await page.goto('/es/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(
    page.getByRole('heading', { level: 1, name: /construyo productos digitales/i })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'English' }).first()).toHaveAttribute('href', '/en/');
  await expect(page.getByRole('link', { name: 'Español' }).first()).toHaveAttribute(
    'aria-current',
    'page'
  );
});

for (const [locale, mediumName] of [
  ['en', 'Medium Science & tech'],
  ['es', 'Medium Ciencia y tecnología'],
] as const) {
  test(`presents writing and profiles in ${locale} on the home and footer`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    for (const nav of [
      page.locator('#about .social-links'),
      page.locator('footer .social-links'),
    ]) {
      const links = nav.getByRole('link');
      await expect(links).toHaveCount(5);
      const medium = links.first();
      await expect(medium).toHaveAccessibleName(mediumName);
      await expect(medium).toHaveAttribute('href', 'https://medium.com/@gutierrezmayamiguelangel');
      const logos = nav.locator('svg[aria-hidden="true"] use');
      await expect(logos).toHaveCount(5);
      for (const [index, brand] of [
        'medium',
        'github',
        'linkedin',
        'x-twitter',
        'instagram',
      ].entries()) {
        await expect(logos.nth(index)).toHaveAttribute('href', new RegExp(`^/[^#]+#${brand}$`));
        await expect
          .poll(() =>
            logos.nth(index).evaluate(icon => (icon as SVGGraphicsElement).getBBox().width)
          )
          .toBeGreaterThan(0);
      }
      await medium.focus();
      await page.keyboard.press('Tab');
      await expect(nav.getByRole('link', { name: /GitHub/ })).toBeFocused();
      expect(
        await links.evaluateAll(items =>
          items.every(item => {
            const rect = item.getBoundingClientRect();
            return (
              rect.height >= 48 && rect.width >= 48 && rect.left >= 0 && rect.right <= innerWidth
            );
          })
        )
      ).toBe(true);
    }
  });
}

for (const [locale, website, repository] of [
  ['en', 'Visit website', 'View repository'],
  ['es', 'Visitar sitio web', 'Ver repositorio'],
] as const) {
  test(`shows public project links and private imagery in ${locale}`, async ({ page }) => {
    for (const slug of ['financial-management', 'yenuba']) {
      const path = fileURLToPath(
        new URL(`../../src/content/media/projects/${slug}.webp`, import.meta.url)
      );
      await page.route(new RegExp(`/media/projects/${slug}/?$`), route =>
        route.fulfill({ path, contentType: 'image/webp' })
      );
    }
    await page.goto(`/${locale}/`);
    const explorer = page.locator('astro-island[component-url*="ProjectExplorer"]');
    await explorer.scrollIntoViewIfNeeded();
    await expect(explorer).not.toHaveAttribute('ssr', '');
    const finance = page
      .getByRole('article')
      .filter({ has: page.getByRole('heading', { name: 'Financial Management' }) });
    await expect(
      finance.getByRole('link', { name: `Financial Management: ${website}` })
    ).toHaveAttribute('href', 'https://financial-management.migudev.com/landing');
    await expect(
      finance.getByRole('link', { name: `Financial Management: ${repository}` })
    ).toHaveAttribute('href', 'https://github.com/migu-developer/financial-management');
    const yenuba = page
      .getByRole('article')
      .filter({ has: page.getByRole('heading', { name: 'Yenuba' }) });
    await expect(yenuba.getByRole('link')).toHaveCount(0);
    await expect(yenuba.getByRole('list')).toHaveCount(0);
    for (const [title, card] of [
      ['Financial Management', finance],
      ['Yenuba', yenuba],
    ] as const) {
      await card.getByRole('button').click();
      const dialog = page.getByRole('dialog', { name: title });
      await expect(dialog.getByRole('img')).toHaveJSProperty('naturalWidth', 1080);
      await expect(dialog.getByRole('link')).toHaveCount(title === 'Yenuba' ? 0 : 2);
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
    }
  });
}

test('renders the complete portfolio and supports project discovery', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: /i build digital products that feel/i })
  ).toBeVisible();
  await expect(page.locator('[data-site-header]')).toBeVisible();
  await expect(page.locator('.availability')).not.toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('.product-system')).toBeVisible();

  const projectIsland = page.locator('astro-island[component-url*="ProjectExplorer"]');
  await projectIsland.scrollIntoViewIfNeeded();
  await expect(projectIsland).not.toHaveAttribute('ssr', '');
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect(page.getByText('Showing 12 of 32 projects')).toBeVisible();

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

test('submits contact messages only through the same-origin server endpoint', async ({
  page,
  request,
}) => {
  const rejected = await request.post('/api/contact/', {
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://attacker.example',
      'X-Requested-With': 'MigudevContactForm',
    },
    data: {
      name: 'Security Test',
      email: 'security@example.com',
      message: 'This cross-origin request must never reach the private mailer.',
      company: '',
      elapsedMs: 2500,
    },
  });
  expect(rejected.status()).toBe(403);

  let submittedBody: Record<string, unknown> | undefined;
  await page.route(/\/api\/contact\/?$/, async route => {
    submittedBody = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Message received.' }),
    });
  });
  await page.goto('/');

  const contactIsland = page.locator('astro-island[component-url*="ContactForm"]');
  await contactIsland.scrollIntoViewIfNeeded();
  await expect(contactIsland).not.toHaveAttribute('ssr', '');
  await page.getByRole('textbox', { name: 'Name' }).fill('Miguel Example');
  await page.getByRole('textbox', { name: 'Email' }).fill('miguel@example.com');
  await page
    .getByRole('textbox', { name: 'Project or opportunity' })
    .fill('I would like to discuss a secure product engineering opportunity.');
  await page.getByRole('button', { name: /start a conversation/i }).click();

  await expect(page.getByRole('status')).toContainText('Message received');
  expect(submittedBody).toMatchObject({
    name: 'Miguel Example',
    email: 'miguel@example.com',
    locale: 'en',
    company: '',
  });
  expect(page.url()).toMatch(/^http:\/\/127\.0\.0\.1:/);
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

test('expands the floating profile and keeps WhatsApp as a direct action', async ({ page }) => {
  await page.goto('/');

  const dock = page.getByRole('complementary', { name: 'Quick contact with Miguel' });
  const whatsapp = dock.getByRole('link', { name: /whatsapp/i });
  const profileTrigger = dock.getByRole('button', { name: 'View Miguel Gutierrez profile' });
  const profileIndicator = profileTrigger.locator('.profile-contact-dock__chevron');

  await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/573113230033');
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  await expect(profileTrigger).toHaveAttribute('aria-expanded', 'false');
  await expect(profileTrigger).toHaveCSS('overflow', 'visible');
  await expect(profileIndicator).toBeVisible();

  const triggerBox = await profileTrigger.boundingBox();
  const indicatorBox = await profileIndicator.boundingBox();
  expect(triggerBox).not.toBeNull();
  expect(indicatorBox).not.toBeNull();
  expect(indicatorBox!.y).toBeLessThan(triggerBox!.y);
  const indicatorCenter = indicatorBox!.x + indicatorBox!.width / 2;
  const triggerCenter = triggerBox!.x + triggerBox!.width / 2;
  expect(indicatorCenter).toBeGreaterThan(triggerCenter + 20);

  await profileTrigger.click();

  const dialog = page.getByRole('dialog', { name: 'Miguel Angel Gutierrez Maya' });
  await expect(dialog).toBeVisible();
  await expect(profileTrigger).toHaveAttribute('aria-expanded', 'true');
  await expect(dialog.getByRole('img', { name: /miguel/i })).toBeVisible();
  await expect
    .poll(() =>
      dialog
        .getByRole('img', { name: /miguel/i })
        .evaluate(image => (image as HTMLImageElement).naturalWidth)
    )
    .toBeGreaterThan(0);

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(profileTrigger).toHaveAttribute('aria-expanded', 'false');
  await expect(profileTrigger).toBeFocused();
});

test('opens project imagery in an accessible detail dialog', async ({ page }) => {
  await page.goto('/');

  const projectIsland = page.locator('astro-island[component-url*="ProjectExplorer"]');
  await projectIsland.scrollIntoViewIfNeeded();
  await expect(projectIsland).not.toHaveAttribute('ssr', '');
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();

  const trigger = page.getByRole('button', {
    name: 'View larger: View Biky AI Native image in detail',
  });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();

  const dialog = page.getByRole('dialog', { name: 'Biky AI Native' });
  await expect(dialog).toBeVisible();
  const dialogImage = dialog.getByRole('img', { name: /biky ai native/i });
  await expect(dialog).toHaveAttribute('data-shared-transition', 'true');
  await expect(dialogImage).toBeVisible();
  await expect(dialogImage).toHaveAttribute('decoding', 'sync');
  await expect(dialogImage).toHaveAttribute('fetchpriority', 'high');
  await expect(dialog.getByText('SwiftUI')).toBeVisible();
  await expect
    .poll(() => dialogImage.evaluate(image => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  await expect(page.locator('html')).not.toHaveAttribute('data-project-preview-transition', 'true');
  await expect(dialog).toHaveCSS('animation-name', 'none');

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(
    page.getByRole('button', { name: 'View larger: View Assignar Core API image in detail' })
  ).toHaveCount(0);
});

test('publishes canonical search and LLM discovery metadata', async ({ page, request }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy/');
  await expect(page.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /^https?:\/\/.+\/en\/$/
  );
  await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute(
    'href',
    /^https?:\/\/.+\/es\/$/
  );
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

for (const route of [
  '/en/',
  '/es/',
  '/privacy/index.html',
  '/terms/index.html',
  '/es/privacy/index.html',
  '/es/terms/index.html',
]) {
  test(`@a11y has no detectable accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    // Voice-control users must be able to activate links using their visible labels.
    for (const [locale, name] of [
      ['en', 'EN — English'],
      ['es', 'ES — Español'],
    ] as const) {
      const languageLinks = page.locator(`.language-switcher a[lang="${locale}"]:visible`);
      await expect(languageLinks.first()).toBeVisible();
      for (const link of await languageLinks.all()) {
        await expect(link).toHaveAccessibleName(name);
      }
    }

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
