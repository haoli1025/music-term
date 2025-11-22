import { useState, useMemo, useCallback } from "react";
import { MusicTerm, grades, gradeLabels } from "../data/musicTerms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, GraduationCap, Tag } from "lucide-react";
import { translations } from "../data/translations";

interface BrowseTermsProps {
  terms: MusicTerm[];
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  cardLanguage?: "en" | "zh";
}

export function BrowseTerms({ terms, searchQuery: externalSearchQuery, onSearchQueryChange, cardLanguage = "en" }: BrowseTermsProps) {
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  const t = translations[cardLanguage];
  
  // Use external search query if provided (for state persistence), otherwise use internal
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = onSearchQueryChange || setInternalSearchQuery;

  // Get all unique categories from terms
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(terms.map(term => term.category))).sort();
    return uniqueCategories;
  }, [terms]);

  // Memoize filtered and sorted terms to avoid recalculating on every render
  const sortedTerms = useMemo(() => {
    const filtered = terms.filter((term) => {
      const matchesGrade = selectedGrade === 0 || term.grade === selectedGrade;
      const matchesCategory = !selectedCategory || term.category === selectedCategory;
      
      if (!searchQuery.trim()) {
        return matchesGrade && matchesCategory;
      }

      const query = searchQuery.toLowerCase();
      
      // Search in both English and Chinese fields, including abbreviation
      const matchesSearch =
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        (term.example && term.example.toLowerCase().includes(query)) ||
        (term.abbreviation && term.abbreviation.toLowerCase().includes(query)) ||
        term.termChinese.includes(searchQuery) ||
        term.definitionChinese.includes(searchQuery) ||
        (term.exampleChinese && term.exampleChinese.includes(searchQuery));
      
      return matchesSearch && matchesGrade && matchesCategory;
    });

    // Sort by grade, then by term name
    return [...filtered].sort((a, b) => {
      if (a.grade !== b.grade) {
        return a.grade - b.grade;
      }
      return a.term.localeCompare(b.term);
    });
  }, [terms, selectedGrade, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-purple-600" />
            <span className="font-medium">{t.filterByGrade}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {grades.map((grade) => (
              <Badge
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedGrade(grade)}
              >
                {t.grades[grade as keyof typeof t.grades] || gradeLabels[grade]}
              </Badge>
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4 text-purple-600" />
            <span className="font-medium">{t.filterByCategory}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!selectedCategory ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("")}
            >
              {t.allCategories}
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {t.categories[category as keyof typeof t.categories] || category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTerms.map((term) => {
          const showChinese = cardLanguage === "zh";
          
          return (
            <Card key={term.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{term.term}</span>
                      {term.abbreviation && (
                        <span className="text-sm font-normal text-muted-foreground">
                          ({term.abbreviation})
                        </span>
                      )}
                    </div>
                  </CardTitle>
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline" className="bg-purple-50 border-purple-200">
                      {t.grades[term.grade as keyof typeof t.grades] || gradeLabels[term.grade]}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="border-teal-300"
                      style={{ backgroundColor: '#f0fdfa', borderColor: '#5eead4' }}
                    >
                      {t.categories[term.category as keyof typeof t.categories] || term.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {showChinese ? (
                  <>
                    <CardDescription className="mb-2">
                      <span className="font-medium">{term.termChinese}</span>：{term.definitionChinese}
                    </CardDescription>
                    {term.exampleChinese && (
                      <p className="text-sm text-muted-foreground italic">
                        {term.exampleChinese}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <CardDescription className="mb-2">
                      {term.definition}
                    </CardDescription>
                    {term.example && (
                      <p className="text-sm text-muted-foreground italic">
                        {term.example}
                      </p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {sortedTerms.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {t.noTermsFound}
        </div>
      )}
    </div>
  );
}
