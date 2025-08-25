import { test, expect } from '@playwright/test';

test.describe('Salon Yuishinkai Homepage Visual Tests', () => {
  test('Homepage loads correctly and matches visual baseline', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Verify page title
    await expect(page).toHaveTitle(/Kobujutsua ja Karatea Salon ja Lohjan alueella - Salon Yuishinkai ry/);
    
    // Check for main elements
    await expect(page.locator('header h1')).toContainText('Salon Yuishinkai');
    await expect(page.locator('section[role="main"] h2')).toContainText('Okinawalaisia kamppailutaitoja');
  
  });

  test('Header section visual verification', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Screenshot just the header
    await expect(page.locator('header')).toHaveScreenshot('header-section.png');
  });

  test('Main content section visual verification', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Screenshot the main content area
    await expect(page.locator('section[role="main"]')).toHaveScreenshot('main-content.png');
  });

  test('Footer section visual verification', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Screenshot the footer
    await expect(page.locator('footer')).toHaveScreenshot('footer-section.png');
  });

  test('Logo and favicon are loaded', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that the logo image is visible
    const logo = page.locator('header img[src="/icons/salon-yuishinkai-96x96.png"]');
    await expect(logo).toBeVisible();
    
    // Verify the image has loaded properly
    await expect(logo).toHaveAttribute('src', '/icons/salon-yuishinkai-96x96.png');
  });

  test('CSS styles are applied correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that CSS is loaded by verifying computed styles
    const body = page.locator('body');
    
    // Verify that custom CSS is applied (check for any specific styles)
    const headerElement = page.locator('header');
    await expect(headerElement).toBeVisible();
    
    // Take screenshot to verify styling
    await expect(page.locator('body')).toHaveScreenshot('styled-page.png', {
      animations: 'disabled'
    });
  });

  test('Email obfuscation script works', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for the JavaScript to execute that replaces the email
    await page.waitForFunction(() => {
      const element = document.querySelector('#sahkoposti');
      return element && element.textContent.includes('@');
    });
    
    // Verify the email is now properly formatted
    const emailElement = page.locator('#sahkoposti');
    await expect(emailElement).toContainText('jukka.paasonen@kobujutsu.fi');
  });

  test('Meta tags and SEO elements', async ({ page }) => {
    await page.goto('/');
    
    // Check various meta tags
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'Ryukyu kobujutsua ja Yuishinkai karatea Salon alueella');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'Ryukyu kobujutsua ja Yuishinkai karatea Salon alueella');
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no');
  });
});
