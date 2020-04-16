import Dashboard from "../components/Dashboard";
import { withApollo } from "../apollo/client";

export default withApollo(() => {
  return <Dashboard />;
});
