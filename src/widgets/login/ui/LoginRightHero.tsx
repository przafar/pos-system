import Image from "next/image";
import logo from "@shared/assets/image/logo.png";
import posImage from "@shared/assets/image/pos-image.png";

export function LoginRightHero() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <Image
          src={logo}
          alt="Virtual kassa"
          width={42}
          height={42}
          className="h-8 w-8 md:h-10 md:w-10"
          priority
        />
        <span className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-[#4198df] to-[#25567e] bg-clip-text text-transparent">
          Virtual kassa
        </span>
      </div>

      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center max-w-md md:max-w-xl text-black">
        Savdo jarayonlarini avtomatlashtirish uchun kassa apparati
      </h2>

      <div className="flex justify-center mt-6">
        <Image
          src={posImage}
          alt="Virtual kassa"
          className="w-full h-auto max-w-[260px] md:max-w-[300px] lg:max-w-[320px]"
          sizes="(min-width: 1280px) 20rem, (min-width: 1024px) 18rem, (min-width: 768px) 16rem, 80vw"
          priority
        />
      </div>
    </div>
  );
}
