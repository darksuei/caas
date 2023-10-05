import Summary from "../components/summary/Summary";
import Chart from "../components/chart/Chart";

function Dashboard() {
  return (
    <section>
      <h2 className="title">{"Dashboard"}</h2>
      <Summary />
      <Chart />
    </section>
  );
}

export default Dashboard;
