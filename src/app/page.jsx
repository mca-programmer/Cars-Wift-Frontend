import Banner from "@/components/home/Banner";
import ClientLogo from "@/components/home/ClientLogo";
import Faq from "@/components/home/Faq";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonial from "@/components/home/Testimonial";
import TopRated from "@/components/home/TopRated";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <ClientLogo direction={"left"} />
      <TopRated />
      <HowItWorks />
      <Testimonial />
      <Faq/>
    </div>
  );
}
