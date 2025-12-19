import { createServerFn } from "@tanstack/react-start";
import * as cheerio from "cheerio";
import z from "zod";

const downloadDetailsSchema = z.object({
  mediaId: z.string(),
  downloadId: z.string(),
});

export const getDownloadDetails = createServerFn()
  .inputValidator(downloadDetailsSchema)
  .handler(async ({ data: { mediaId, downloadId } }) => {
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
    const downloadLinks = Array.from(dropdownMenu.find("a"))
      .flatMap((link) => {
        const title = $(link).text();
        if (title.trim() === "Download Torrent") {
          return {
            title: title.trim(),
            href: `https://watchsomuch.to${$(link).attr("href")}`,
          };
        }

        if (title.trim() === "Download Magnet") {
          return [
            {
              title: "Open Magnet link",
              href: $(link).attr("href"),
            },
            {
              title: "Copy Magnet link",
              href: $(link).attr("href"),
              copyable: true,
            },
          ];
        }

        if (title.trim() === "Direct Download") {
          return undefined;
        }

        return {
          title: title.trim(),
          href: $(link).attr("href"),
        };
      })
      .filter(Boolean) as { title: string; href: string; copyable?: true }[];
    return {
      name,
      info,
      downloadLinks,
    };
  });
