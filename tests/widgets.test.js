const {
  normalizeParams,
  getTzTime,
  escXml,
  validateBorderColor,
  parseHexColor,
  renderWidget
} = require('../lib/widgets');

describe('Widget helpers', () => {
  test('escXml escapes XML-sensitive characters and handles null/undefined', () => {
    expect(escXml('<>&"\'')).toBe('&lt;&gt;&amp;&quot;&apos;');
    expect(escXml(null)).toBe('');
    expect(escXml(undefined)).toBe('');
  });

  test('getTzTime returns UTC-based values for invalid timezones and valid values for UTC', () => {
    const utcNow = new Date();
    const expectedWeekday = utcNow.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
    const expectedMonth = utcNow.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    const expectedHour = String(utcNow.getUTCHours()).padStart(2, '0');
    const expectedMinute = String(utcNow.getUTCMinutes()).padStart(2, '0');
    const expectedSecond = String(utcNow.getUTCSeconds()).padStart(2, '0');

    const valid = getTzTime('UTC');
    // Seconds can drift between snapshot calls; assert stable fields only.
    expect(valid.weekday).toBe(expectedWeekday);
    expect(valid.month).toBe(expectedMonth);
    expect(valid.h).toBe(expectedHour);
    expect(valid.m).toBe(expectedMinute);
    expect(valid.s).toMatch(/^\d{2}$/);

    const invalid = getTzTime('Mars/Phobos');
    expect(invalid.weekday).toBe(expectedWeekday);
    expect(invalid.month).toBe(expectedMonth);
    expect(invalid.h).toBe(expectedHour);
    expect(invalid.m).toBe(expectedMinute);
    expect(invalid.s).toMatch(/^\d{2}$/);
  });

  test('parseHexColor accepts valid hex strings and rejects invalid values', () => {
    expect(parseHexColor('#fff')).toBe('#fff');
    expect(parseHexColor('abcdef')).toBe('#abcdef');
    expect(parseHexColor('1234')).toBe(null);
    expect(parseHexColor('notcolor')).toBe(null);
  });

  test('validateBorderColor accepts CSS color names and hex color values only', () => {
    expect(validateBorderColor('red')).toBe('red');
    expect(validateBorderColor('#123abc')).toBe('#123abc');
    expect(validateBorderColor('invalid-color')).toBe('');
    expect(validateBorderColor('')).toBe('');
  });
});

describe('normalizeParams', () => {
  test('applies defaults and normalizes platform/musicPlatform values', () => {
    const params = normalizeParams({
      showSeconds: 'no',
      showDate: '0',
      showDay: 'false',
      shadow: '1',
      platform: 'GITHUB',
      musicPlatform: 'SPOTIFY',
      startDate: 'invalid-date',
      bgColor: 'not-a-color',
      borderColor: 'transparent'
    });

    expect(params.timezone).toBe('Asia/Kolkata');
    expect(params.theme).toBe('classic');
    expect(params.timeFormat).toBe('24h');
    expect(params.showSeconds).toBe(false);
    expect(params.showDate).toBe(false);
    expect(params.showDay).toBe(false);
    expect(params.shadow).toBe(true);
    expect(params.platform).toBe('github');
    expect(params.musicPlatform).toBe('spotify');
    expect(params.startDate).toBe('2024-01-01');
    expect(params.bgColor).toBe(null);
    expect(params.borderColor).toBe('transparent');
  });

  test('truncates long profile strings safely with ellipsis', () => {
    const params = normalizeParams({
      name: 'A'.repeat(32),
      role: 'B'.repeat(42),
      bio: 'C'.repeat(100)
    });

    expect(params.name).toMatch(/A{24}\.{3}$/);
    expect(params.role).toMatch(/B{30}\.{3}$/);
    expect(params.bio).toMatch(/C{70}\.{3}$/);
  });

  test('normalizes unsupported platforms to none and keeps valid ones', () => {
    expect(normalizeParams({ platform: 'unsupported', musicPlatform: 'unknown' }).platform).toBe('none');
    expect(normalizeParams({ platform: 'leetcode', musicPlatform: 'ytmusic' }).musicPlatform).toBe('ytmusic');
  });
});

describe('renderWidget', () => {
  test('renders a time widget SVG and includes expected text elements', async () => {
    const xml = await renderWidget('time', { timezone: 'UTC', label: 'Local Time' });
    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain('<text');
    expect(xml).toContain('Local Time'.toUpperCase());
  });

  test('returns sanitized unknown widget error output', async () => {
    const xml = await renderWidget('<evil>', {});
    expect(xml).toContain('Unknown widget: &lt;evil&gt;');
    expect(xml).not.toContain('<evil>');
  });

  test('renders a countdown widget SVG', async () => {
    const xml = await renderWidget('countdown', { eventName: 'Graduation', targetDate: '2026-05-15' });
    expect(xml).toContain('COUNTDOWN TO');
    expect(xml).toContain('GRADUATION');
  });
});
