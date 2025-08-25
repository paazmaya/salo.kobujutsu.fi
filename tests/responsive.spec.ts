import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'Mobile Portrait', width: 375, height: 667 },
    { name: 'Mobile Landscape', width: 667, height: 375 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Large Desktop', width: 1920, height: 1080 }
  ];

  for (const viewport of viewports) {
    test(`Homepage renders correctly on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      // Set viewport size
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Navigate to homepage
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for this viewport
      await expect(page).toHaveScreenshot(`homepage-${viewport.name.toLowerCase().replace(' ', '-')}.png`, {
        fullPage: true,
        animations: 'disabled'
      });
      
      // Verify key elements are still visible and accessible
      await expect(page.locator('header h1')).toBeVisible();
      await expect(page.locator('section[role="main"]')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  }

  test('Touch targets are appropriately sized on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if there are any clickable elements and verify they're touch-friendly
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      if (await link.isVisible()) {
        const boundingBox = await link.boundingBox();
        if (boundingBox) {
          // Touch targets should be at least 44px in either dimension
          expect(boundingBox.width >= 44 || boundingBox.height >= 44).toBeTruthy();
        }
      }
    }
  });
});
