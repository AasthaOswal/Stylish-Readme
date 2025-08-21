import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, Check, Palette, Globe, Calendar, Flag, Settings, Github, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [domain, setDomain] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Configuration state
  const [config, setConfig] = useState({
    theme: "light",
    size: "medium", 
    format: "24",
    showDate: "false",
    showDay: "false",
    showFlag: "false",
    country: "IN",
    timezone: "Asia/Kolkata"
  });

  useEffect(() => {
    setDomain(window.location.origin);
  }, []);

  const generateURL = () => {
    const params = new URLSearchParams();
    Object.entries(config).forEach(([key, value]) => {
      if (value !== "light" && value !== "medium" && value !== "24" && value !== "false" && value !== "IN" && value !== "Asia/Kolkata") {
        params.append(key, value);
      }
    });
    const queryString = params.toString();
    return `${domain}/api/time${queryString ? `?${queryString}` : ""}`;
  };

  const generateEmbedCode = () => {
    return `![Awesome Time Badge](${generateURL()})`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Embed code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const themeOptions = [
    { value: "light", label: "Light", desc: "Clean white background" },
    { value: "dark", label: "Dark", desc: "GitHub dark theme" },
    { value: "gradient", label: "Gradient", desc: "Beautiful gradient colors" },
    { value: "minimal", label: "Minimal", desc: "Simple and clean" },
    { value: "neon", label: "Neon", desc: "Bright green on black" }
  ];

  const sizeOptions = [
    { value: "small", label: "Small", desc: "240×60px" },
    { value: "medium", label: "Medium", desc: "320×80px" },
    { value: "large", label: "Large", desc: "400×100px" }
  ];

  const timezoneOptions = [
    { value: "Asia/Kolkata", label: "India (IST)" },
    { value: "America/New_York", label: "New York (EST)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Australia/Sydney", label: "Sydney (AEST)" },
    { value: "Europe/Berlin", label: "Berlin (CET)" },
    { value: "America/Los_Angeles", label: "Los Angeles (PST)" },
  ];

  const countryOptions = [
    { value: "IN", label: "India" },
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "CN", label: "China" },
    { value: "BR", label: "Brazil" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" data-testid="home-page">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50" data-testid="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center">
                <Clock className="text-white" size={16} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold text-black" style={{fontFamily: "'SF Pro Display', -apple-system, sans-serif"}}>
                  Awesome Time Badge
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Make your README come alive</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="text-lg font-bold text-black" style={{fontFamily: "'SF Pro Display', -apple-system, sans-serif"}}>
                  ATB
                </h1>
              </div>
            </div>
            
            {/* Desktop version */}
            <div className="hidden sm:flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                <Github className="w-3 h-3 mr-1" />
                Open Source
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://github.com/cu-sanjay/Awesome-README-Time', '_blank')}
                data-testid="button-github"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
            
            {/* Mobile version */}
            <div className="flex sm:hidden items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('https://github.com/cu-sanjay/Awesome-README-Time', '_blank')}
                data-testid="button-github-mobile"
                className="p-2"
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          
          {/* Left Column - Customization */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Settings className="text-blue-600" size={18} />
                  Customize Your Badge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                
                {/* Theme Selection */}
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Theme Style</label>
                  <Select value={config.theme} onValueChange={(value) => setConfig({...config, theme: value})}>
                    <SelectTrigger data-testid="select-theme">
                      <SelectValue placeholder="Choose theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themeOptions.map(theme => (
                        <SelectItem key={theme.value} value={theme.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{theme.label}</span>
                            <span className="text-xs text-gray-500 ml-2">{theme.desc}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Badge Size</label>
                  <Select value={config.size} onValueChange={(value) => setConfig({...config, size: value})}>
                    <SelectTrigger data-testid="select-size">
                      <SelectValue placeholder="Choose size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map(size => (
                        <SelectItem key={size.value} value={size.value}>
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm">{size.label}</span>
                            <span className="text-xs text-gray-500 ml-2 hidden sm:inline">{size.desc}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Format */}
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Time Format</label>
                  <Select value={config.format} onValueChange={(value) => setConfig({...config, format: value})}>
                    <SelectTrigger data-testid="select-format">
                      <SelectValue placeholder="Choose format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 Hour (14:30:45)</SelectItem>
                      <SelectItem value="12">12 Hour (2:30:45 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                    <Globe className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Timezone
                  </label>
                  <Select value={config.timezone} onValueChange={(value) => setConfig({...config, timezone: value})}>
                    <SelectTrigger data-testid="select-timezone">
                      <SelectValue placeholder="Choose timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezoneOptions.map(tz => (
                        <SelectItem key={tz.value} value={tz.value}>
                          <span className="text-sm">{tz.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Show Date Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    Show Date
                  </label>
                  <Select value={config.showDate} onValueChange={(value) => setConfig({...config, showDate: value})}>
                    <SelectTrigger className="w-20 sm:w-24" data-testid="select-showdate">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">No</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Show Day Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">Show Day</label>
                  <Select value={config.showDay} onValueChange={(value) => setConfig({...config, showDay: value})}>
                    <SelectTrigger className="w-20 sm:w-24" data-testid="select-showday">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">No</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Show Flag Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
                    <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                    Show Flag
                  </label>
                  <Select value={config.showFlag} onValueChange={(value) => setConfig({...config, showFlag: value})}>
                    <SelectTrigger className="w-20 sm:w-24" data-testid="select-showflag">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">No</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Country Selection (only if flag is enabled) */}
                {config.showFlag === "true" && (
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Country Flag</label>
                    <Select value={config.country} onValueChange={(value) => setConfig({...config, country: value})}>
                      <SelectTrigger data-testid="select-country">
                        <SelectValue placeholder="Choose country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryOptions.map(country => (
                          <SelectItem key={country.value} value={country.value}>
                            <span className="text-sm">{country.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview & Embed */}
          <div className="space-y-4 sm:space-y-6">
            
            {/* Live Preview */}
            <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Palette className="text-purple-600" size={18} />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-8 text-center border-2 border-dashed border-gray-300">
                  <img 
                    src={generateURL()} 
                    alt="Time Badge Preview" 
                    className="mx-auto max-w-full h-auto"
                    data-testid="img-preview"
                  />
                  <p className="text-xs text-gray-500 mt-2">Live preview refreshes automatically</p>
                </div>
              </CardContent>
            </Card>

            {/* Embed Code */}
            <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Copy Embed Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 relative">
                  <code className="text-green-400 text-xs sm:text-sm font-mono break-all" data-testid="code-embed">
                    {generateEmbedCode()}
                  </code>
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 sm:h-8 sm:w-8 p-0"
                    variant={copied ? "default" : "secondary"}
                    data-testid="button-copy"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                  </Button>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-3">
                  Add this to your README.md file and watch your profile come alive!
                </p>
              </CardContent>
            </Card>

            {/* Quick Examples */}
            <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Quick Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <img 
                        src={`${domain}/api/time?theme=light&size=small`} 
                        alt="Light theme example" 
                        className="max-w-[120px] sm:max-w-none h-auto"
                      />
                      <span className="text-xs sm:text-sm font-medium truncate">Simple & Clean</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(`![Time Badge](${domain}/api/time?theme=light&size=small)`)}
                      data-testid="button-copy-light"
                      className="shrink-0 h-8 w-8 p-0"
                    >
                      <Copy size={12} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <img 
                        src={`${domain}/api/time?theme=dark&size=small`} 
                        alt="Dark theme example" 
                        className="max-w-[120px] sm:max-w-none h-auto"
                      />
                      <span className="text-xs sm:text-sm font-medium truncate">Dark Mode</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(`![Time Badge](${domain}/api/time?theme=dark&size=small)`)}
                      data-testid="button-copy-dark"
                      className="shrink-0 h-8 w-8 p-0"
                    >
                      <Copy size={12} />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <img 
                        src={`${domain}/api/time?theme=gradient&size=small&showFlag=true&country=IN`} 
                        alt="Gradient theme example" 
                        className="max-w-[120px] sm:max-w-none h-auto"
                      />
                      <span className="text-xs sm:text-sm font-medium truncate">With Flag</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(`![Time Badge](${domain}/api/time?theme=gradient&size=small&showFlag=true&country=IN)`)}
                      data-testid="button-copy-gradient"
                      className="shrink-0 h-8 w-8 p-0"
                    >
                      <Copy size={12} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}