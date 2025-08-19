import React from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import Section from "../../HOC/section";
import { useMediaQuery } from "react-responsive";

const HomePage = () => {
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  });

  const isTablet = useMediaQuery({
    minWidth: 640,
    maxWidth: 1023,
  });

  const isMobile = useMediaQuery({
    maxWidth: 639,
  });

  console.log("isMobile: ", isMobile);
  console.log("isTablet: ", isTablet);
  console.log("isDesktop: ", isDesktop);

  return (
    <div>
      <CarouselMovie />

      <Section titleSection={"Danh sách phim"}>
        <ListMovie />
      </Section>

      <br />
      <br />
      <br />
      <br />
      <br />

      {/* 
          mobile Firts < 640px
          sm	40rem >= (640px)	
          lg	64rem  >= (1024px)	


          mobile : < 640px 
          tablet  : 640px - 1024px 
          desktop : >= 1024px
*/}

      {/* 800px */}
      <div className="h-20 bg-black  sm:bg-red-600 lg:bg-yellow-400"></div>

      <br />
      <br />
      <br />
      {isMobile && <div className="h-20 bg-black"></div>}
      {isTablet && <div className="bg-red-600 h-20 "></div>}
      {isDesktop && <div className="bg-yellow-400 h-20 "></div>}

      <br />
    </div>
  );
};

export default HomePage;
