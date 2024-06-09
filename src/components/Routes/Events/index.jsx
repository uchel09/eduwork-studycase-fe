import styles from "../../../styles/style";
import EventCard from "./EventCard";

const Events = () => {
  return (
    <section className={`${styles.section} mb-12`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>
      <div className="w-full grid">
        <EventCard />
      </div>
    </section>
  );
};

export default Events;
