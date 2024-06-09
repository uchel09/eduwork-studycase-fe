import HeaderC from "../components/Layouts/HeaderC";
import Footer from "../components/Layouts/Footer";
import EventCard from "../components/Routes/Events/EventCard";

const EventsPage = () => {
  return (
    <div>
      <HeaderC activeHeading={4} />
      <EventCard active={true} />
      <EventCard active={true} />
      <Footer />
    </div>
  );
};

export default EventsPage;
