import * as React from 'react';

interface EmailTemplateProps {
  resetUrl: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  resetUrl
}) => (
  <div>
    <h1>Welcome !</h1>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href={resetUrl}>Reset Password</a>
  </div>
);
export { EmailTemplate };