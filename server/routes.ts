import type { Express } from "express";
import { createServer, type Server } from "http";
import { clockParamsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/time", (req, res) => {
    try {
      // Parse and validate query parameters
      const params = clockParamsSchema.parse(req.query);
      
      // Get current time in specified timezone
      const now = new Date();
      const timeZone = params.timezone || "Asia/Kolkata";
      const timeInZone = new Date(now.toLocaleString("en-US", { timeZone }));
      
      // Format time based on 12/24 hour preference
      let timeString;
      if (params.format === "12") {
        timeString = timeInZone.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
      } else {
        timeString = timeInZone.toTimeString().slice(0, 8);
      }
      
      // Get date and day if requested
      const dateString = params.showDate === "true" ? 
        timeInZone.toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric",
          year: "numeric"
        }) : "";
      
      const dayString = params.showDay === "true" ? 
        timeInZone.toLocaleDateString("en-US", { weekday: "long" }) : "";
      
      // Theme configurations
      const themes = {
        light: { bg: "#ffffff", text: "#1f2328", accent: "#0969da" },
        dark: { bg: "#0d1117", text: "#f0f6fc", accent: "#58a6ff" },
        gradient: { bg: "url(#grad1)", text: "#ffffff", accent: "#ffd700" },
        minimal: { bg: "#f6f8fa", text: "#24292f", accent: "#0969da" },
        neon: { bg: "#000000", text: "#00ff00", accent: "#ff00ff" }
      };
      
      // Size configurations
      const sizes = {
        small: { width: 240, height: 60, fontSize: 20, smallFont: 12 },
        medium: { width: 320, height: 80, fontSize: 28, smallFont: 14 },
        large: { width: 400, height: 100, fontSize: 36, smallFont: 16 }
      };
      
      const currentTheme = themes[params.theme];
      const currentSize = sizes[params.size];
      
      // Override with custom colors if provided
      const bgColor = params.background ? `#${params.background}` : currentTheme.bg;
      const textColor = params.color ? `#${params.color}` : currentTheme.text;
      const accentColor = currentTheme.accent;
      
      // Country code mapping (using text instead of emojis for better compatibility)
      const countryFlags: Record<string, string> = {
        "IN": "IN", "US": "US", "GB": "UK", "CA": "CA", "AU": "AU", 
        "DE": "DE", "FR": "FR", "JP": "JP", "CN": "CN", "BR": "BR"
      };
      
      // Calculate layout and positioning
      const hasFlag = params.showFlag === "true";
      const hasDay = params.showDay === "true";
      const hasDate = params.showDate === "true";
      
      // Adjust size based on content
      const extraHeight = (hasDate ? 18 : 0) + (hasDay ? 18 : 0) + (hasFlag ? 20 : 0);
      const adjustedHeight = currentSize.height + extraHeight;
      
      // Calculate vertical positioning for main time
      let timeYPos = adjustedHeight / 2;
      const lineSpacing = 20;
      
      if (hasFlag && hasDay && hasDate) {
        timeYPos = adjustedHeight / 2 - 5;
      } else if ((hasFlag && hasDay) || (hasFlag && hasDate) || (hasDay && hasDate)) {
        timeYPos = adjustedHeight / 2;
      }
      
      // Font families based on theme
      const fontFamilies = {
        light: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        dark: "'JetBrains Mono', 'SF Mono', Monaco, monospace",
        gradient: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
        minimal: "'SF Pro Display', -apple-system, sans-serif",
        neon: "'Orbitron', 'SF Mono', Monaco, monospace"
      };
      
      const currentFont = fontFamilies[params.theme] || fontFamilies.light;
      
      // Generate gradient definition if needed
      const gradientDef = params.theme === "gradient" ? `
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>` : "";
      
      // Build SVG content with adjusted height
      let svgContent = `<svg width="${currentSize.width}" height="${adjustedHeight}" xmlns="http://www.w3.org/2000/svg">
        ${gradientDef}
        <rect width="100%" height="100%" fill="${bgColor}" rx="12" stroke="${accentColor}" stroke-width="2"/>`;
      
      // Add country code flag if requested (top-right corner)
      if (hasFlag) {
        const countryCode = countryFlags[params.country] || "IN";
        svgContent += `
        <rect x="${currentSize.width - 35}" y="8" width="28" height="16" fill="${accentColor}" rx="3"/>
        <text x="${currentSize.width - 21}" y="18" text-anchor="middle" font-family="${currentFont}" font-size="10" font-weight="bold" fill="${bgColor}">
          ${countryCode}
        </text>`;
      }
      
      // Add day if requested (above time)
      if (hasDay) {
        const dayY = timeYPos - 25;
        svgContent += `
        <text x="50%" y="${dayY}" text-anchor="middle" font-family="${currentFont}" font-size="${currentSize.smallFont}" font-weight="600" fill="${accentColor}">
          ${dayString.toUpperCase()}
        </text>`;
      }
      
      // Add main time (centered)
      svgContent += `
        <text x="50%" y="${timeYPos}" text-anchor="middle" dominant-baseline="middle" font-family="${currentFont}" font-size="${currentSize.fontSize}" font-weight="bold" fill="${textColor}">
          ${timeString}
        </text>`;
      
      // Add date if requested (below time)
      if (hasDate) {
        const dateY = timeYPos + 25;
        svgContent += `
        <text x="50%" y="${dateY}" text-anchor="middle" font-family="${currentFont}" font-size="${currentSize.smallFont}" font-weight="500" fill="${accentColor}">
          ${dateString}
        </text>`;
      }
      
      svgContent += `</svg>`;
      
      // Set proper headers for SVG and no caching
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      res.status(200).send(svgContent);
    } catch (error) {
      // Return error SVG for invalid parameters
      const errorSvg = `<svg width="300" height="80" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#fee2e2" rx="8"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Monaco, monospace" font-size="16" font-weight="bold" fill="#dc2626">
    Invalid Parameters
  </text>
</svg>`;
      
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.status(400).send(errorSvg);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
