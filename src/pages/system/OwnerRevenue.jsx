import { BarChartOutlined, TableOutlined } from "@ant-design/icons";
import { Tabs, Card, Col, Row, Select, DatePicker, Button } from "antd";
import TableOwnerRevenue from "./TableOwnerRevenue";
import ChartOwnerRevenue from "./ChartOwnerRevenue";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const OwnerRevenue = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const propertyId = useSelector((state) => state.user.propertyId);
  const { t } = useTranslation("admin");
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
          propertyId={propertyId}
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
          propertyId={propertyId}
        />
      ),
    },
  ];

  return (
    <>
      <h1>{t("revenue.revenue")}</h1>
      <div>
        <Card>
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

export default OwnerRevenue;
