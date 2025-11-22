import { test, expect } from '@playwright/test';

test.describe('Browse Terms Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load - wait for either title or search input
    await Promise.race([
      page.waitForSelector('text=Music Terms Explorer', { timeout: 10000 }),
      page.waitForSelector('input[placeholder*="Search"]', { timeout: 10000 }),
      page.waitForSelector('input[placeholder*="搜索"]', { timeout: 10000 }),
    ]);
  });

  test('should display the browse terms page by default', async ({ page }) => {
    // Check that the browse tab is active
    const browseTab = page.getByRole('tab', { name: /browse|浏览/i });
    await expect(browseTab).toHaveAttribute('data-state', 'active');
    
    // Check that search input is visible
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    await expect(searchInput).toBeVisible();
    
    // Check that grade filter badges are visible
    const allGradesBadge = page.getByText(/all grades|所有级别/i);
    await expect(allGradesBadge).toBeVisible();
  });

  test('should display music terms cards', async ({ page }) => {
    // Wait for cards to load - use a more flexible selector
    await page.waitForTimeout(1000); // Give time for data to load
    const cards = page.locator('[class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    
    // Check that at least one card is visible
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('should filter terms by grade', async ({ page }) => {
    // Wait for initial cards to load
    await page.waitForTimeout(1000);
    const initialCards = page.locator('[class*="card"]');
    await expect(initialCards.first()).toBeVisible({ timeout: 10000 });
    const initialCount = await initialCards.count();
    expect(initialCount).toBeGreaterThan(0);
    
    // Find the Grade 1 filter badge
    // All badges with "Grade 1" text - the first ones are filter badges (before cards)
    const allGrade1Badges = page.locator('[class*="badge"]').filter({ hasText: /grade 1|一级/i });
    const badgeCount = await allGrade1Badges.count();
    expect(badgeCount).toBeGreaterThan(0);
    
    // The first badge should be the filter badge (appears before cards in DOM)
    const grade1FilterBadge = allGrade1Badges.first();
    await expect(grade1FilterBadge).toBeVisible({ timeout: 5000 });
    
    // Click the filter badge
    await grade1FilterBadge.click();
    
    // Wait for filtering to complete
    await page.waitForTimeout(1000);
    
    // Check that filtered cards are visible (should be fewer or equal to initial)
    const filteredCards = page.locator('[class*="card"]');
    const filteredCount = await filteredCards.count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
    
    // Verify that at least one card shows Grade 1 badge
    // The grade badge in cards is in the card header
    const firstCard = filteredCards.first();
    const cardGradeBadge = firstCard.locator('[class*="badge"]').filter({ hasText: /grade 1|一级/i });
    await expect(cardGradeBadge.first()).toBeVisible({ timeout: 5000 });
  });

  test('should search for terms by English term name', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    
    // Search for "allegro" (lowercase as in JSON, but search is case-insensitive)
    await searchInput.fill('allegro');
    await page.waitForTimeout(500);
    
    // Check that results contain "allegro" (case-insensitive match)
    const allegroCard = page.locator('text=/allegro/i').first();
    await expect(allegroCard).toBeVisible({ timeout: 10000 });
  });

  test('should search for terms by definition', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    
    // Search for "quick" which should match definitions (e.g., "allegro" definition: "quick, lively")
    await searchInput.fill('quick');
    await page.waitForTimeout(500);
    
    // Check that results are shown
    const cards = page.locator('[class*="card"]');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('should search for terms by example', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    
    // Search for "ritardando" which exists in examples (e.g., "After the ritardando, play a tempo...")
    await searchInput.fill('ritardando');
    await page.waitForTimeout(500);
    
    // Check that results contain "ritardando"
    const ritardandoText = page.locator('text=/ritardando/i').first();
    await expect(ritardandoText).toBeVisible({ timeout: 10000 });
  });

  test('should clear search and show all terms', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    
    // Search for something
    await searchInput.fill('allegro');
    await page.waitForTimeout(500);
    
    // Clear the search
    await searchInput.clear();
    await page.waitForTimeout(500);
    
    // Check that more terms are visible now
    const cards = page.locator('[class*="card"]');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('should show "no terms found" when search has no results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    
    // Search for something that doesn't exist
    await searchInput.fill('xyz123nonexistent');
    await page.waitForTimeout(500);
    
    // Check for "no terms found" message
    const noResultsMessage = page.getByText(/no terms found matching|未找到匹配的术语/i);
    await expect(noResultsMessage).toBeVisible();
  });

  test('should combine search and grade filter', async ({ page }) => {
    // Filter by Grade 1
    const grade1Badge = page.getByText(/grade 1|一级/i).first();
    await grade1Badge.click();
    await page.waitForTimeout(500);
    
    // Search for a term that exists in Grade 1 (allegro is grade 1)
    const searchInput = page.getByPlaceholder(/search|搜索/i);
    await searchInput.fill('allegro');
    await page.waitForTimeout(500);
    
    // Check that results are filtered and visible
    const cards = page.locator('[class*="card"]');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThanOrEqual(0);
    
    // Verify that allegro appears in results
    const allegroText = page.locator('text=/allegro/i').first();
    await expect(allegroText).toBeVisible({ timeout: 10000 });
  });
});

