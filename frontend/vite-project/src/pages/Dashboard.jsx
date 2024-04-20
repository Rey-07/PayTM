import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

const response = await axios.get(
  "http://localhost:3000/api/v1/account/balance",

  {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }
);

export const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={parseFloat(response.data.balance).toFixed(2)} />
        <Users />
      </div>
    </div>
  );
};
