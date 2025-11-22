import { useState } from "react";
import { MusicTerm, grades, gradeLabels } from "../data/musicTerms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, GraduationCap } from "lucide-react";

interface BrowseTermsProps {
  terms: MusicTerm[];
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  cardLanguage?: "en" | "zh";
}

export function BrowseTerms({ terms, searchQuery: externalSearchQuery, onSearchQueryChange, cardLanguage = "en" }: BrowseTermsProps) {
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(0);
  
  // Use external search query if provided (for state persistence), otherwise use internal
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = onSearchQueryChange || setInternalSearchQuery;

  const filteredTerms = terms.filter((term) => {
    if (!searchQuery.trim()) {
      const matchesGrade = selectedGrade === 0 || term.grade === selectedGrade;
      return matchesGrade;
    }

    const matchesGrade = selectedGrade === 0 || term.grade === selectedGrade;
    const query = searchQuery.toLowerCase();
    
    // Search in both English and Chinese fields
    const matchesSearch =
      term.term.toLowerCase().includes(query) ||
      term.definition.toLowerCase().includes(query) ||
      (term.example && term.example.toLowerCase().includes(query)) ||
      term.termChinese.includes(searchQuery) ||
      term.definitionChinese.includes(searchQuery) ||
      (term.exampleChinese && term.exampleChinese.includes(searchQuery));
    
    return matchesSearch && matchesGrade;
  });

  // Sort by grade, then by term name
  const sortedTerms = [...filteredTerms].sort((a, b) => {
    if (a.grade !== b.grade) {
      return a.grade - b.grade;
    }
    return a.term.localeCompare(b.term);
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder={cardLanguage === "en" ? "Search music terms..." : "搜索音乐术语..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-purple-600" />
            <span className="font-medium">{cardLanguage === "en" ? "Filter by Grade" : "按级别筛选"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {grades.map((grade) => (
              <Badge
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedGrade(grade)}
              >
                {gradeLabels[grade]}
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
                    {term.term}
                  </CardTitle>
                  <Badge variant="outline" className="bg-purple-50 border-purple-200">
                    {gradeLabels[term.grade]}
                  </Badge>
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
          {cardLanguage === "en" ? "No terms found matching your search." : "未找到匹配的术语。"}
        </div>
      )}
    </div>
  );
}
