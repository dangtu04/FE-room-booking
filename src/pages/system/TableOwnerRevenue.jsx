import { Table } from "antd";
import { useEffect, useState } from "react";
import { getOwnerRevenue } from "../../utils/api";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const TableOwnerRevenue = ({ dateRange, selectedPeriod, propertyId }) => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const language = useSelector((state) => state.app.language);
  const { t } = useTranslation("admin");
  useEffect(() => {
    const fetchOwnerRevenue = async () => {
      try {
        setLoading(true);

        let startDate = null;
        let endDate = null;

        if (dateRange && dateRange.length === 2) {
          startDate = dayjs(dateRange[0]).format("YYYY-MM-DD");
          endDate = dayjs(dateRange[1]).format("YYYY-MM-DD");
        }

        const params = {
          propertyId,
          type: selectedPeriod,
          startDate,
          endDate,
        };

        const res = await getOwnerRevenue(params);

        if (res && res.errCode === 0) {
          setRevenueData(res.data);
        }
      } catch (error) {
        console.error("Error fetching owner revenue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerRevenue();
  }, [dateRange, selectedPeriod, propertyId]);

  const columns = [
    {
      title: t("revenue.period"),
      dataIndex: "period",
      key: "period",
    },
    {
      title: t("revenue.revenue"),
      dataIndex: "revenue",
      key: "revenue",
      render: (value) => Number(value).toLocaleString("de-DE") + " VND",
    },
  ];

  return (
    <>
      <Table
        rowKey={(record, index) => index}
        dataSource={revenueData}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </>
  );
};

export default TableOwnerRevenue;
