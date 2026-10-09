"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Place = {
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  isCurrent?: boolean;
};

type WeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
  };
};

type WeatherInfo = { label: string; icon: string; description: string };

const QUICK_CITIES: Place[] = [
  { name: "東京", country: "日本", latitude: 35.6762, longitude: 139.6503 },
  { name: "大阪", country: "日本", latitude: 34.6937, longitude: 135.5023 },
  { name: "札幌", country: "日本", latitude: 43.0618, longitude: 141.3545 },
  { name: "那覇", country: "日本", latitude: 26.2124, longitude: 127.6809 },
];

function weatherInfo(code: number, isDay = 1): WeatherInfo {
  if (code === 0) return { label: "快晴", icon: isDay ? "☀" : "☾", description: "Clear skies" };
  if (code === 1) return { label: "晴れ", icon: isDay ? "🌤" : "☾", description: "Mainly clear" };
  if (code === 2) return { label: "晴れ時々くもり", icon: "⛅", description: "Partly cloudy" };
  if (code === 3) return { label: "くもり", icon: "☁", description: "Overcast" };
  if (code === 45 || code === 48) return { label: "霧", icon: "🌫", description: "Fog" };
  if (code >= 51 && code <= 57) return { label: "霧雨", icon: "🌦", description: "Drizzle" };
  if (code >= 61 && code <= 67) return { label: "雨", icon: "🌧", description: "Rain" };
  if (code >= 71 && code <= 77) return { label: "雪", icon: "❄", description: "Snow" };
  if (code >= 80 && code <= 82) return { label: "にわか雨", icon: "🌦", description: "Rain showers" };
  if (code === 85 || code === 86) return { label: "にわか雪", icon: "🌨", description: "Snow showers" };
  if (code >= 95) return { label: "雷雨", icon: "⛈", description: "Thunderstorm" };
  return { label: "天気情報", icon: "☁", description: "Weather" };
}

function formatHour(value: string) {
  return new Intl.DateTimeFormat("ja-JP", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo" }).format(new Date(value));
}

function formatDay(value: string, index: number) {
  if (index === 0) return "今日";
  if (index === 1) return "明日";
  return new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "Asia/Tokyo" }).format(new Date(`${value}T12:00:00`));
}

function windDirection(degrees: number) {
  const directions = ["北", "北東", "東", "南東", "南", "南西", "西", "北西"];
  return directions[Math.round(degrees / 45) % 8];
}

