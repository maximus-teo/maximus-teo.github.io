import { useState } from 'react'
import './App.css'
import Iridescence from './components/react-bits/Iridescence';
import BlurText from "./components/react-bits/BlurText";
import "@fontsource/inter";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

function App() {
  return (
    <div>
      <div className="absolute inset-0 z-0">
        <Iridescence 
          color={[0.4, 0.1, 0.7]} 
          mouseReact={false} 
          amplitude={0.1} 
          speed={1.0} 
        />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full flex-col">
        <BlurText
          text="Welcome to my website."
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-white text-5xl font-bold mb-8 font-sans"
        />
        <BlurText
          text="More to come soon! - Maximus Teo"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-white text-xl mb-8 font-sans"
        />
      </div>
    </div>
  );
}

export default App;