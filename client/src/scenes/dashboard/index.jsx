import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Chart, ArcElement } from "chart.js";
import { Col, Container, Row } from "react-bootstrap";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import DashboardCard from "./DashboardCard";
import axios from 'axios'
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

  const [wada,setWada] = useState();
  const [users,setUsers] = useState();
  const [category,setCategory] = useState();
  const [branch,setBranch] = useState();
  const [product,setProduct] = useState();


  useEffect(() => {
    return () => {
      Chart.controllers = {}; // Clear registered controllers
      Chart.instances = {}; // Clear existing chart instances
    };
  }, []);

  
  const getWadaCount = async() =>{
      const res = await axios.get("http://localhost:8000/count/wada");
      const count = Object.values(res.data.result[0])[0];
      if(res){
        setWada(count)
      }else{
        console.log(res);
      }
  }
  const getCategoryCount = async() =>{
      const res = await axios.get("http://localhost:8000/count/category");
      const count = Object.values(res.data.result[0])[0];
      if(res){
        setCategory(count)
      }else{
        console.log(res);
      }
  }
  const getBranchCount = async() =>{
      const res = await axios.get("http://localhost:8000/count/branch");
      const count = Object.values(res.data.result[0])[0];
      if(res){
        setBranch(count)
      }else{
        console.log(res);
      }
  }
  const getUsersCount = async() =>{
      const res = await axios.get("http://localhost:8000/count/users");
      const count = Object.values(res.data.result[0])[0];
      if(res){
        setUsers(count)
      }else{
        console.log(res);
      }
  }
  const getProductCount = async() =>{
      const res = await axios.get("http://localhost:8000/count/product");
      const count = Object.values(res.data.result[0])[0];
      if(res){
        setProduct(count)
      }else{
        console.log(res);
      }
  }

  useEffect(() =>{
    getWadaCount();
    getProductCount();
    getUsersCount();
    getBranchCount();
    getCategoryCount();
  },[])

  return (
    <div className="main__content">
        <Container fluid className="mb-5 py-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center cursor-pointer ">
            <h5>ADMIN</h5>
            <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" className="image_avatar" />
          </div>
      </Container>
      <Container>
        <div style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",gap:'135px'}} className="">
          <DashboardCard
            heading="वडा"
            num={wada}
            link="/wada"
            icon={<GroupsIcon />}
            color="text-danger"
          />
          <DashboardCard
            heading="प्रकार"
            num={category}
            link="/category"
            icon={<ShoppingBasketIcon />}
            color="text-dark"
          />
          <DashboardCard
            heading="साखा"
            num={branch}
            link="/branch"
            icon={<MoneyOffIcon />}
            color="text-primary"
          />
           <DashboardCard
            heading="प्रयोगकर्ता"
            num={users}
            link="/users"
            icon={<GroupsIcon />}
            color="text-danger"
          />
        </div>
        <Row style={{cursor:"pointer"}} className="gap-4 mt-5">
          <DashboardCard
            heading="सर समान "
            num={product}
            link="/product"
            icon={<ShoppingBasketIcon />}
            color="text-dark"
          />
        </Row>
      </Container>

      {/* <div className="chart">
        <div className="line_chart">
          <Line options={options} data={chartData} />
        </div>
        <div className="line_chart">
          <Pie data={chartData} />
        </div>
      </div> */}

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
