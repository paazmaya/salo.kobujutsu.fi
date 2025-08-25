import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('Page has proper semantic structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('Salon Yuishinkai');
    
    // Check for semantic HTML5 elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main, section[role="main"]')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Check for proper alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Alt attribute should exist (even if empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('Language attribute is set correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page has proper language declaration
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('lang', 'fi');
  });

});
