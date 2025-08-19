import { useMediaQuery } from "react-responsive";
import NavBarDesktopTablet from "./NavBarDesktopTablet";
import NavBarMobile from "./NavBarMobile";
import useResponsive from "../../hook/useResponsive";

const HeaderPage = () => {
  const { isDesktop, isTablet, isMobile } = useResponsive();

  return (
    <div className="px-14 py-6 bg-black flex justify-between">
      <div className="text-white text-2xl font-bold">BC85 MOVIE</div>

      {isDesktop && <NavBarDesktopTablet />}
      {isTablet && <NavBarDesktopTablet />}
      {isMobile && <NavBarMobile />}
    </div>
  );
};

export default HeaderPage;
