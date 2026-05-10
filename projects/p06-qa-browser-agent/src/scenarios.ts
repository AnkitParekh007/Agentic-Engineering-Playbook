import type { Page } from 'playwright';
import type { ScenarioCheck, ScenarioName } from './types';

const mockPages: Record<ScenarioName, string> = {
  homepage_smoke: `
    <html>
      <body style="font-family: Arial; background: #08131d; color: #eaf7ff; padding: 32px;">
        <header><h1>Agentic Engineering Playbook</h1></header>
        <main>
          <p>Design, ship, and harden modern AI products.</p>
          <a href="#docs">Explore Docs</a>
        </main>
      </body>
    </html>
  `,
  login_form_visual_check: `
    <html>
      <body style="font-family: Arial; background: #08131d; color: #eaf7ff; padding: 32px;">
        <main>
          <h1>Workspace Login</h1>
          <form>
            <label>Email <input type="email" name="email" /></label>
            <label>Password <input type="password" name="password" /></label>
            <button type="submit">Sign in</button>
          </form>
        </main>
      </body>
    </html>
  `,
  navigation_check: `
    <html>
      <body style="font-family: Arial; background: #08131d; color: #eaf7ff; padding: 32px;">
        <nav>
          <a href="#overview">Overview</a>
          <a href="#projects">Projects</a>
          <a href="#security">Security</a>
        </nav>
        <section id="overview"><h1>Overview</h1></section>
        <section id="projects"><h2>Projects</h2><p>Project ladder content.</p></section>
        <section id="security"><h2>Security</h2></section>
      </body>
    </html>
  `,
};

export function getScenarioDescription(scenario: ScenarioName): string {
  switch (scenario) {
    case 'homepage_smoke':
      return 'Open the target and confirm the main heading and primary call to action are visible.';
    case 'login_form_visual_check':
      return 'Open the target and confirm the login form fields and button are present for a visual pass.';
    case 'navigation_check':
      return 'Open the target and confirm navigation links work and the destination section is visible.';
  }
}

export async function loadScenarioTarget(page: Page, scenario: ScenarioName, targetUrl: string, timeoutMs: number): Promise<void> {
  if (targetUrl.startsWith('mock://')) {
    await page.goto('about:blank', { waitUntil: 'domcontentloaded', timeout: timeoutMs });
    await page.setContent(mockPages[scenario], { waitUntil: 'domcontentloaded', timeout: timeoutMs });
    return;
  }

  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
}

export async function executeScenario(page: Page, scenario: ScenarioName): Promise<ScenarioCheck[]> {
  switch (scenario) {
    case 'homepage_smoke':
      return runHomepageSmoke(page);
    case 'login_form_visual_check':
      return runLoginVisualCheck(page);
    case 'navigation_check':
      return runNavigationCheck(page);
  }
}

async function runHomepageSmoke(page: Page): Promise<ScenarioCheck[]> {
  const headingVisible = await page.locator('h1').first().isVisible();
  const ctaVisible = await page.locator('a').first().isVisible();

  return [
    {
      name: 'heading_visible',
      success: headingVisible,
      detail: headingVisible ? 'Main heading is visible.' : 'Main heading is missing.',
    },
    {
      name: 'cta_visible',
      success: ctaVisible,
      detail: ctaVisible ? 'Primary call to action is visible.' : 'Primary call to action is missing.',
    },
  ];
}

async function runLoginVisualCheck(page: Page): Promise<ScenarioCheck[]> {
  const emailVisible = await page.locator('input[type="email"]').isVisible();
  const passwordVisible = await page.locator('input[type="password"]').isVisible();
  const submitVisible = await page.locator('button[type="submit"]').isVisible();

  return [
    {
      name: 'email_input_visible',
      success: emailVisible,
      detail: emailVisible ? 'Email field is visible.' : 'Email field is missing.',
    },
    {
      name: 'password_input_visible',
      success: passwordVisible,
      detail: passwordVisible ? 'Password field is visible.' : 'Password field is missing.',
    },
    {
      name: 'submit_button_visible',
      success: submitVisible,
      detail: submitVisible ? 'Submit button is visible.' : 'Submit button is missing.',
    },
  ];
}

async function runNavigationCheck(page: Page): Promise<ScenarioCheck[]> {
  await page.locator('a[href="#projects"]').click();
  const hash = await page.evaluate(() => window.location.hash);
  const sectionVisible = await page.locator('#projects').isVisible();

  return [
    {
      name: 'navigation_hash_updated',
      success: hash === '#projects',
      detail: hash === '#projects' ? 'Navigation updated the hash.' : `Expected #projects but saw ${hash || 'empty hash'}.`,
    },
    {
      name: 'projects_section_visible',
      success: sectionVisible,
      detail: sectionVisible ? 'Projects section is visible.' : 'Projects section is not visible.',
    },
  ];
}
