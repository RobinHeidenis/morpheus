import Image from "next/image";

export const MediaLink = ({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) => {
  return (
    <a
      href={link}
      className="my-2 flex w-full gap-x-5 rounded-lg border border-peach p-2 text-peach md:my-5 md:w-60 md:flex-col md:items-center md:border-0 md:text-mauve"
    >
      <Image
        src={image ?? ""}
        alt={title}
        width={175}
        height={250}
        unoptimized
        className={"w-14 md:w-auto"}
      />
      <span className={"md:text-md mt-3 text-start text-sm"}>{title}</span>
    </a>
  );
};
