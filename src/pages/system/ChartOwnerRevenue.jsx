import { useEffect, useState } from "react";
import { getOwnerRevenue } from "../../utils/api";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Column } from "@ant-design/plots";

const ChartOwnerRevenue = ({ dateRange, selectedPeriod, propertyId }) => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const language = useSelector((state) => state.app.language);

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
          // Đảm bảo dữ liệu revenue là số và được format đúng
          const processedData = res.data.map(item => ({
            ...item,
            revenue: Number(item.revenue) || 0, // Chuyển đổi về number
            period: String(item.period) // Đảm bảo period là string
          }));
          
          // Sắp xếp dữ liệu theo thời gian nếu cần
          processedData.sort((a, b) => {
            if (selectedPeriod === 'month') {
              return dayjs(a.period).valueOf() - dayjs(b.period).valueOf();
            }
            return a.period.localeCompare(b.period);
          });

          setRevenueData(processedData);
          
          // Debug: Log dữ liệu để kiểm tra
          console.log("Processed revenue data:", processedData);
        }
      } catch (error) {
        console.error("Error fetching owner revenue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerRevenue();
  }, [dateRange, selectedPeriod, propertyId]);

  const config = {
    data: revenueData,
    xField: "period",
    yField: "revenue",
    label: {
      position: "middle",
      style: { fill: "#FFFFFF", opacity: 0.6 },
      formatter: (text) => {
        // Format số để hiển thị trên label
        const value = Number(text);
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        }
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toLocaleString();
      }
    },
    xAxis: {
      label: { 
        autoHide: true, 
        autoRotate: false 
      },
    },
    yAxis: {
      // Đảm bảo trục Y bắt đầu từ 0
      min: 0,
      label: {
        formatter: (text) => {
          const value = Number(text);
          if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
          }
          if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
          }
          return value.toLocaleString();
        }
      }
    },
    meta: {
      period: { alias: "Thời gian" },
      revenue: { alias: "Doanh thu (VND)" },
    },
    // tooltip: {
    //   formatter: (datum) => {
    //     return {
    //       name: "Doanh thu",
    //       value: `${Number(datum.revenue).toLocaleString()} VND`
    //     };
    //   }
    // }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <>
      <h1>ChartOwnerRevenue</h1>
      <Column {...config} />
    </>
  );
};

export default ChartOwnerRevenue;