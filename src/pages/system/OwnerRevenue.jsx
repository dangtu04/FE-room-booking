import { BarChartOutlined, TableOutlined } from "@ant-design/icons";
import { Tabs, Card, Col, Row, Select, DatePicker, Button } from "antd";
import TableOwnerRevenue from "./TableOwnerRevenue";
import ChartOwnerRevenue from "./ChartOwnerRevenue";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OwnerRevenue = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const propertyId = useSelector((state) => state.user.propertyId);

  const onChange = (key) => {
    console.log(key);
  };

  // useEffect(() => {
  //   console.log("check date: ", dateRange);
  //   console.log("check period: ", selectedPeriod);
  // }, [dateRange, selectedPeriod]);

  const items = [
    {
      key: "table",
      label: (
        <span>
          <TableOutlined /> Bảng
        </span>
      ),
      children: (
        <TableOwnerRevenue
          dateRange={dateRange}
          selectedPeriod={selectedPeriod}
          propertyId={propertyId}
        />
      ),
    },
    {
      key: "chart",
      label: (
        <span>
          <BarChartOutlined /> Biểu đồ
        </span>
      ),
      children: (
        <ChartOwnerRevenue
          dateRange={dateRange}
          selectedPeriod={selectedPeriod}
          propertyId={propertyId}
        />
      ),
    },
  ];

  return (
    <>
      <h1>Doanh thu</h1>
      <div>
        <Card>
          <Row gutter={16} align="middle">
            <Col span={4}>
              <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
                Lọc theo chu kỳ:
              </div>
              <Select
                placeholder="Chọn chu kỳ"
                value={selectedPeriod}
                onChange={setSelectedPeriod}
              >
                <Option value="day">Theo ngày</Option>
                <Option value="week">Theo tuần</Option>
                <Option value="month">Theo tháng</Option>
                <Option value="year">Theo năm</Option>
              </Select>
            </Col>

            <Col span={8}>
              <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
                Lọc theo ngày:
              </div>
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Col>

            <Col span={8}>
              <div style={{ marginBottom: "8px", color: "transparent" }}>.</div>
              <Button
                onClick={() => {
                  setSelectedPeriod(null);
                  setDateRange(null);
                }}
              >
                Xóa bộ lọc
              </Button>
            </Col>
          </Row>
        </Card>
        <Tabs defaultActiveKey="table" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default OwnerRevenue;
