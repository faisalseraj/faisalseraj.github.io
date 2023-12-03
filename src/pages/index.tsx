import { Box, Heading } from '@chakra-ui/react';

import IntroductionSection from '@/components/Portfolio/Introduction';
import NavBar from '@/components/Portfolio/Navigation';
import { useParallax } from 'react-scroll-parallax';

const App = () => {
  // const scaleCParallax: any = useParallax({
  //   scaleX: [0, 14, 'easeInQuad']
  // });
  const parallaxRotateY: any = useParallax({
    rotateY: [0, 360]
  });
  const parallaxRotateY2: any = useParallax({
    rotateY: [0, 360]
  });
  const parallaxRotateY3: any = useParallax({
    rotateY: [0, 360]
  });
  const parallaxEasing: any = useParallax({
    easing: 'easeOutQuad',
    translateX: [-340, 100]
  });
  // const parallaxEasingLeft: any = useParallax({
  //   easing: [1, -0.75, 0.5, 1.34],
  //   translateX: [0, -260],
  //   translateY: [1100] as any
  // });
  return (
    <Box overflowX='hidden'>
      <NavBar />
      <section className="bg-container">
        <img
          ref={parallaxRotateY.ref}
          src="/images/image2.jpg"
        />
        <div className="absolute-text">
          <Heading color={'#1c79c0'} as="h1" ref={parallaxEasing.ref}>
            FAISAL'S PORTFOLIO
          </Heading>
        </div>
      </section>
      <br />
      <section >
        {/* <div className="card">
          <img src="/images/image1.jpg" />
        </div>
        <div className="card">
          <img src="/images/image3.jpg" />
        </div> */}
        <IntroductionSection />
      </section>

      <br />
      <br />
      <section className="card-container">
        <div className="card" ref={parallaxRotateY2.ref}>
          <img src="/images/image4.jpg" />
        </div>
        <div ref={parallaxRotateY3.ref} className="card">
          <img src="/images/image5.jpg" />
        </div>
      </section>
      <br />

      <section className="subscribe">
        <h1>Subscribe to our news letter</h1>
        <br />
        <input type="email" placeholder="youremail@gmail.com" />
        <button>Subscribe</button>
      </section>
    </Box>
  );
};
export default App;