export default function Home() {
  const [place, setPlace] = useState<Place>(QUICK_CITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);

  const loadWeather = useCallback(async (target: Place) => {
    const id = ++requestId.current;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        latitude: String(target.latitude),
        longitude: String(target.longitude),
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m",
        hourly: "temperature_2m,precipitation_probability,weather_code",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
        timezone: "Asia/Tokyo",
        forecast_days: "7",
      });
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
      if (!response.ok) throw new Error("天気データを取得できませんでした。");
      const data = (await response.json()) as WeatherData;
      if (id !== requestId.current) return;
      setWeather(data);
      setUpdatedAt(new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }));
    } catch {
      if (id === requestId.current) setError("天気情報を読み込めませんでした。通信環境を確認して、もう一度お試しください。");
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWeather(place);
  }, [place, loadWeather]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationMessage("このブラウザでは位置情報を利用できません。都市検索をご利用ください。");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let name = "現在地";
        let country = "現在地";
        try {
          const url = new URL("https://nominatim.openstreetmap.org/reverse");
          url.searchParams.set("lat", String(latitude));
          url.searchParams.set("lon", String(longitude));
          url.searchParams.set("format", "jsonv2");
          url.searchParams.set("accept-language", "ja");
          const response = await fetch(url.toString());
          if (response.ok) {
            const data = await response.json();
            const address = data.address ?? {};
            name = address.city || address.town || address.village || address.municipality || address.county || "現在地";
            country = address.country || "現在地";
          }
        } catch {
          // Location coordinates are still usable even if reverse geocoding fails.
        }
        setPlace({ name, country, latitude, longitude, isCurrent: true });
        setLocationMessage("");
      },
      () => setLocationMessage("現在地を取得できませんでした。ブラウザの位置情報を許可するか、都市を検索してください。"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const query = search.trim();
    if (query.length < 2) {
      setSuggestions([]);
      setSearching(false);
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setSearching(true);

      try {
        const params = new URLSearchParams({
          name: query,
          count: "6",
          language: "ja",
          format: "json",
        });

        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`
        );
        const data: {
          results?: {
            name: string;
            country?: string;
            admin1?: string;
            latitude: number;
            longitude: number;
          }[];
        } = await response.json();

        if (cancelled) return;

        setSuggestions(
          (data.results ?? []).map((item) => ({
            name: item.name,
            country: item.country,
            admin1: item.admin1,
            latitude: item.latitude,
            longitude: item.longitude,
          }))
        );
      } catch {

        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [search]);

  const currentInfo = useMemo(
    () => weather ? weatherInfo(weather.current.weather_code, weather.current.is_day) : null,
    [weather]
  );

  const hourly = useMemo(() => {
    if (!weather) return [];
    const now = new Date(weather.current.time).getTime();
    const startIndex = Math.max(0, weather.hourly.time.findIndex((time) => new Date(time).getTime() >= now));
    return weather.hourly.time.slice(startIndex, startIndex + 12).map((time, index) => {
      const actualIndex = startIndex + index;
      return {
        time,
        temperature: weather.hourly.temperature_2m[actualIndex],
        rain: weather.hourly.precipitation_probability[actualIndex],
        code: weather.hourly.weather_code[actualIndex],
      };
    });
  }, [weather]);

  function choosePlace(next: Place) {
    setPlace(next);
    setSearch("");
    setSuggestions([]);
    setSearchOpen(false);
    setLocationMessage("");
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationMessage("このブラウザでは位置情報を利用できません。");
      return;
    }
    setLocationMessage("現在地を確認しています…");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let name = "現在地";
        let country = "現在地";
        try {
          const url = new URL("https://nominatim.openstreetmap.org/reverse");
          url.searchParams.set("lat", String(latitude));
          url.searchParams.set("lon", String(longitude));
          url.searchParams.set("format", "jsonv2");
          url.searchParams.set("accept-language", "ja");
          const response = await fetch(url.toString());
          if (response.ok) {
            const data = await response.json();
            const address = data.address ?? {};
            name = address.city || address.town || address.village || address.municipality || address.county || "現在地";
            country = address.country || "現在地";
          }
        } catch {
          // Keep the coordinates even if reverse geocoding is unavailable.
        }
        choosePlace({ name, country, latitude, longitude, isCurrent: true });
      },
      () => setLocationMessage("位置情報を取得できませんでした。ブラウザの設定を確認してください。"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  return (
    <main className="weather-app">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Atmos ホーム">
          <span className="brand-mark"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 20.5a7 7 0 0 1 1.7-13.8A9.5 9.5 0 0 1 26 12a5 5 0 0 1-.5 10H8.8" /><path d="m11 25 2 2m5-2 2 2" /></svg></span>
          <span>atmos<span className="brand-dot">.</span></span>
        </a>
        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="メインナビゲーション">
          <a className="nav-item active" href="#overview"><span>◫</span> 天気ダッシュボード</a>
          <a className="nav-item" href="#hourly"><span>◷</span> 時間ごとの予報</a>
          <a className="nav-item" href="#weekly"><span>▦</span> 週間予報</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="side-label">QUICK LOCATIONS</div>
          {QUICK_CITIES.map((city) => (
            <button key={city.name} className={`saved-city ${place.name === city.name ? "selected" : ""}`} onClick={() => choosePlace(city)}>
              <span className="city-pin">⌖</span><span>{city.name}</span>
              <span className="city-arrow">↗</span>
            </button>
          ))}
          <div className="sidebar-note">
            <span className="note-icon">✦</span>
            <p>今日の空を、<br />もっと身近に。</p>
            <span>Weather, made clear.</span>
          </div>
          <div className="profile-row">
            <div className="profile-avatar">Y</div>
            <div><strong>My weather</strong><span>Personal dashboard</span></div>
            <span className="profile-menu">•••</span>
          </div>
        </div>
      </aside>

      <section className="main-panel" id="overview">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>Weather overview</strong></div>
          <div className="topbar-right">
            <span className="live-status"><span className="live-dot" /> LIVE WEATHER</span>
            <span className="topbar-date">{new Intl.DateTimeFormat("ja-JP", { month: "long", day: "numeric", weekday: "short" }).format(new Date())}</span>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">YOUR PERSONAL WEATHER STATION</div>
              <h1>Weather overview<span>.</span></h1>
              <p>空模様をチェックして、今日の予定をスマートに。</p>
            </div>
            <button className="location-button" onClick={useCurrentLocation} title="現在地の天気を表示"><span>◎</span> 現在地を取得</button>
          </div>

          <div className="search-row">
            <div className="search-box" ref={searchRef}>
              <span className="search-icon">⌕</span>
              <input
                aria-label="都市を検索"
                placeholder="都市名で検索（例：京都、New York）"
                value={search}
                onChange={(event) => { setSearch(event.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && suggestions[0]) choosePlace(suggestions[0]);
                  if (event.key === "Escape") setSearchOpen(false);
                }}
              />
              {searching && <span className="search-spinner" />}
              {searchOpen && search.trim().length >= 2 && (
                <div className="search-results">
                  {searching ? <div className="search-empty">都市を検索しています…</div> :
                    suggestions.length ? suggestions.map((item, index) => (
                      <button key={`${item.name}-${item.latitude}-${index}`} className="search-result" onClick={() => choosePlace(item)}>
                        <span className="result-pin">⌖</span>
                        <span className="result-name">{item.name}<small>{[item.admin1, item.country].filter(Boolean).join(" · ")}</small></span>
                        <span className="result-arrow">↗</span>
                      </button>
                    )) : <div className="search-empty">都市が見つかりません。別の名前をお試しください。</div>}
                </div>
              )}
            </div>
            <span className="search-hint">世界中の都市を検索できます</span>
          </div>

          {locationMessage && <div className="notice"><span>ⓘ</span>{locationMessage}</div>}
          {error && <div className="error-banner"><span>!</span><div><strong>天気データを取得できません</strong><p>{error}</p></div><button onClick={() => void loadWeather(place)}>再試行 ↻</button></div>}

          <div className="section-title-row">
            <div className="section-title"><span className="section-indicator" /> <h2>現在の天気</h2></div>
            <span className="updated-label">{updatedAt ? `最終更新 ${updatedAt}` : "最新の天気データ"}</span>
          </div>

          <div className="dashboard-grid">
            <section className="current-card">
              <div className="current-card-glow" />
              <div className="current-topline"><span className="current-label">CURRENT CONDITIONS</span><span className="current-live"><span /> NOW</span></div>
              <div className="current-location"><span className="location-marker">⌖</span><div><h2>{place.name}</h2><p>{place.country || place.admin1 || "選択中の場所"}{place.isCurrent ? " · 現在地" : ""}</p></div></div>
              {loading && !weather ? (
                <div className="loading-weather"><span className="loading-orb" /><span>天気データを読み込んでいます…</span></div>
              ) : weather && currentInfo ? (
                <>
                  <div className="current-main">
                    <div className="temperature-block"><div className="temperature">{Math.round(weather.current.temperature_2m)}<span>°</span></div><div className="condition">{currentInfo.label}</div><div className="feels-line">体感温度 <strong>{Math.round(weather.current.apparent_temperature)}°C</strong></div></div>
                    <div className="weather-art" aria-label={currentInfo.label}><div className="weather-art-halo" /><span>{currentInfo.icon}</span></div>
                  </div>
                  <div className="current-divider" />
                  <div className="current-footer"><span><span className="mini-icon">↑</span> 最高 <strong>{Math.round(Math.max(...weather.daily.temperature_2m_max.slice(0, 1)))}°</strong></span><span><span className="mini-icon">↓</span> 最低 <strong>{Math.round(Math.min(...weather.daily.temperature_2m_min.slice(0, 1)))}°</strong></span><span><span className="mini-icon">⌁</span> 風速 <strong>{Math.round(weather.current.wind_speed_10m)} km/h</strong></span></div>
                </>
              ) : <div className="empty-weather">天気データを表示できません。</div>}
            </section>

            <section className="details-card">
              <div className="card-heading"><div><span className="eyebrow">AT A GLANCE</span><h2>気象データ</h2></div><span className="card-heading-icon">↗</span></div>
              {loading && !weather ? <div className="detail-loading">データを読み込んでいます…</div> : weather ? (
                <div className="metrics-grid">
                  <div className="metric"><div className="metric-top"><span className="metric-icon humidity">≈</span><span className="metric-label">湿度</span></div><div className="metric-value">{weather.current.relative_humidity_2m}<small>%</small></div><div className="metric-foot">Relative humidity</div><div className="metric-bar"><span style={{ width: `${weather.current.relative_humidity_2m}%` }} /></div></div>
                  <div className="metric"><div className="metric-top"><span className="metric-icon wind">↗</span><span className="metric-label">風速</span></div><div className="metric-value">{Math.round(weather.current.wind_speed_10m)}<small> km/h</small></div><div className="metric-foot">{windDirection(weather.current.wind_direction_10m)}の風</div><div className="metric-bar"><span style={{ width: `${Math.min(100, weather.current.wind_speed_10m * 2)}%` }} /></div></div>
                  <div className="metric"><div className="metric-top"><span className="metric-icon feels">⌁</span><span className="metric-label">体感温度</span></div><div className="metric-value">{Math.round(weather.current.apparent_temperature)}<small>°C</small></div><div className="metric-foot">Feels like</div><div className="metric-bar"><span style={{ width: `${Math.max(8, Math.min(100, (weather.current.apparent_temperature + 10) * 2))}%` }} /></div></div>
                  <div className="metric"><div className="metric-top"><span className="metric-icon rain">⌑</span><span className="metric-label">降水量</span></div><div className="metric-value">{weather.current.precipitation}<small> mm</small></div><div className="metric-foot">Current precipitation</div><div className="metric-bar"><span style={{ width: `${Math.min(100, weather.current.precipitation * 10)}%` }} /></div></div>
                </div>
              ) : <div className="detail-loading">データがありません</div>}
            </section>
          </div>

          <section className="forecast-card hourly-card" id="hourly">
            <div className="forecast-heading"><div><span className="eyebrow">THE NEXT 12 HOURS</span><h2>時間ごとの予報</h2></div><span className="forecast-badge">12 HOURS <span>↗</span></span></div>
            {loading && !weather ? <div className="forecast-loading">予報を読み込んでいます…</div> : weather ? (
              <div className="hourly-scroll"><div className="hourly-list">
                {hourly.map((item, index) => {
                  const info = weatherInfo(item.code, 1);
                  return <div className={`hour-item ${index === 0 ? "hour-now" : ""}`} key={item.time}>
                    <span className="hour-time">{index === 0 ? "現在" : formatHour(item.time)}</span>
                    <span className="hour-icon">{info.icon}</span>
                    <strong className="hour-temp">{Math.round(item.temperature)}°</strong>
                    <span className="hour-rain"><span>⌑</span> {item.rain ?? 0}%</span>
                  </div>;
                })}
              </div></div>
            ) : <div className="forecast-loading">予報がありません</div>}
          </section>

          <section className="forecast-card weekly-card" id="weekly">
            <div className="forecast-heading"><div><span className="eyebrow">YOUR WEEK AHEAD</span><h2>7日間の天気予報</h2></div><span className="forecast-badge">7 DAYS <span>↗</span></span></div>
            {loading && !weather ? <div className="forecast-loading">週間予報を読み込んでいます…</div> : weather ? (
              <div className="weekly-list">
                {weather.daily.time.map((date, index) => {
                  const info = weatherInfo(weather.daily.weather_code[index]);
                  const max = weather.daily.temperature_2m_max[index];
                  const min = weather.daily.temperature_2m_min[index];
                  const range = Math.max(1, ...weather.daily.temperature_2m_max) - Math.min(...weather.daily.temperature_2m_min);
                  const left = ((min - Math.min(...weather.daily.temperature_2m_min)) / range) * 100;
                  const width = Math.max(7, ((max - min) / range) * 100);
                  return <div className={`week-row ${index === 0 ? "week-today" : ""}`} key={date}>
                    <div className="week-day"><strong>{formatDay(date, index)}</strong><span>{date.slice(5).replace("-", "/")}</span></div>
                    <div className="week-condition"><span className="week-icon">{info.icon}</span><span>{info.label}</span></div>
                    <div className="week-rain"><span>⌑</span> {weather.daily.precipitation_probability_max[index] ?? 0}%</div>
                    <span className="week-min">{Math.round(min)}°</span>
                    <div className="temp-range"><span style={{ marginLeft: `${left}%`, width: `${width}%` }} /></div>
                    <strong className="week-max">{Math.round(max)}°</strong>
                  </div>;
                })}
              </div>
            ) : <div className="forecast-loading">週間予報がありません</div>}
          </section>

          <footer className="page-footer"><span>ATMOS <span className="footer-dot">●</span> PERSONAL WEATHER DASHBOARD</span><span>Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></span></footer>
        </div>
      </section>
    </main>
  );
}
