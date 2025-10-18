import { BarChartOutlined, TableOutlined } from "@ant-design/icons";
import { Tabs, Card, Col, Row, Select, DatePicker, Button } from "antd";
import TableOwnerRevenue from "./TableOwnerRevenue";
import ChartOwnerRevenue from "./ChartOwnerRevenue";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("admin");

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
          <TableOutlined /> {t("revenue.table")}
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
          <BarChartOutlined /> {t("revenue.chart")}
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
      <h1>{t("revenue.revenue")}</h1>
      <div>
        <Card>
          <Row style={{ marginBottom: "8px" }}>
            {" "}
            <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
              {t("revenue.select_facility")}:
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder={t("revenue.select_facility")}
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
                {t("revenue.filter_by_cycle")}:
              </div>
              <Select
                placeholder={t("revenue.select_cycle")}
                value={selectedPeriod}
                onChange={setSelectedPeriod}
              >
                <Option value="day">{t("revenue.day")}</Option>
                <Option value="week">{t("revenue.week")}</Option>
                <Option value="month">{t("revenue.month")}</Option>
                <Option value="year">{t("revenue.year")}</Option>
              </Select>
            </Col>

            <Col span={8}>
              <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
                {t("revenue.filter_by_date")}:
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
                {t("revenue.clear_filter")}
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
