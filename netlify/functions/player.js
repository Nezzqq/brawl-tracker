exports.handler = async (event) => {
  const tag = (event.queryStringParameters?.tag || "")
    .replace(/^#/, "")
    .toUpperCase();

  if (!tag || !/^[0289PYLQGRJCUV]+$/.test(tag)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Некорректный тег игрока" })
    };
  }

  try {
    const response = await fetch(
      `https://bsproxy.royaleapi.dev/v1/players/%23${tag}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.BRAWL_API_KEY}`
        }
      }
    );

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Ошибка получения данных игрока" })
    };
  }
};