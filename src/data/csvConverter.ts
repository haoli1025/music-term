/**
 * CSV to TypeScript Converter for Music Terms
 * 
 * This utility helps convert the CSV data back to TypeScript format.
 * 
 * To use:
 * 1. Edit musicTermsData.csv with your correct ABRSM grade data
 * 2. Copy the CSV content
 * 3. Use this function to convert it
 * 4. Replace the musicTerms array in musicTerms.ts
 */

export function convertCSVToTypeScript(csvText: string): string {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  let output = 'export const musicTerms: MusicTerm[] = [\n';
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    output += '  {\n';
    output += `    id: "${i}",\n`;
    output += `    term: "${values[0]}",\n`;
    output += `    definition: "${values[1]}",\n`;
    output += `    category: "${values[2]}",\n`;
    output += `    grade: ${values[3]},\n`;
    
    if (values[4]) {
      output += `    example: "${values[4]}",\n`;
    }
    
    output += `    termChinese: "${values[5]}",\n`;
    output += `    definitionChinese: "${values[6]}",\n`;
    
    if (values[7]) {
      output += `    exampleChinese: "${values[7]}"\n`;
    }
    
    output += '  }';
    if (i < lines.length - 1) {
      output += ',';
    }
    output += '\n';
  }
  
  output += '];\n';
  return output;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Example usage (for testing):
// const csvData = `term,definition,category,grade,example,termChinese,definitionChinese,exampleChinese
// Allegro,Fast tempo,Tempo,1,Example,快板,快速,例子`;
// 
// console.log(convertCSVToTypeScript(csvData));
