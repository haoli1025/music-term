import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { BrowseTerms } from "./components/BrowseTerms";
import { Quiz } from "./components/Quiz";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { musicTerms } from "./data/musicTerms";
import { translations } from "./data/translations";
import { Music, BookOpen, Brain, Languages } from "lucide-react";
import { Button } from "./components/ui/button";

function AppContent() {
  const [browseSearchQuery, setBrowseSearchQuery] = useState("");
  const [cardLanguage, setCardLanguage] = useState<"en" | "zh">("en");
  const t = translations[cardLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCardLanguage(cardLanguage === "en" ? "zh" : "en")}
              className="gap-2"
            >
              <Languages className="h-4 w-4" />
              {cardLanguage === "en" ? "中文" : "English"}
            </Button>
          </div>
          <div className="flex items-center justify-center mb-4">
            <Music className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="mb-2">{t.appTitle}</h1>
          <p className="text-muted-foreground">
            {t.appDescription}
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              {t.browseTerms}
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              {t.quizMode}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-0">
            <BrowseTerms 
              terms={musicTerms} 
              searchQuery={browseSearchQuery} 
              onSearchQueryChange={setBrowseSearchQuery}
              cardLanguage={cardLanguage}
            />
          </TabsContent>

          <TabsContent value="quiz" className="mt-0">
            <Quiz terms={musicTerms} cardLanguage={cardLanguage} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
