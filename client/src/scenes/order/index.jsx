import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const Order = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <div className="main__content">

    <div>
        <h4>Dipak Kumal</h4>
    </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          {...data}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default Order;
