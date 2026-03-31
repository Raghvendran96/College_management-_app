import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'CMS Notifications <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email Send Exception:', error);
    return { success: false, error };
  }
}

export const emailTemplates = {
  gradeUpdated: (studentName: string, assignmentTitle: string, grade: string, feedback: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #000;">New Grade Posted! 🎓</h2>
      <p>Hello <strong>${studentName}</strong>,</p>
      <p>Your submission for <strong>"${assignmentTitle}"</strong> has been graded.</p>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Feedback:</strong> ${feedback || "No additional feedback provided."}</p>
      </div>
      <p>Log in to your portal to see more details.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #666;">This is an automated notification from your College Management System.</p>
    </div>
  `,
  feeOverdue: (studentName: string, amount: string, dueDate: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #d32f2f;">Fee Payment Reminder ⚠️</h2>
      <p>Hello <strong>${studentName}</strong>,</p>
      <p>This is a reminder that your tuition fee of <strong>₹${amount}</strong> is currently overdue.</p>
      <p><strong>Original Due Date:</strong> ${new Date(dueDate).toLocaleDateString()}</p>
      <p>Please log in to the Finance Portal to settle this amount as soon as possible to avoid any late penalties.</p>
      <div style="margin: 30px 0;">
        <a href="#" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Pay Now</a>
      </div>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #666;">If you have already paid, please ignore this email.</p>
    </div>
  `
};
