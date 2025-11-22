# ABRSM Grade Categorization

This document outlines how music terms are categorized by ABRSM grade levels (1-5) in this application.

## Overview

The application contains music terminology organized by ABRSM Theory Exam grade levels:
- **Grade 1**: 24 terms - Basic foundational concepts
- **Grade 2**: 25 terms - Expanding tempo, dynamics, and expression
- **Grade 3**: 23 terms - More complex dynamics and harmony basics
- **Grade 4**: 21 terms - Musical forms and advanced expression techniques
- **Grade 5**: 21 terms - Advanced musical forms and composition types

**Total: 114 terms**

---

## Grade 1 (24 terms)
Basic music terminology - foundational concepts for beginners

**Tempo Terms:**
- a tempo - return to the original speed
- accelerando - gradually getting faster
- adagio - slow
- allegretto - fairly quick, but not as fast as allegro
- allegro - quick, lively
- andante - at a walking pace
- ritardando - gradually getting slower

**Dynamics:**
- crescendo - gradually getting louder
- decrescendo - gradually getting softer
- diminuendo - gradually getting softer
- f (forte) - loud
- ff (fortissimo) - very loud
- mf (mezzo forte) - moderately loud
- mp (mezzo piano) - moderately soft
- p (piano) - soft

**Expression & Style:**
- cantabile - in a singing style
- da capo - from the beginning
- fine - the end
- legato - smooth and connected

---

## Grade 2 (25 terms)
Expanding tempo and dynamic range, basic articulation

**Tempo Terms:**
- andantino - slightly faster than andante
- largo - very slow and broad
- lento - slow
- moderato - at a moderate tempo
- presto - very fast
- rallentando - gradually getting slower
- vivace - lively and fast

**Dynamics:**
- più forte - louder
- più piano - softer
- sempre - always, continuously

**Expression & Style:**
- dolce - sweetly, gently
- staccato - short, detached
- tenuto - held, sustained

---

## Grade 3 (23 terms)
More complex dynamics and harmony basics

**Tempo Terms:**
- adagietto - slightly faster than adagio
- allegro assai - very fast and lively
- allegro ma non troppo - fast, but not excessively fast
- con moto - with movement
- lento assai - very slow

**Dynamics:**
- forte-piano - loud then immediately soft
- sforzando - suddenly loud, with force

**Expression & Style:**
- con forza - with strength
- espressivo - expressively
- grazioso - gracefully
- maestoso - majestically
- più mosso - more movement, faster
- meno mosso - less movement, slower

---

## Grade 4 (21 terms)
Musical forms and advanced expression techniques

**Tempo Terms:**
- allegro ed energico - fast and energetic
- animato - animated, lively
- larghetto - slightly faster than largo
- più animato - more animated

**Expression & Style:**
- con brio - with vigor, spirit
- con spirito - with spirit, sparkle
- deciso - decisively, firmly
- perdendosi - fading away
- stringendo - pressing forward, getting faster
- tempo rubato - flexible tempo

---

## Grade 5 (21 terms)
Advanced musical forms and composition types

**Tempo Terms:**
- allegro con fuoco - fast with fire, passion
- più allegro - faster
- più lento - slower

**Expression & Style:**
- appassionato - passionately
- con sordino - with mute
- più mosso - more movement
- senza sordino - without mute
- sostenuto - sustained
- subito - suddenly

---

## Usage in the App

### Browse Terms Mode
- **Filter by grade**: Use the grade filter badges to show only terms from a specific grade
- **Grade display**: Each term card displays its grade level badge
- **Sorting**: Terms are automatically sorted by grade, then alphabetically by term name
- **Language toggle**: Switch between English and Chinese explanations while keeping terms in English
- **Search**: Search works in both English and Chinese across all fields

### Quiz Mode
- **Grade selection**: Choose a specific grade (1-5) to practice, or "All Grades" for mixed practice
- **Term display**: Questions always show the English term (e.g., "What is 'allegro'?")
- **Language toggle**: Controls the language of:
  - Question text and instructions
  - Answer options (definitions)
  - Examples shown after answering
- **Same questions**: Switching language keeps the same questions and answer order, only translates the text
- **Term count**: Each grade selection shows the number of terms available for that grade

### Language Features
- **Term titles**: Always displayed in English
- **Definitions**: Switchable between English and Chinese
- **Examples**: Switchable between English and Chinese
- **Chinese mode**: Shows Chinese term + definition + example together

---

## Data Structure

Terms are stored in `/src/data/musicTermsDataProd.json` with the following structure:

```json
{
  "id": "1",
  "term": "a tempo",
  "definition": "return to the original speed",
  "grade": 1,
  "example": "After the ritardando, play a tempo to resume the original flow.",
  "termChinese": "回到原速",
  "definitionChinese": "回到原本的速度",
  "exampleChinese": "在渐慢之后，请回到原速，让音乐恢复原来的流动感。"
}
```

---

## Updating Grade Assignments

To update grade assignments:

1. Open `/src/data/musicTermsDataProd.json`
2. Find the term you want to update
3. Change the `grade` field (1-5)
4. Save the file - changes will be reflected immediately

**Note**: Grade assignments should match your official ABRSM Theory Exam syllabus. The current assignments are estimates and should be verified against official ABRSM materials.

---

## Tips for Students

- ✅ Start with Grade 1 terms and work your way up
- ✅ Use the Browse mode to study terms by grade
- ✅ Use Quiz mode to test your knowledge
- ✅ Switch languages to practice in both English and Chinese
- ✅ Focus on one grade at a time for systematic learning
- ✅ Review examples to understand how terms are used in context

This categorization helps students prepare systematically for ABRSM theory exams at their appropriate level.
