"use server";

export async function searchIMDB(_prevState: unknown, formData: FormData) {
  const query = formData.get("search") as string;
  const searchTerm = query.replace(" ", "_");
  const response = await fetch(
    `https://v2.sg.media-imdb.com/suggests/t/${searchTerm}.json`,
  );
  const responseText = await response.text();
  try {
    const json = (
      JSON.parse(
        responseText
          .replace(`imdb$${encodeURIComponent(searchTerm)}(`, "")
          .slice(0, -1),
      ) as {
        d: {
          id: string;
          l: string;
          i: [string, number, number];
          y: number;
          qid: string;
        }[];
      }
    ).d;
    return json
      .filter((result) => result.qid === "movie" || result.qid === "tvSeries")
      .map((result) => ({
        id: result.id.slice(2),
        title: `${result.l} (${result.y})`,
        image: result.i[0],
      }));
  } catch (e) {
    console.error("ERROR: Could not parse JSON", e);
    return [];
  }
}
