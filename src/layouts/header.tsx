import { Link } from "umi";
import { useThemeContext } from "./context";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function Header(props) {
  const { themeConfig } = useThemeContext()!;
  console.log('themeConfig', themeConfig)
  return (
    <div className="z-30 sticky top-0 dark:before:bg-gray-800 before:bg-white before:bg-opacity-[.85] before:backdrop-blur-md before:absolute before:block dark:before:bg-opacity-[.85] before:w-full before:h-full before:z-[-1]">
      <div className="w-full flex flex-row items-center justify-between border-b-gray-100 border-b-2 pt-4 pb-4 px-4 lg:px-12 dark:border-b-gray-800">
        <div className="flex flex-row items-center">
          <Link to="/">
            <div className="flex flex-row items-center">Home</div>
          </Link>
        </div>
        <div className="flex flex-row items-center">
          {themeConfig.themeSwitch && (
            <div className="ml-4 hidden lg:block">
              <ThemeSwitch />
            </div>
          )}
          <Link to="/">
            <div className="flex flex-row items-center">Home</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
