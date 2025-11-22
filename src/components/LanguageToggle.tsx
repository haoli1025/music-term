import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "zh" : "en")}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === "en" ? "中文" : "English"}
    </Button>
  );
}
