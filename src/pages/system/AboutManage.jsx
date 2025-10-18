
import React, { useEffect, useState } from "react";
import { Card, Form, Button, notification } from "antd";
import MarkdownEditor from "../../components/MarkdownEditor";
import { getAbout, upsertAbout } from "../../utils/api/aboutApi";
import { useTranslation } from "react-i18next";


const AboutManage = () => {
	const [form] = Form.useForm();
	const { t } = useTranslation("admin");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchAbout = async () => {
			try {
				const res = await getAbout();
				if (res && res.data) {
					form.setFieldsValue({
						contentMarkdown: res.data.contentMarkdown || "",
						contentHTML: res.data.contentHTML || "",
					});
				}
			} catch (error) {
				console.log(error)
			}
		};
		fetchAbout();
	}, [form]);

	// lưu thông tin giới thiệu
	const handleSubmit = async (values) => {
		setLoading(true);
		try {
			const res = await upsertAbout({
				contentMarkdown: values.contentMarkdown,
				contentHTML: values.contentHTML,
			});
			if (res && res.errCode === 0) {
				notification.success({
					message: "Thành công",
					description: "Lưu thông tin giới thiệu thành công!",
				});
			} else {
				notification.error({
					message: "Lỗi",
					description: res?.message || "Có lỗi xảy ra khi lưu.",
				});
			}
		} catch (error) {
			notification.error({
				message: "Lỗi",
				description: "Không thể lưu thông tin giới thiệu.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="about-managa">
			<Card title={t("manage_referral_information.manage_referral_information")} bordered={false}>
				<Form form={form} layout="vertical" onFinish={handleSubmit}>
					<Form.Item
						label={t("manage_referral_information.referral_information")}
						className="markdown-editor-item"
						shouldUpdate
					>
						{({ setFieldsValue, getFieldValue }) => (
							<MarkdownEditor
								value={getFieldValue("contentMarkdown") || ""}
								onChange={({ markdown, html }) => {
									setFieldsValue({
										contentMarkdown: markdown,
										contentHTML: html,
									});
								}}
							/>
						)}
					</Form.Item>
					<Form.Item name="contentMarkdown" noStyle />
					<Form.Item name="contentHTML" noStyle />
					<Form.Item className="submit-button">
						<Button type="primary" htmlType="submit" loading={loading}>
							{t("manage_referral_information.save_changes")}
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default AboutManage;
