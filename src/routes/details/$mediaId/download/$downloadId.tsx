import { getDownloadDetails } from "@/data/download-details";
import { createFileRoute } from "@tanstack/react-router";
import { FC, useEffect, useState } from "react";
import { Captions, Copy, Download, FileDown, Magnet } from "lucide-react";

const titleToIconMap = {
  "Open Magnet link": <Magnet />,
  "Copy Magnet link": <Copy />,
  "Download Torrent": <FileDown />,
  "Direct Download": <Download />,
  Subtitles: <Captions />,
};

const DownloadButton = ({
  title,
  href,
  copyable,
}: {
  title: string;
  href: string;
  copyable?: true;
}) => {
  const [copied, setCopied] = useState(false);
  const className =
    "w-full rounded-3xl border border-ctp-green text-ctp-text p-2 px-10 text-center md:w-96 flex items-center justify-center flex-row gap-3 cursor-pointer";

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied, setCopied]);

  if (!copyable) {
    return (
      <a href={href} className={className}>
        {titleToIconMap[title as unknown as keyof typeof titleToIconMap]}
        {title}
      </a>
    );
  }

  return (
    <button
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(href);
          setCopied(true);
        } catch (error) {
          console.error(error);
          alert(
            error && typeof error === "object" && "message" in error
              ? error.message
              : error,
          );
        }
      }}
    >
      {titleToIconMap[title as unknown as keyof typeof titleToIconMap]}
      {copied ? "Copied!" : title}
    </button>
  );
};

export const Route = createFileRoute("/details/$mediaId/download/$downloadId")({
  component: RouteComponent,
  loader: ({ params }) => getDownloadDetails({ data: params }),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="mx-auto p-4 xl:w-1/2">
      <h1 className="text-center text-6xl text-ctp-peach">Download</h1>
      <div
        className={
          "mt-5 flex flex-col items-center rounded-lg border border-ctp-peach pb-5"
        }
      >
        <h2 className={"mt-5 text-xl"}>You&apos;re downloading:</h2>
        <h3 className="text-md px-3 text-center leading-6">{data.name}</h3>
        <h4 className="mt-5 text-lg font-normal leading-5">Download info</h4>
        <div className="my-4 mt-4 flex flex-col items-center px-5 text-text">
          <table
            className={
              "mx-5 w-full table-auto border-collapse break-all lg:max-w-4xl text-ctp-text"
            }
          >
            <thead className={"bg-ctp-surface0"}>
              <tr>
                <th className={"border border-ctp-surface1 p-2 text-start"}>
                  Attribute
                </th>
                <th className={"border border-ctp-surface1 p-2 text-start"}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.info ?? {}).map(([key, value]) => (
                <tr key={key}>
                  <td className={"border border-ctp-surface1 p-2"}>{key}</td>
                  <td className={"border border-ctp-surface1 p-2"}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={"mt-10 flex flex-col gap-y-5"}>
            {data.downloadLinks.map((link) => (
              <DownloadButton
                title={link.title}
                href={link.href}
                copyable={link.copyable}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
