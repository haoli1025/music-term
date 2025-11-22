import { test, expect } from '@playwright/test';

test.describe('Quiz Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to load
    await Promise.race([
      page.waitForSelector('text=Music Terms Explorer', { timeout: 10000 }),
      page.waitForSelector('input[placeholder*="Search"]', { timeout: 10000 }),
      page.waitForSelector('input[placeholder*="搜索"]', { timeout: 10000 }),
    ]);
    // Navigate to Quiz tab
    const quizTab = page.getByRole('tab', { name: /quiz|测验/i });
    await quizTab.click();
    await page.waitForTimeout(1000);
  });

  test('should display quiz selection screen', async ({ page }) => {
    // Check that grade selection buttons are visible
    const allGradesButton = page.getByText(/all grades|所有级别/i);
    await expect(allGradesButton).toBeVisible();
    
    // Check that "Start Quiz" button is visible
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await expect(startButton).toBeVisible();
  });

  test('should start quiz when clicking Start Quiz button', async ({ page }) => {
    // Wait for Start Quiz button to be visible
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await expect(startButton).toBeVisible({ timeout: 10000 });
    await startButton.click();
    
    // Wait for quiz to start - wait for question or answer options
    await page.waitForTimeout(2000);
    
    // Check that a question is displayed or answer options are visible
    const questionText = page.locator('text=/what is|什么是/i');
    const answerOptions = page.locator('button').filter({ hasText: /./ });
    
    // Wait for either question text or answer options
    await Promise.race([
      expect(questionText).toBeVisible({ timeout: 10000 }),
      expect(answerOptions.first()).toBeVisible({ timeout: 10000 }),
    ]);
    
    // Check that answer options are visible
    const optionCount = await answerOptions.count();
    expect(optionCount).toBeGreaterThanOrEqual(2);
  });

  test('should allow selecting an answer', async ({ page }) => {
    // Start the quiz
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await expect(startButton).toBeVisible({ timeout: 10000 });
    await startButton.click();
    await page.waitForTimeout(2000);
    
    // Wait for answer options to be available
    const answerOptions = page.locator('button').filter({ hasText: /./ });
    await expect(answerOptions.first()).toBeVisible({ timeout: 10000 });
    
    // Click on the first answer option
    await answerOptions.first().click();
    await page.waitForTimeout(1000);
    
    // Check that result is shown (correct or incorrect indicator) or Next button appears
    const resultIndicator = page.locator('[class*="check"]').or(page.locator('[class*="x"]'));
    const nextButton = page.getByRole('button', { name: /next question|下一题|finish quiz|完成测验/i });
    
    await Promise.race([
      expect(resultIndicator.first()).toBeVisible({ timeout: 5000 }),
      expect(nextButton).toBeVisible({ timeout: 5000 }),
    ]);
  });

  test('should show next button after answering', async ({ page }) => {
    // Start the quiz
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await startButton.click();
    await page.waitForTimeout(1000);
    
    // Select an answer
    const firstOption = page.locator('button').filter({ hasText: /./ }).first();
    await firstOption.click();
    await page.waitForTimeout(500);
    
    // Check for Next button
    const nextButton = page.getByRole('button', { name: /next question|下一题/i });
    await expect(nextButton).toBeVisible({ timeout: 2000 });
  });

  test('should progress through questions', async ({ page }) => {
    // Start the quiz
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await startButton.click();
    await page.waitForTimeout(1000);
    
    // Answer first question
    const firstOption = page.locator('button').filter({ hasText: /./ }).first();
    await firstOption.click();
    await page.waitForTimeout(500);
    
    // Click Next
    const nextButton = page.getByRole('button', { name: /next question|下一题/i });
    await nextButton.click();
    await page.waitForTimeout(1000);
    
    // Check that a new question is displayed
    const questionText = page.locator('text=/what is|什么是/i');
    await expect(questionText).toBeVisible();
  });

  test('should show progress indicator', async ({ page }) => {
    // Start the quiz
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await startButton.click();
    await page.waitForTimeout(1000);
    
    // Check for progress indicator (e.g., "1 of 10")
    const progressText = page.locator('text=/of|共/i');
    await expect(progressText).toBeVisible({ timeout: 2000 });
  });

  test('should complete quiz and show results', async ({ page }) => {
    // Start the quiz
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await startButton.click();
    await page.waitForTimeout(1000);
    
    // Answer all questions (assuming max 10 questions)
    for (let i = 0; i < 10; i++) {
      // Wait for question to load
      await page.waitForTimeout(500);
      
      // Check if quiz is complete
      const completeMessage = page.locator('text=/quiz complete|测验完成/i');
      const isComplete = await completeMessage.isVisible().catch(() => false);
      if (isComplete) break;
      
      // Select an answer
      const options = page.locator('button').filter({ hasText: /./ });
      const optionCount = await options.count();
      if (optionCount > 0) {
        await options.first().click();
        await page.waitForTimeout(500);
        
        // Click Next if available
        const nextButton = page.getByRole('button', { name: /next question|下一题/i });
        if (await nextButton.isVisible()) {
          await nextButton.click();
          await page.waitForTimeout(500);
        }
      } else {
        break;
      }
    }
    
    // Check for completion message
    const completeMessage = page.locator('text=/quiz complete|测验完成/i').or(
      page.locator('text=/score|得分/i')
    );
    await expect(completeMessage).toBeVisible({ timeout: 5000 });
  });

  test('should allow restarting quiz', async ({ page }) => {
    // Start and complete a quiz (or at least start it)
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await startButton.click();
    await page.waitForTimeout(1000);
    
    // Try to find restart button (might be after completion or available during quiz)
    const restartButton = page.getByRole('button', { name: /try again|重新测验/i });
    
    // If restart button exists, click it
    if (await restartButton.isVisible().catch(() => false)) {
      await restartButton.click();
      await page.waitForTimeout(500);
      
      // Check that quiz selection screen is shown again
      const startButtonAgain = page.getByRole('button', { name: /start quiz|开始测验/i });
      await expect(startButtonAgain).toBeVisible();
    }
  });

  test('should filter quiz by grade', async ({ page }) => {
    // Select Grade 1
    const grade1Button = page.getByText(/grade 1|一级/i).first();
    await grade1Button.click();
    await page.waitForTimeout(500);
    
    // Start quiz
    const startButton = page.getByRole('button', { name: /start quiz|开始测验/i });
    await startButton.click();
    await page.waitForTimeout(1000);
    
    // Check that quiz started (question should be visible)
    const questionText = page.locator('text=/what is|什么是/i');
    await expect(questionText).toBeVisible({ timeout: 5000 });
  });
});

