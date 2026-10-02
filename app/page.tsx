"use client";

import { useEffect, useState } from "react";

const cities = [
  {
    name: "東京",
    latitude: 35.68,
    longitude: 139.77,
  },
  {
    name: "大阪",
    latitude: 34.69,
    longitude: 135.50,
  },
  {
    name: "札幌",
    latitude: 43.06,
    longitude: 141.35,
  },
  {
    name: "那覇",
    latitude: 26.21,
    longitude: 127.68,
  },
];

function getWeatherInfo(code: number) {
  if (code === 0) {
    return {
      label: "晴れ",
      icon: "/icons/sunny.png",
    };
  } else if (code === 1 || code === 2) {
    return {
      label: "晴れ時々くもり",
      icon: "/icons/partly-cloudy.png",
    };
  } else if (code === 3) {
    return {
      label: "くもり",
      icon: "/icons/cloudy.png",
    };
  } else if (code === 45 || code === 48) {
    return {
      label: "霧",
      icon: "/icons/fog.png",
    };
  } else if (code >= 51 && code <= 57) {
    return {
      label: "霧雨",
      icon: "/icons/rainy.png",
    };
  } else if (code >= 61 && code <= 67) {
    return {
      label: "雨",
      icon: "/icons/rainy.png",
    };
  } else if (code >= 71 && code <= 77) {
    return {
      label: "雪",
      icon: "/icons/snowy.png",
    };
  } else if (code >= 80 && code <= 82) {
    return {
      label: "にわか雨",
      icon: "/icons/rainy.png",
    };
  } else if (code === 85 || code === 86) {
    return {
      label: "にわか雪",
      icon: "/icons/snowy.png",
    };
  } else if (code >= 95 && code <= 99) {
    return {
      label: "雷雨",
      icon: "/icons/thunder.png",
    };
  }

  return {
    label: "不明",
    icon: "/icons/cloudy.png",
  };
}

