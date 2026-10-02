"use client";

import { useEffect, useState } from "react";

const cities = [
  { name: "東京", latitude: 35.68, longitude: 139.77 },
  { name: "大阪", latitude: 34.69, longitude: 135.5 },
  { name: "札幌", latitude: 43.06, longitude: 141.35 },
  { name: "那覇", latitude: 26.21, longitude: 127.68 },
];

function getWeatherInfo(code: number) {
  if (code === 0) {
    return { label: "晴れ", icon: "/icons/sunny.png" };
  } else if (code === 1 || code === 2) {
    return { label: "晴れ時々くもり", icon: "/icons/partly-cloudy.png" };
  } else if (code === 3) {
    return { label: "くもり", icon: "/icons/cloudy.png" };
  } else if (code === 45 || code === 48) {
    return { label: "霧", icon: "/icons/fog.png" };
  } else if (code >= 51 && code <= 57) {
    return { label: "霧雨", icon: "/icons/rainy.png" };
  } else if (code >= 61 && code <= 67) {
    return { label: "雨", icon: "/icons/rainy.png" };
  } else if (code >= 71 && code <= 77) {
    return { label: "雪", icon: "/icons/snowy.png" };
  } else if (code >= 80 && code <= 82) {
    return { label: "にわか雨", icon: "/icons/rainy.png" };
  } else if (code === 85 || code === 86) {
    return { label: "にわか雪", icon: "/icons/snowy.png" };
  } else if (code >= 95 && code <= 99) {
    return { label: "雷雨", icon: "/icons/thunder.png" };
  }

  return { label: "不明", icon: "/icons/cloudy.png" };
}

export default function Home() {
  const [city, setCity] = useState(cities[0]);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setError("");
      setWeather(null);

      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}` +
          `&current=temperature_2m,weather_code,wind_speed_10m` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
          `&timezone=Asia%2FTokyo`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("天気情報の取得に失敗しました");
        }

        const data = await res.json();

        setWeather(data);
      } catch (error) {
        setError("天気情報を取得できませんでした。");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>天気情報がありません。</p>;
  }

  const weatherInfo = getWeatherInfo(weather.current.weather_code);

  return (
    <main>
      <h1>天気予報（{city.name}）</h1>

      <select
        value={city.name}
        onChange={(e) => {
          const selectedCity = cities.find(
            (c) => c.name === e.target.value
          );

          if (selectedCity) {
            setCity(selectedCity);
          }
        }}
      >
        {cities.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <h2>現在の天気</h2>

      <p>
        気温：{Math.round(weather.current.temperature_2m)}℃
      </p>

      <p>
          天気：
          <img src={weatherInfo.icon} alt={weatherInfo.label} width={80} />
          {weatherInfo.label}
      </p>

      <p>
        風速：{weather.current.wind_speed_10m} km/h
      </p>

      <h2>7日間の予報</h2>

      <div>
        {weather.daily.time.map((date: string, i: number) => {
          const dailyInfo = getWeatherInfo(weather.daily.weather_code[i]);

          const dateObject = new Date(date);
          const month = dateObject.getMonth() + 1;
          const day = dateObject.getDate();

          const week = ["日", "月", "火", "水", "木", "金", "土"];
          const dayOfWeek = week[dateObject.getDay()];

          return (
            <div key={date}>
              <p>
                {month}/{day}（{dayOfWeek}）
              </p>

              <p>
                <img src={dailyInfo.icon} alt={dailyInfo.label} width={80} />
                {dailyInfo.label}
              </p>

              <p>
                最高：{Math.round(weather.daily.temperature_2m_max[i])}℃
              </p>

              <p>
                最低：{Math.round(weather.daily.temperature_2m_min[i])}℃
              </p>

              <p>
                降水確率：
                {weather.daily.precipitation_probability_max[i]}%
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}