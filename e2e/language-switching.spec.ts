import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load - wait for either title or search input
    await Promise.race([
      page.waitForSelector('text=Music Terms Explorer', { timeout: 10000 }),
      page.waitForSelector('input[placeholder*="Search"]', { timeout: 10000 }),
      page.waitForSelector('input[placeholder*="搜索"]', { timeout: 10000 }),
    ]);
  });

  test('should switch language from English to Chinese', async ({ page }) => {
    // Check initial language is English
    const englishTitle = page.locator('text=Music Terms Explorer');
    await expect(englishTitle).toBeVisible();
    
    // Find and click language toggle (button shows "中文" when language is "en")
    const languageToggle = page.getByRole('button').filter({ hasText: /中文/i });
    await languageToggle.click();
    await page.waitForTimeout(500);
    
    // Check that Chinese text appears
    const chineseText = page.locator('text=/音乐术语探索|浏览术语/i');
    await expect(chineseText.first()).toBeVisible({ timeout: 3000 });
  });

  test('should switch language from Chinese to English', async ({ page }) => {
    // First switch to Chinese (button shows "中文" when language is "en")
    const languageToggle = page.getByRole('button').filter({ hasText: /中文/i });
    await languageToggle.click();
    await page.waitForTimeout(500);
    
    // Switch back to English (button now shows "English" when language is "zh")
    const englishToggle = page.getByRole('button').filter({ hasText: /English/i });
    await englishToggle.click();
    await page.waitForTimeout(500);
    
    // Check that English text appears
    const englishText = page.locator('text=/Music Terms Explorer|Browse Terms/i');
    await expect(englishText.first()).toBeVisible({ timeout: 3000 });
  });

  test('should update search placeholder when language changes', async ({ page }) => {
    // Check English placeholder
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
    
    // Switch to Chinese
    const languageToggle = page.getByRole('button').filter({ hasText: /中文/i });
    await languageToggle.click();
    await page.waitForTimeout(500);
    
    // Check Chinese placeholder
    const chineseSearchInput = page.getByPlaceholder(/搜索/i);
    await expect(chineseSearchInput).toBeVisible({ timeout: 3000 });
  });

  test('should update tab labels when language changes', async ({ page }) => {
    // Check English tab labels
    const browseTabEn = page.getByRole('tab', { name: /browse terms/i });
    await expect(browseTabEn).toBeVisible();
    
    // Switch to Chinese
    const languageToggle = page.getByRole('button').filter({ hasText: /中文/i });
    await languageToggle.click();
    await page.waitForTimeout(500);
    
    // Check Chinese tab labels
    const browseTabZh = page.getByRole('tab', { name: /浏览术语/i });
    await expect(browseTabZh).toBeVisible({ timeout: 3000 });
  });

  test('should update grade filter labels when language changes', async ({ page }) => {
    // Check English grade labels
    const allGradesEn = page.getByText(/all grades/i);
    await expect(allGradesEn).toBeVisible();
    
    // Switch to Chinese
    const languageToggle = page.getByRole('button').filter({ hasText: /中文/i });
    await languageToggle.click();
    await page.waitForTimeout(500);
    
    // Check Chinese grade labels
    const allGradesZh = page.getByText(/所有级别/i);
    await expect(allGradesZh).toBeVisible({ timeout: 3000 });
  });

  test('should search in correct language after switching', async ({ page }) => {
    // Switch to Chinese
    const languageToggle = page.getByRole('button').filter({ hasText: /中文/i });
    await languageToggle.click();
    await page.waitForTimeout(500);
    
    // Search using Chinese characters
    const searchInput = page.getByPlaceholder(/搜索/i);
    await searchInput.fill('快板');
    await page.waitForTimeout(500);
    
    // Check that results are shown
    const results = page.locator('text=快板').first();
    await expect(results).toBeVisible({ timeout: 3000 });
  });

  test('should maintain search results when switching language', async ({ page }) => {
    // Search in English
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('allegro');
    await page.waitForTimeout(500);
    
    // Verify results are shown
    const allegroText = page.locator('text=/allegro/i').first();
    await expect(allegroText).toBeVisible({ timeout: 10000 });
    
    // Switch language (button shows "中文" when language is "en")
    const languageToggle = page.getByRole('button').filter({ hasText: /中文/i });
    await languageToggle.click();
    await page.waitForTimeout(500);
    
    // Check that search still works (should search in both languages when not English)
    const results = page.locator('[class*="card"]');
    const cardCount = await results.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});

