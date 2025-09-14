import { BarChartOutlined, TableOutlined } from "@ant-design/icons";
import { Tabs, Card, Col, Row, Select, DatePicker, Button } from "antd";
import TableOwnerRevenue from "./TableOwnerRevenue";
import ChartOwnerRevenue from "./ChartOwnerRevenue";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";

const { Option } = Select;

const AdminRevenue = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.property.properties);
  const userPropertyId = useSelector((state) => state.user.propertyId);

  const [selectedPropertyId, setSelectedPropertyId] = useState(
    userPropertyId || null
  );
  const [dateRange, setDateRange] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    if (userPropertyId) {
      setSelectedPropertyId(userPropertyId);
    }
  }, [userPropertyId]);

  const buildDataListProperties = (data) => {
    if (data && data.length > 0) {
      return data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    }
    return [];
  };

  const options = buildDataListProperties(properties);

  const onChange = (key) => {
    console.log(key);
  };

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
          propertyId={selectedPropertyId}
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
          propertyId={selectedPropertyId}
        />
      ),
    },
  ];

  return (
    <>
      <h1>Doanh thu</h1>
      <div>
        <Card>
          <Row style={{ marginBottom: "8px" }}>
            {" "}
            <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
              Chọn cơ sở:
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Chọn cơ sở"
              showSearch
              optionFilterProp="label"
              value={selectedPropertyId}
              options={options}
              onChange={setSelectedPropertyId}
            />
          </Row>
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
                  setSelectedPropertyId(userPropertyId || null);
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

export default AdminRevenue;
