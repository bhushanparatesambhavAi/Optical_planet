import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export const sendEmail = async ({
    to,
    subject,
    react,
}: {
    to: string;
    subject: string;
    react: React.ReactElement;
}) => {
    if (!resend) {
        console.log("Resend API Key missing. Mocking email send:", { to, subject });
        return { success: true, id: 'mock-id' };
    }

    try {
        const data = await resend.emails.send({
            from: 'Optical Planet <orders@opticalplanet.com>', // Update with verified domain in prod
            to,
            subject,
            react,
        });

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error };
    }
};
