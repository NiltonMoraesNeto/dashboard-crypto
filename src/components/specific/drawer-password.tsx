import { RectangleEllipsis } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface DrawerPasswordProps {
  isOpenPassword: boolean;
  setIsOpenPassword: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  error: string;
  handleSubmitNewPassword: (e: React.FormEvent) => Promise<void>;
  password: string;
  setPassword: (value: SetStateAction<string>) => void;
}

export function DrawerPassword({
  isOpenPassword,
  setIsOpenPassword,
  isOpen,
  error,
  handleSubmitNewPassword,
  password,
  setPassword,
}: DrawerPasswordProps) {
  const { t } = useTranslation();
  return (
    <Drawer open={isOpenPassword} onOpenChange={setIsOpenPassword}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpenPassword(true)}
          className={`w-full transition-all duration-300 ${
            isOpen ? "flex items-center justify-center" : "p-2"
          }`}
        >
          <RectangleEllipsis size={24} />
          <span
            className={`transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 w-0 -ml-2"
            }`}
          >
            {t("sidebar.changePassword")}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("sidebar.changePassword")}</DrawerTitle>
          <DrawerDescription>{t("sidebar.label")}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmitNewPassword} className="space-y-4">
            <Input
              type="password"
              placeholder={t("sidebar.placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="w-auto dark:text-purple-600 dark:hover:bg-purple-300 mr-5"
            >
              {t("sidebar.buttonSave")}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">{t("sidebar.buttonCancel")}</Button>
            </DrawerClose>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