export default function Home() {
  // 天気情報
  const [weather, setWeather] = useState<any>(null);

  // 現在地
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // 現在地の名前
  const [currentLocationName, setCurrentLocationName] =
    useState("現在地");

  // 選択中の場所
  const [selectedPlace, setSelectedPlace] =
    useState("current");

  // 状態
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------
  // 現在地を取得
  // --------------------------------
  useEffect(() => {
    if (!navigator.geolocation) {
      setError(
        "このブラウザでは位置情報を利用できません。"
      );
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("位置情報エラー:", error);

        setError(
          "現在地を取得できませんでした。ブラウザの位置情報を許可してください。"
        );

        setLoading(false);
      }
    );
  }, []);

  // --------------------------------
  // 現在地の名前を取得
  // --------------------------------
  useEffect(() => {
    if (latitude === null || longitude === null) {
      return;
    }

    async function getLocationName() {
      try {
        const url =
          `https://nominatim.openstreetmap.org/reverse` +
          `?lat=${latitude}` +
          `&lon=${longitude}` +
          `&format=json` +
          `&accept-language=ja`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(
            "現在地の名前を取得できませんでした"
          );
        }

        const data = await res.json();

        const address = data.address;

        const name =
          address.city ||
          address.town ||
          address.village ||
          address.municipality ||
          address.county ||
          "現在地";

        setCurrentLocationName(name);
      } catch (error) {
        console.error(error);

        setCurrentLocationName("現在地");
      }
    }

    getLocationName();
  }, [latitude, longitude]);

  // --------------------------------
  // 天気を取得
  // --------------------------------
  useEffect(() => {
    let lat: number | null = null;
    let lon: number | null = null;

    // 現在地を選択している場合
    if (selectedPlace === "current") {
      lat = latitude;
      lon = longitude;
    }

    // 都市を選択している場合
    else {
      const city = cities.find(
        (city) => city.name === selectedPlace
      );

      if (city) {
        lat = city.latitude;
        lon = city.longitude;
      }
    }

    // 座標がまだない場合
    if (lat === null || lon === null) {
      return;
    }

    async function getWeather() {
      try {
        setLoading(true);
        setError("");

        const url =
          `https://api.open-meteo.com/v1/forecast?` +
          `latitude=${lat}` +
          `&longitude=${lon}` +
          `&current=temperature_2m,weather_code,wind_speed_10m` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
          `&timezone=Asia%2FTokyo`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(
            "天気情報の取得に失敗しました"
          );
        }

        const data = await res.json();

        setWeather(data);
      } catch (error) {
        console.error(error);

        setError(
          "天気情報を取得できませんでした。"
        );
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, [selectedPlace, latitude, longitude]);

  // --------------------------------
  // 表示する場所の名前
  // --------------------------------
  let placeName = currentLocationName;

  if (selectedPlace !== "current") {
    placeName = selectedPlace;
  }

  // --------------------------------
  // Loading
  // --------------------------------
  if (loading) {
    return (
      <main>
        <h1>天気予報</h1>

        <p>
          現在地と天気情報を取得しています...
        </p>
      </main>
    );
  }

  // --------------------------------
  // Error
  // --------------------------------
  if (error) {
    return (
      <main>
        <h1>天気予報</h1>

        <p>{error}</p>

        <p>
          ブラウザの位置情報設定を確認して、
          ページを再読み込みしてください。
        </p>
      </main>
    );
  }

  // --------------------------------
  // Weather がない場合
  // --------------------------------
  if (!weather) {
    return (
      <main>
        <h1>天気予報</h1>

        <p>天気情報がありません。</p>
      </main>
    );
  }

  // --------------------------------
  // 現在の天気
  // --------------------------------
  const currentWeatherInfo =
    getWeatherInfo(
      weather.current.weather_code
    );

  return (
    <main>
      {/* タイトル */}
      <h1>天気予報</h1>

      {/* 場所 */}
      <h2>📍 {placeName}</h2>

      {/* 場所選択 */}
      <label htmlFor="place">
        場所を選択：
      </label>

      <select
        id="place"
        value={selectedPlace}
        onChange={(e) =>
          setSelectedPlace(e.target.value)
        }
      >
        <option value="current">
          現在地（{currentLocationName}）
        </option>

        {cities.map((city) => (
          <option
            key={city.name}
            value={city.name}
          >
            {city.name}
          </option>
        ))}
      </select>

      <hr />

      {/* 現在地の座標 */}
      {selectedPlace === "current" && (
        <div>
          <p>
            緯度：
            {latitude?.toFixed(4)}
          </p>

          <p>
            経度：
            {longitude?.toFixed(4)}
          </p>
        </div>
      )}

      {/* 現在の天気 */}
      <h2>現在の天気</h2>

      <p>
        気温：
        {weather.current.temperature_2m}℃
      </p>

      <p>
        天気：
        <img
          src={currentWeatherInfo.icon}
          alt={currentWeatherInfo.label}
          width={80}
        />
        {currentWeatherInfo.label}
      </p>

      <p>
        風速：
        {weather.current.wind_speed_10m} km/h
      </p>

      <hr />

      {/* 7日間予報 */}
      <h2>7日間の天気予報</h2>

      {weather.daily.time.map(
        (date: string, index: number) => {
          const dailyInfo =
            getWeatherInfo(
              weather.daily.weather_code[index]
            );

          return (
            <div key={date}>
              <h3>{date}</h3>

              <p>
                <img
                  src={dailyInfo.icon}
                  alt={dailyInfo.label}
                  width={80}
                />

                {dailyInfo.label}
              </p>

              <p>
                最高気温：
                {
                  weather.daily
                    .temperature_2m_max[index]
                }
                ℃
              </p>

              <p>
                最低気温：
                {
                  weather.daily
                    .temperature_2m_min[index]
                }
                ℃
              </p>

              <p>
                降水確率：
                {
                  weather.daily
                    .precipitation_probability_max[
                      index
                    ]
                }
                %
              </p>

              <hr />
            </div>
          );
        }
      )}
    </main>
  );
}
