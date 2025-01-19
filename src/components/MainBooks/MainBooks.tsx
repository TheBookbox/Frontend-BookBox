import Link from "next/link";

import Image from "next/image";


interface MainBooksProps {
  title: string;
  data: any[];
  linkMore: string
}

export function MainBooks(props: MainBooksProps) {
  return (
    <div className="p-3 flex flex-col w-full mx-auto gap-10">
      <h2 className="text-azul-clarinho font-semibold md:text-2xl md:text-center">
        {props.title}
      </h2>

      <div className="flex flex-wrap justify-center mt-5 gap-4 ">
        {props.data?.map((book) => (
          <Link
            href={book.link}
            className="w-[145px] md:w-[240px]"
          >
            <Image
              className="transition-all duration-150 hover:scale-105 cursor-pointer "
              src={book.cover}
              width={143}
              height={204}
              alt={book.name}
              layout="responsive"
            />
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center text-azul-primario">
        <Link href={props.linkMore}>
          <div className="cursor-pointer">Ver mais</div>
        </Link>
      </div>
    </div>
  );
}
