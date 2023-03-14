import React, {useState, useEffect} from 'react'
import cx from 'classnames';
import { useThemeContext } from '@/layouts/context';

export default function ThemeSwitch() {
  const [toggle, setToggle] = useState<Boolean>();
  const { themeConfig } = useThemeContext()!;

  console.log('[ThemeSwitch][themeConfig]',themeConfig)

  useEffect(() => {
    // If themeConfig disabled the themeSwitch, just set to light theme
    if (!themeConfig.themeSwitch) {
      document.body.classList.remove('dark');
      return;
    }
    // 初始化，获取过去曾经设定过的主题，或是系统当前的主题
    if (toggle === undefined) {
      if (localStorage.getItem('theme') === 'dark') {
        setToggle(false);
        return;
      }
      if (localStorage.getItem('theme') === 'light') {
        setToggle(true);
        return;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setToggle(false);
        return;
      }
      setToggle(true);
    }

    if (toggle) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      window.document.documentElement.style.setProperty(
        '--color-scheme',
        'light',
      );
      // @ts-ignore
      document.querySelectorAll('.link-icon')?.forEach((el: HTMLElement) => {
        el.style.setProperty('filter', 'invert(0)');
      });
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      window.document.documentElement.style.setProperty(
        '--color-scheme',
        'dark',
      );
      // @ts-ignore
      document.querySelectorAll('.link-icon')?.forEach((el: HTMLElement) => {
        el.style.setProperty('filter', 'invert(1)');
      });
    }
  },[toggle]);

  return (
    <div
      className={cx(
        'md:w-12 md:h-6 w-12 h-4 flex items-center rounded-full ',
        'py-1 px-1.5  cursor-pointer',
        toggle ? 'bg-gray-100' : 'bg-gray-700',
      )}
      onClick={() => setToggle(!toggle)}
    >
      <div
        className={cx(
          'md:w-4 md:h-4 h-3 w-3 rounded-full shadow-md ',
          'transition transform',
          toggle && 'translate-x-5',
        )}
      >
        <span className="w-full h-full">{toggle ? 'sun' : 'moon'}</span>
        
      </div>
    </div>
  );
}
