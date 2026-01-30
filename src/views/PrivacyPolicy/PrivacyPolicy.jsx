import React from 'react';
import './PrivacyPolicy.scss';
import { Layout, Typography } from 'antd';

const { Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const PrivacyPolicy = () => {
  return (
    <Layout className="privacy-policy-layout">
      <Content className="privacy-policy-content">
        <div className="privacy-container">
          <Typography>
            <Title level={1}>Privacy Policy</Title>
            <Paragraph style={{ textAlign: 'center', color: '#8c8c8c' }}>
              Last updated: {new Date().toLocaleDateString()}
            </Paragraph>

            <Title level={3}>1. Introduction</Title>
            <Paragraph>
              Welcome to <strong>WellnessBuddy</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service").
            </Paragraph>
            <Paragraph>
              By accessing or using the Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
            </Paragraph>

            <Title level={3}>2. Information We Collect</Title>
            
            <Title level={4}>2.1 Personal Information</Title>
            <Paragraph>
              We may collect personal information that you voluntarily provide to us when you register for the Service, such as:
              <ul>
                <li>Name and Contact Information (e.g., email address)</li>
                <li>Employee ID or Mask ID</li>
                <li>Demographic information (e.g., age, gender)</li>
                <li>Account credentials (username and password)</li>
              </ul>
            </Paragraph>

            <Title level={4}>2.2 Health and Fitness Data</Title>
            <Paragraph>
              To provide our wellness monitoring and improvement services, we may collect health and fitness data, including but not limited to:
              <ul>
                <li>Physical activity data (e.g., step count, exercise logs)</li>
                <li>Sleep patterns and quality metrics</li>
                <li>Heart rate and physiological data</li>
                <li>Self-reported fatigue levels and workload assessments</li>
                <li>Well-being and psychomotor vigilance task (PVT) performance data</li>
              </ul>
              This data may be collected directly from your inputs or through integration with third-party wearable devices (e.g., Fitbit) or services, provided you have granted us permission to access such data.
            </Paragraph>

            <Title level={4}>2.3 Device and Usage Information</Title>
            <Paragraph>
              We may automatically collect certain information about your device and how you interact with our Service, including:
              <ul>
                <li>Device type, operating system model and version</li>
                <li>Unique device identifiers</li>
                <li>Log data (e.g., access times, app features used)</li>
                <li>Crash reports and performance data</li>
              </ul>
            </Paragraph>

            <Title level={3}>3. How We Use Your Information</Title>
            <Paragraph>
              We use the collected information for the following purposes:
              <ul>
                <li>To provide, maintain, and improve the functionality of our Service.</li>
                <li>To monitor and analyze trends, usage, and activities to enhance user experience.</li>
                <li>To provide personalized insights, feedback, and recommendations regarding your wellness and fatigue management.</li>
                <li>To manage your account and send you technical notices, updates, security alerts, and support messages.</li>
                <li>To facilitate research and analysis related to workplace wellness and fatigue (using aggregated and anonymized data where appropriate).</li>
              </ul>
            </Paragraph>

            <Title level={3}>4. Data Sharing and Disclosure</Title>
            <Paragraph>
              We do not sell your personal information. We may share your information in the following circumstances:
              <ul>
                <li><strong>With Your Consent:</strong> We may share information when you give us your explicit consent to do so.</li>
                <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our Service (e.g., cloud hosting, data analytics), subject to strict confidentiality agreements.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
                <li><strong>Research Collaboration:</strong> Aggregated and anonymized data may be shared with research partners (e.g., SIA-NUS Digital Aviation Corporate Laboratory) for scientific research purposes.</li>
              </ul>
            </Paragraph>

            <Title level={3}>5. Data Security</Title>
            <Paragraph>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include data encryption, secure server infrastructure, and access controls. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </Paragraph>

            <Title level={3}>6. Data Retention</Title>
            <Paragraph>
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements. When data is no longer needed, it will be securely deleted or anonymized.
            </Paragraph>

            <Title level={3}>7. Your Rights</Title>
            <Paragraph>
              Depending on your jurisdiction, you may have the following rights regarding your personal data:
              <ul>
                <li><strong>Access:</strong> You have the right to request copies of your personal data held by us.</li>
                <li><strong>Correction:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                <li><strong>Deletion:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>Withdraw Consent:</strong> You have the right to withdraw your consent at any time where we relied on your consent to process your personal information.</li>
              </ul>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </Paragraph>

            <Title level={3}>8. Children's Privacy</Title>
            <Paragraph>
              Our Service is not intended for use by children under the age of 13. We do not knowingly collect personal identifiable information from children. If we become aware that we have collected personal data from a child without verification of parental consent, we take steps to remove that information from our servers.
            </Paragraph>

            <Title level={3}>9. Changes to This Privacy Policy</Title>
            <Paragraph>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </Paragraph>

            <Title level={3}>10. Contact Us</Title>
            <Paragraph>
              If you have any questions about this Privacy Policy, please contact us at:
            </Paragraph>
            <Paragraph>
              <Text strong>Email:</Text> <a href="mailto:support@getwellnessbuddy.com">support@getwellnessbuddy.com</a>
            </Paragraph>
          </Typography>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        WellnessBuddy ©{new Date().getFullYear()} Created by SIA-NUS Digital Aviation Corporate Laboratory
      </Footer>
    </Layout>
  );
};

export default PrivacyPolicy;
