"use client";

import { useState } from "react";
import "./../../config/i18n";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Home,
  User,
  LogOut,
  Sun,
  Moon,
  Settings,
  ChevronDown,
  Coins,
  Bitcoin,
  Landmark,
} from "lucide-react";
import { logout, updatePassword } from "@/services/login";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { DrawerPassword } from "@/components/specific/drawer-password";
import { AvatarChangeLanguage } from "@/components/specific/avatar-change-language";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  submenu?: MenuItem[];
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

  const menuItems: MenuItem[] = [
    { icon: Home, label: t("sidebar.optionDashboard"), href: "/dashboard" },
    { icon: User, label: t("sidebar.optionProfile"), href: "/perfil" },
    {
      icon: Coins,
      label: t("sidebar.optionCoins"),
      href: "/coins",
      submenu: [
        {
          icon: Bitcoin,
          label: t("sidebar.listCoins"),
          href: "/coins",
        },
        {
          icon: Landmark,
          label: t("sidebar.optionExchange"),
          href: "/exchange",
        },
      ],
    },
    {
      icon: Settings,
      label: t("sidebar.optionSettings"),
      href: "/configuracoes",
      submenu: [
        {
          icon: User,
          label: t("sidebar.optionAccount"),
          href: "/configuracoes/conta",
        },
        {
          icon: Settings,
          label: t("sidebar.optionPreferences"),
          href: "/configuracoes/preferencias",
        },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const cycleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getThemeIcon = () => {
    return theme === "light" ? <Moon size={24} /> : <Sun size={24} />;
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuOpen = openSubmenu === item.label;

    return (
      <li key={item.label}>
        <Link
          href={item.href}
          className={`flex items-center p-2 hover:bg-accent rounded transition-all duration-300 ${
            isOpen ? "justify-start" : "justify-center"
          } ${isActive ? "bg-accent" : ""}`}
          onClick={(e) => {
            if (hasSubmenu) {
              e.preventDefault();
              toggleSubmenu(item.label);
            }
          }}
        >
          <item.icon size={24} />
          {isOpen && (
            <>
              <span className="ml-2">{item.label}</span>
              {hasSubmenu && (
                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform duration-200 ${
                    isSubmenuOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </>
          )}
        </Link>
        {hasSubmenu && isOpen && isSubmenuOpen && (
          <ul className="ml-6 mt-2 space-y-2">
            {item.submenu!.map((subItem) => (
              <li key={subItem.label}>
                <Link
                  href={subItem.href}
                  className={`flex items-center p-2 hover:bg-accent rounded ${
                    pathname === subItem.href ? "bg-accent" : ""
                  }`}
                >
                  <subItem.icon size={20} />
                  <span className="ml-2">{subItem.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const success = await updatePassword(user.id, password);

    if (success && success.status === 200) {
      toast.success(t("sidebar.apiTitle"), {
        description: t("sidebar.apiMsgSuccess"),
      });
      setIsOpenPassword(false);
    } else {
      toast.error(t("sidebar.apiTitle"), {
        description: t("sidebar.apiMsgError"),
      });
    }
  };

  return (
    <aside
      className={`
      fixed top-0 left-0 z-40 h-screen
      transition-all duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-16"}
      bg-background border-r
    `}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4">
          <span
            className={`text-xl font-semibold transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {t("sidebar.title")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-accent"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-2">{menuItems.map(renderMenuItem)}</ul>
        </nav>
        <div className="p-4 space-y-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className={`w-full transition-all duration-300 ${
              isOpen ? "flex items-center justify-center" : "p-2"
            }`}
          >
            {getThemeIcon()}
            <span
              className={`ml-2 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 w-0 -ml-4"
              }`}
            >
              {theme === "light"
                ? t("sidebar.darkMode")
                : t("sidebar.lightMode")}
            </span>
          </Button>

          <AvatarChangeLanguage
            changeLanguage={changeLanguage}
            isOpen={isOpen}
          />

          <DrawerPassword
            isOpenPassword={isOpenPassword}
            setIsOpenPassword={setIsOpenPassword}
            isOpen={isOpen}
            error={error}
            handleSubmitNewPassword={handleSubmitNewPassword}
            password={password}
            setPassword={setPassword}
          />
          <Button
            variant="outline"
            onClick={handleLogout}
            className={`w-full transition-all duration-300 ${
              isOpen ? "flex items-center justify-center" : "p-2"
            }`}
          >
            <LogOut size={24} />
            <span
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 w-0 -ml-2"
              }`}
            >
              {t("sidebar.buttonExit")}
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
