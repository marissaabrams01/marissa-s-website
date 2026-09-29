import PortfolioHome from "@/components/Portfolio/PortfolioHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marissa Abrams | Full-Stack Developer in Training",
  description:
    "Meet Marissa Abrams, a full-stack developer in training with a background in Army logistics, HTML and CSS certification, and JavaScript certification.",
};

export default function Home() {
  return <PortfolioHome />;
}
