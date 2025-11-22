# Quick Guide: How to Update Music Terms to Match Your ABRSM Book

## Overview

This app uses a JSON file to store music terms data. The data includes:
- **Term** (always in English)
- **Definition** (English and Chinese)
- **Grade** (1-5, or 0 for "All Grades")
- **Example** (optional, English and Chinese)
- **Chinese translations** (term, definition, example)

## Method 1: Edit the JSON File Directly (Recommended)

1. **Open the JSON file** at `/src/data/musicTermsDataProd.json`

2. **Find the term you want to update** by searching for its English term name

3. **Update the fields**:
   - `grade`: Change the number (1-5) to match your ABRSM book
   - `definition`: Update the English definition
   - `definitionChinese`: Update the Chinese definition
   - `example`: Update the example (optional)
   - `exampleChinese`: Update the Chinese example (optional)

4. **Save the file** - the app will automatically reload with your changes!

Example:
```json
{
  "id": "5",
  "term": "allegro",
  "definition": "quick, lively",
  "grade": 1,
  "example": "The piece should be played allegro to show its cheerful character.",
  "termChinese": "快板",
  "definitionChinese": "活泼而快速地演奏",
  "exampleChinese": "这首曲子需要用快板演奏，展现其轻快的性格。"
}
```

---

## Method 2: Add New Terms

To add a new term, add a new object to the JSON array:

```json
{
  "id": "31",
  "term": "moderato",
  "definition": "at a moderate tempo",
  "grade": 2,
  "example": "Play moderato, not too fast or too slow.",
  "termChinese": "中板",
  "definitionChinese": "中等速度",
  "exampleChinese": "用中板演奏，不要太快或太慢。"
}
```

**Important:**
- Use a unique `id` (string format, e.g., "31")
- `term` should always be in English (lowercase)
- `grade` must be a number from 1 to 5
- `example` and `exampleChinese` are optional fields

---

## Data Structure

Each term object has the following structure:

```typescript
{
  id: string;              // Unique identifier (e.g., "1", "2", "3")
  term: string;            // English term (always lowercase, e.g., "allegro")
  definition: string;       // English definition
  grade: number;           // Grade level (1-5)
  example?: string;        // English example (optional)
  termChinese: string;     // Chinese term translation
  definitionChinese: string; // Chinese definition translation
  exampleChinese?: string;  // Chinese example translation (optional)
}
```

---

## Language Features

### Browse Terms Mode
- **Term title**: Always displays in English
- **Language toggle**: Located in the top right corner
- **When English is selected**: Shows English definition and example
- **When Chinese is selected**: Shows Chinese term + definition + example

### Quiz Mode
- **Term**: Always shown in English (e.g., "What is 'allegro'?")
- **Language toggle**: Controls the language of:
  - Question text and instructions
  - Answer options (definitions)
  - Examples shown after answering
- **Same questions**: Switching language keeps the same questions and answer order, only translates the text

---

## Current Grade Assignments

The current assignments are estimates. Please update them based on your official ABRSM book:

**Grade 1:** Basic tempo and dynamics terms (allegro, adagio, forte, piano, etc.)

**Grade 2:** More tempo variations and expression marks

**Grade 3:** Advanced tempo, dynamics, and musical forms

**Grade 4:** Complex musical terms and techniques

**Grade 5:** Advanced theory and composition terms

---

## Search Functionality

The search feature works in both languages:
- **English search**: Searches English term, definition, and example
- **Chinese search**: Searches Chinese term, definition, and example
- **Mixed search**: When language is not English, searches both English and Chinese fields

---

## Tips

- ✅ **Grade should be a number from 1 to 5**
- ✅ **Term should always be in English (lowercase)**
- ✅ **Keep Chinese translations consistent**
- ✅ **Use the JSON format for easy editing**
- ✅ **Test your changes by switching between grades in Browse or Quiz mode**
- ✅ **Test language switching to ensure translations are correct**
- ⚠️ **Make sure every term has all required fields** (id, term, definition, grade, termChinese, definitionChinese)
- ⚠️ **Optional fields** (example, exampleChinese) can be omitted if not available

---

## File Locations

- **Data file**: `/src/data/musicTermsDataProd.json`
- **Type definitions**: `/src/data/musicTerms.ts`
- **Translations**: `/src/data/translations.ts`

---

## Need Help?

If you encounter any issues:
1. Check that your JSON is valid (use a JSON validator)
2. Make sure `grade` is a number (1-5), not text
3. Verify all required fields are present
4. Ensure `id` is unique for each term
5. Check that Chinese translations are properly formatted
