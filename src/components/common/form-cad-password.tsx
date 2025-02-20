import { Dispatch, SetStateAction } from "react";
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
import { useTranslation } from "react-i18next";

interface FormCadPasswordProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  newError: string;
  handleSubmitNewAccount: (e: React.FormEvent) => Promise<void>;
  newEmail: string;
  setNewEmail: (value: SetStateAction<string>) => void;
  newPassword: string;
  setNewPassword: (value: SetStateAction<string>) => void;
}

export function FormCadPassword({
  isOpen,
  setIsOpen,
  newError,
  handleSubmitNewAccount,
  newEmail,
  setNewEmail,
  newPassword,
  setNewPassword,
}: FormCadPasswordProps) {
  const { t } = useTranslation();
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-auto ml-5 dark:text-purple-600 dark:hover:bg-purple-300"
          onClick={() => setIsOpen(true)}
        >
          {t("login.buttonCreateAccount")}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("createLogin.title")}</DrawerTitle>
          <DrawerDescription>{t("createLogin.description")}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          {newError && <p className="text-red-500 text-center">{newError}</p>}
          <form onSubmit={handleSubmitNewAccount} className="space-y-4">
            <Input
              type="email"
              placeholder={t("createLogin.placeholderEmail")}
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder={t("createLogin.placeholderPassword")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="w-auto dark:text-purple-600 dark:hover:bg-purple-300 mr-5"
            >
              {t("createLogin.buttonCreateAccount")}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">{t("createLogin.buttonCancel")}</Button>
            </DrawerClose>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
