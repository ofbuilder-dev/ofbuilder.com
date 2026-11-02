// Prayer time calculation (the widely used PrayTimes.org method), all done in the browser.
// Times are estimates; local mosques may follow a slightly different timetable.

export type Method = { name: string; fajr: number; isha: number | { minutes: number } };

export const METHODS: Record<string, Method> = {
  MWL: { name: "Muslim World League", fajr: 18, isha: 17 },
  ISNA: { name: "ISNA (North America)", fajr: 15, isha: 15 },
  Egypt: { name: "Egyptian General Authority", fajr: 19.5, isha: 17.5 },
  Makkah: { name: "Umm al-Qura, Makkah", fajr: 18.5, isha: { minutes: 90 } },
  Karachi: { name: "University of Islamic Sciences, Karachi", fajr: 18, isha: 18 },
};

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const sin = (d: number) => Math.sin(rad(d));
const cos = (d: number) => Math.cos(rad(d));
const tan = (d: number) => Math.tan(rad(d));
const asin = (x: number) => deg(Math.asin(x));
const acos = (x: number) => deg(Math.acos(x));
const atan2 = (y: number, x: number) => deg(Math.atan2(y, x));
const acot = (x: number) => deg(Math.atan(1 / x));
const fix = (a: number, b: number) => {
  const r = a - b * Math.floor(a / b);
  return r < 0 ? r + b : r;
};

function julian(y: number, m: number, d: number) {
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}

function sunPosition(jd: number) {
  const D = jd - 2451545.0;
  const g = fix(357.529 + 0.98560028 * D, 360);
  const q = fix(280.459 + 0.98564736 * D, 360);
  const L = fix(q + 1.915 * sin(g) + 0.02 * sin(2 * g), 360);
  const e = 23.439 - 0.00000036 * D;
  const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
  return { declination: asin(sin(e) * sin(L)), equation: q / 15 - fix(RA, 24) };
}

export type Times = { fajr: number; sunrise: number; dhuhr: number; asr: number; maghrib: number; isha: number };

/** Prayer times as hours (e.g. 13.5 = 13:30) in the given UTC offset. NaN when a time doesn't occur. */
export function prayerTimes(date: Date, lat: number, lng: number, tz: number, method: Method, asrFactor: 1 | 2): Times {
  const jDate = julian(date.getFullYear(), date.getMonth() + 1, date.getDate()) - lng / (15 * 24);
  const midDay = (t: number) => fix(12 - sunPosition(jDate + t).equation, 24);
  const angleTime = (angle: number, t: number, ccw: boolean) => {
    const decl = sunPosition(jDate + t).declination;
    const T = acos((-sin(angle) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat))) / 15;
    return midDay(t) + (ccw ? -T : T);
  };
  const asrTime = (t: number) => {
    const decl = sunPosition(jDate + t).declination;
    return angleTime(-acot(asrFactor + tan(Math.abs(lat - decl))), t, false);
  };

  // One refinement pass from rough starting guesses (as day fractions).
  const fajr = angleTime(method.fajr, 5 / 24, true);
  const sunrise = angleTime(0.833, 6 / 24, true);
  const dhuhr = midDay(12 / 24);
  const asr = asrTime(13 / 24);
  const sunset = angleTime(0.833, 18 / 24, false);
  let isha = typeof method.isha === "number" ? angleTime(method.isha, 18 / 24, false) : sunset + method.isha.minutes / 60;

  const shift = tz - lng / 15;
  const t: Times = { fajr: fajr + shift, sunrise: sunrise + shift, dhuhr: dhuhr + shift, asr: asr + shift, maghrib: sunset + shift, isha: isha + shift };

  // High latitudes: when twilight never ends, use the "angle-based" share of the night.
  const night = fix(t.sunrise - t.maghrib, 24);
  const fajrMax = (method.fajr / 60) * night;
  if (Number.isNaN(t.fajr) || fix(t.sunrise - t.fajr, 24) > fajrMax) t.fajr = t.sunrise - fajrMax;
  if (typeof method.isha === "number") {
    const ishaMax = (method.isha / 60) * night;
    if (Number.isNaN(t.isha) || fix(t.isha - t.maghrib, 24) > ishaMax) t.isha = t.maghrib + ishaMax;
  }
  return t;
}

export function formatTime(h: number) {
  if (!Number.isFinite(h)) return "—";
  const total = Math.round(fix(h, 24) * 60) % 1440;
  const d = new Date(2000, 0, 1, Math.floor(total / 60), total % 60);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

const KAABA = { lat: 21.4225, lng: 39.8262 };

/** Qibla bearing in degrees clockwise from true north. */
export function qibla(lat: number, lng: number) {
  const dLng = KAABA.lng - lng;
  return fix(atan2(sin(dLng), cos(lat) * tan(KAABA.lat) - sin(lat) * cos(dLng)), 360);
}
