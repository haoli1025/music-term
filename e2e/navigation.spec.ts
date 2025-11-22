import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load - wait for either title or search input
    await Promise.race([
      page.waitForSelector('text=Music Terms Explorer', { timeout: 10000 }),
      page.waitForSelector('input[placeholder*="Search"]', { timeout: 10000 }),
      page.waitForSelector('input[placeholder*="搜索"]', { timeout: 10000 }),
    ]);
  });

  test('should navigate between Browse and Quiz tabs', async ({ page }) => {
    // Start on Browse tab (default)
    const browseTab = page.getByRole('tab', { name: /browse|浏览/i });
    await expect(browseTab).toHaveAttribute('data-state', 'active');
    
    // Navigate to Quiz tab
    const quizTab = page.getByRole('tab', { name: /quiz|测验/i });
    await quizTab.click();
    await page.waitForTimeout(500);
    
    // Check that Quiz tab is active
    await expect(quizTab).toHaveAttribute('data-state', 'active');
    
    // Check that quiz content is visible
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await expect(startButton).toBeVisible();
    
    // Navigate back to Browse tab
    await browseTab.click();
    await page.waitForTimeout(500);
    
    // Check that Browse tab is active
    await expect(browseTab).toHaveAttribute('data-state', 'active');
    
    // Check that browse content is visible
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    await expect(searchInput).toBeVisible();
  });

  test('should maintain state when switching tabs', async ({ page }) => {
    // Perform a search on Browse tab
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('allegro');
    await page.waitForTimeout(500);
    
    // Verify the search was entered
    await expect(searchInput).toHaveValue('allegro');
    
    // Switch to Quiz tab
    const quizTab = page.getByRole('tab', { name: /quiz|测验/i });
    await quizTab.click();
    await page.waitForTimeout(500);
    
    // Verify we're on Quiz tab
    await expect(quizTab).toHaveAttribute('data-state', 'active');
    
    // Switch back to Browse tab
    const browseTab = page.getByRole('tab', { name: /browse|浏览/i });
    await browseTab.click();
    await page.waitForTimeout(500);
    
    // Wait for Browse tab to be active and search input to be visible again
    await expect(browseTab).toHaveAttribute('data-state', 'active');
    
    // Re-find the search input (it might be a new element reference)
    const searchInputAfterSwitch = page.getByPlaceholder(/search|搜索/i);
    await expect(searchInputAfterSwitch).toBeVisible({ timeout: 5000 });
    
    // Check that search input still has the value
    await expect(searchInputAfterSwitch).toHaveValue('allegro');
  });

  test('should display correct content for each tab', async ({ page }) => {
    // Browse tab content
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    await expect(searchInput).toBeVisible();
    
    const gradeFilter = page.getByText(/all grades|所有级别/i);
    await expect(gradeFilter).toBeVisible();
    
    // Switch to Quiz tab
    const quizTab = page.getByRole('tab', { name: /quiz|测验/i });
    await quizTab.click();
    await page.waitForTimeout(500);
    
    // Quiz tab content
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await expect(startButton).toBeVisible();
    
    // Search input should not be visible in Quiz tab
    await expect(searchInput).not.toBeVisible();
  });
});

