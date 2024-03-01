"use server";
import * as cheerio from "cheerio";

export const getDownloadDetails = async (
  mediaId: string,
  downloadId: string,
) => {
  "use server";
  const response = await fetch(
    `https://watchsomuch.to/Movies/ajTorrentDetails.aspx?movie=${mediaId}&key=${downloadId}`,
  );
  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  const name = $(".title").first().text();
  const infoRows = $(".InfoRow");
  const info: Record<string, string> = {};
  for (let i = 0; i < 8; i++) {
    const row = infoRows.eq(i);
    const key = row.children().first().text().slice(0, -1).trim();
    info[key] = row.children().last().text().trim();
  }
  const dropdownMenu = $("#DownloadMenu");
  const downloadLinks = Array.from(dropdownMenu.find("a")).map((link) => {
    const title = $(link).text();
    if (title.trim() === "Download Torrent") {
      return {
        title,
        href: `https://watchsomuch.to${$(link).attr("href")}`,
      };
    }

    return {
      title,
      href: $(link).attr("href"),
    };
  });
  return {
    name,
    info,
    downloadLinks,
  };
};
