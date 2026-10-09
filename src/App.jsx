import { useState } from "react";
import { useTheme } from "./hooks";
import { CommandPalette, Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { DoubleRibbon } from "./components/DoubleRibbon";
import { StatsBar } from "./components/StatsBar";
import { Bridge } from "./components/Bridge";
import { Timeline } from "./components/Timeline";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Certificates } from "./components/Certificates";
import { Leadership } from "./components/Leadership";
import { GithubWidget } from "./components/GithubWidget";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollProgress, VitalDivider } from "./components/Misc";

export default function App() {
  const [theme, setTheme] = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  return (
    <div>
      <ScrollProgress />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <Nav theme={theme} setTheme={setTheme} setPaletteOpen={setPaletteOpen} />
      <main className="pb-2">
        <Hero />
        <DoubleRibbon />
        <StatsBar />
        <VitalDivider />
        <Bridge />
        <Timeline />
        <Skills />
        <VitalDivider />
        <Projects />
        <Certificates />
        <Leadership />
        <GithubWidget />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
