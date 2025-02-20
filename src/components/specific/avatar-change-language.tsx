import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarChangeLanguageProps {
  changeLanguage: (lng: string) => void;
  isOpen: boolean;
}

export function AvatarChangeLanguage({
  changeLanguage,
  isOpen,
}: AvatarChangeLanguageProps) {
  return (
    <div
      className={`${isOpen ? "flex" : "inline"} justify-between cursor-pointer`}
    >
      <Avatar>
        <AvatarImage
          src="/usa.png"
          onClick={() => changeLanguage("en")}
          className={`${isOpen ? "" : "p-2"}`}
        />
        <AvatarFallback>usa flag</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="/bra.png"
          onClick={() => changeLanguage("br")}
          className={`${isOpen ? "" : "p-2"}`}
        />
        <AvatarFallback>bra flag</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="/esp.png"
          onClick={() => changeLanguage("es")}
          className={`${isOpen ? "" : "p-2"}`}
        />
        <AvatarFallback>spa flag</AvatarFallback>
      </Avatar>
    </div>
  );
}
