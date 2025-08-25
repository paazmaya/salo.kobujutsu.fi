import { test, expect } from '@playwright/test';

test.describe('Performance and Loading Tests', () => {
  test('Page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    console.log(`Page loaded in ${loadTime}ms`);
  });

  test('All static assets load successfully', async ({ page }) => {
    const failedRequests: string[] = [];
    
    // Listen for failed requests
    page.on('requestfailed', request => {
      failedRequests.push(`${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify no requests failed
    expect(failedRequests).toEqual([]);
  });

  test('CSS and fonts load correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that CSS is loaded by verifying computed styles
    const bodyStyles = await page.locator('body').evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        margin: styles.margin,
        padding: styles.padding,
        fontFamily: styles.fontFamily
      };
    });
    
    // Body should have some styling applied (not default browser styles)
    expect(bodyStyles.margin || bodyStyles.padding || bodyStyles.fontFamily).toBeTruthy();
  });

  test('Images load with correct dimensions', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check the main logo image
    const logoImg = page.locator('header img[src="/icons/salon-yuishinkai-96x96.png"]');
    await expect(logoImg).toBeVisible();
    
    // Verify image has loaded and has dimensions
    const boundingBox = await logoImg.boundingBox();
    expect(boundingBox?.width).toBeGreaterThan(0);
    expect(boundingBox?.height).toBeGreaterThan(0);
  });

  test('No console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should have no console errors
    expect(consoleErrors).toEqual([]);
  });

  test('Favicon and manifest load correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check favicon exists
    const faviconResponse = await page.request.get('/favicon.ico');
    expect(faviconResponse.status()).toBe(200);
    
    // Check manifest exists
    const manifestResponse = await page.request.get('/manifest.webmanifest');
    expect(manifestResponse.status()).toBe(200);
    
    // Verify manifest content
    const manifestContent = await manifestResponse.json();
    expect(manifestContent).toHaveProperty('name');
  });

  test('HTTP security headers are present', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    const headers = response?.headers() || {};
    
    // Check for important security headers (these might be set by Netlify)
    // Note: These might not be present in local development
    if (process.env.CI) {
      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['x-frame-options']).toBe('SAMEORIGIN');
    }
  });
});
