import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold ml-10">CryptoCaesar</h1>
        <Image 
            src="/images/fatec-votorantim.png"
            alt="Logo"
            width={250}
            height={250}
          />
      </div>
    </header>
  );
}