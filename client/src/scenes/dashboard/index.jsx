import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Chart, ArcElement } from "chart.js";
import { Col, Container, Row } from "react-bootstrap";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import DashboardCard from "./DashboardCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";
import faker from "faker";

import "./styled.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const chartData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const customData = [
  { id: 1, name: "John Doe", phone: "980383209320", age: 25 },
  // ... more data
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "phone", headerName: "Phone", width: 200 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
];

const Dashboard = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 5;
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // // const currentData = customData.slice(startIndex, endIndex);

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };



  useEffect(() => {
    return () => {
      Chart.controllers = {}; // Clear registered controllers
      Chart.instances = {}; // Clear existing chart instances
    };
  }, []);


  return (
    <div className="main__content">
      <Container>
        <Row style={{cursor:"pointer"}} className="gap-4">
          <DashboardCard
            heading="वडा"
            num={203}
            link="/customer"
            icon={<GroupsIcon />}
            color="text-danger"
          />
          <DashboardCard
            heading="प्रकार"
            num={140}
            link="/customer"
            icon={<ShoppingBasketIcon />}
            color="text-dark"
          />
          <DashboardCard
            heading="साखा"
            num={"$50343"}
            link="/customer"
            icon={<MoneyOffIcon />}
            color="text-primary"
          />
        </Row>
        <Row style={{cursor:"pointer"}} className="gap-4 mt-5">
          <DashboardCard
            heading="प्रयोगकर्ता"
            num={203}
            link="/customer"
            icon={<GroupsIcon />}
            color="text-danger"
          />
          <DashboardCard
            heading="सर समान "
            num={140}
            link="/customer"
            icon={<ShoppingBasketIcon />}
            color="text-dark"
          />
        </Row>
      </Container>

      <div className="chart">
        <div className="line_chart">
          <Line options={options} data={chartData} />
        </div>
        <div className="line_chart">
          <Pie data={chartData} />
        </div>
      </div>

      {/* <section className="user_data">
        <div style={{ height: 400, width: '50%' }}>
          <DataGrid
            columns={columns}
            rows={currentData}
            components={{
              Toolbar: GridToolbar,
            }}
            page={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section> */}
    </div>
  );
};

export default Dashboard;
