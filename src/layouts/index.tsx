import { Link, Outlet } from "umi";
import styles from "./index.less";
import Header from "./header";
import Footer from "./footer";
import { ThemeContext } from './context';

export default function Layout(props) {
  return (
    <ThemeContext.Provider
      value={{
        appData: props.appData,
        components: props.components,
        themeConfig: props.themeConfig || { themeSwitch: true },
        location: props.location,
        history: props.history,
      }}
    >
    <div className="flex flex-col dark:bg-gray-900 min-h-screen transition-all">
      <Header />
      <div className="w-full flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
    </ThemeContext.Provider>
  );
}
