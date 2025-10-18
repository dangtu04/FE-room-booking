import OutstandingLocation from "../components/OutstandingLocation";
import Search from "../components/Search";
import ContactForm from "./user/ContactForm";

const HomePage = () => {
  return (
    <>
      <Search />
      <OutstandingLocation/>
      <ContactForm/>
    </>
  );
};

export default HomePage;
