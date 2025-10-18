
import React, { useEffect, useState } from "react";
import { getAbout } from "../../utils/api/aboutApi";

const About = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await getAbout();
        if (res && res.data && res.data.contentHTML) {
          setContent(res.data.contentHTML);
        }
      } catch (error) {
        setContent("Không thể tải nội dung giới thiệu.");
      }
    };
    fetchAbout();
  }, []);

  return (
    <div className="about-content" style={{paddingTop: "20px", paddingRight: "60px", paddingLeft: "60px" }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default About;
