# How to Update Music Terms Data

## Easy Way: Edit the CSV file

The easiest way to update the music terms is to edit the `musicTermsData.csv` file. This file contains all the terms in a simple, readable format.

### CSV Format:
```
term,definition,category,grade,example,termChinese,definitionChinese,exampleChinese
```

### Fields:
- **term**: English term name
- **definition**: English definition
- **category**: One of: Tempo, Dynamics, Forms, Notation, Harmony, Expression
- **grade**: ABRSM grade level (1-5)
- **example**: Optional example or note (use commas carefully or avoid them)
- **termChinese**: Chinese term name
- **definitionChinese**: Chinese definition
- **exampleChinese**: Chinese example

### Tips for Editing:
1. Open `musicTermsData.csv` in a text editor or spreadsheet program
2. Each line after the header is one term
3. Keep commas as separators
4. If your text contains commas, avoid them or replace with other punctuation
5. Grade should be a number from 1 to 5
6. Category must match exactly: Tempo, Dynamics, Forms, Notation, Harmony, or Expression

### After Editing:
1. Save the CSV file
2. Run the converter (see below)
3. The app will automatically use the new data

---

## Converting CSV to TypeScript

After you edit the CSV file, you need to convert it back to the TypeScript format that the app uses.

### Option 1: Manual Conversion
Copy the CSV content and paste it into an online CSV-to-JSON converter, then manually update `musicTerms.ts`.

### Option 2: Use a Script
You can create a simple Node.js script to convert the CSV automatically, or use this Python script:

```python
import csv
import json

# Read CSV
with open('musicTermsData.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    terms = list(reader)

# Convert to TypeScript format
print("export const musicTerms: MusicTerm[] = [")
for i, term in enumerate(terms):
    print("  {")
    print(f"    id: \"{i+1}\",")
    print(f"    term: \"{term['term']}\",")
    print(f"    definition: \"{term['definition']}\",")
    print(f"    category: \"{term['category']}\",")
    print(f"    grade: {term['grade']},")
    if term['example']:
        print(f"    example: \"{term['example']}\",")
    print(f"    termChinese: \"{term['termChinese']}\",")
    print(f"    definitionChinese: \"{term['definitionChinese']}\",")
    if term['exampleChinese']:
        print(f"    exampleChinese: \"{term['exampleChinese']}\"")
    print("  }" + ("," if i < len(terms) - 1 else ""))
print("];")
```

---

## Quick Reference: ABRSM Grades

According to the official ABRSM syllabus, here are the typical terms for each grade:

### Grade 1
Basic tempo and dynamic markings, simple notation symbols

### Grade 2
Extended tempo/dynamics, basic articulation marks

### Grade 3
More complex dynamics, introduction to harmony concepts

### Grade 4
Musical forms, advanced expression techniques

### Grade 5
Complex forms, composition terminology

---

## Need to Add More Terms?

Simply add a new line to the CSV file following the same format:

```
NewTerm,New definition,Category,Grade,Optional example,中文术语,中文定义,中文例子
```

Make sure to keep the same number of commas (7 commas total = 8 fields).

---

## Current Categories

- **Tempo**: Speed/pace terms (Allegro, Andante, etc.)
- **Dynamics**: Volume/intensity (Forte, Piano, etc.)
- **Forms**: Musical structure (Sonata, Symphony, etc.)
- **Notation**: Music notation symbols (Clef, Sharp, etc.)
- **Harmony**: Chords and intervals (Scale, Chord, etc.)
- **Expression**: Playing techniques (Legato, Staccato, etc.)

If you need to add a new category, you'll also need to update:
1. `categories` array in `musicTerms.ts`
2. `categoriesChinese` object in `musicTerms.ts`
