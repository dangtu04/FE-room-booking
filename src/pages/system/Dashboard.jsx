import { useTranslation } from "react-i18next";

const Dashboard = () => {
const { t } = useTranslation("common");

  return (
    <>
      <h1>{t("welcome")}</h1>
    </>
  );
};
export default Dashboard;
