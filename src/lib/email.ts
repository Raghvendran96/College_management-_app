import { Resend } from 'resend';

const API_KEY = process.env.RESEND_API_KEY || "simulated_node_key";
const resend = API_KEY !== "simulated_node_key" ? new Resend(API_KEY) : null;

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
  if (!resend) {
    console.warn("🔔 [INSTITUTIONAL ALERT NODE: SIMULATED]");
    console.warn(`TO: ${to}\nSUBJECT: ${subject}\nNODE ACTIVE.`);
    return { success: true, simulated: true };
  }
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
  `,
  demoRequestNotify: (name: string, email: string, phone: string, location: string, purpose: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #082f49; color: #fff;">
      <h2 style="color: #38bdf8;">New Institutional Delegate! 👑</h2>
      <p>Master Owner <strong>Raghvendra</strong>,</p>
      <p>A new visitor has accessed your <strong>College Management System</strong> demo lattice.</p>
      <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Identity Persona:</strong> ${name}</p>
        <p><strong>Contact Hub (Email):</strong> ${email}</p>
        <p><strong>Phone Node:</strong> ${phone}</p>
        <p><strong>Location Node:</strong> ${location}</p>
        <p><strong>Institutional Purpose:</strong> ${purpose}</p>
      </div>
      <p>Log in to your <strong>Master Request Board</strong> to audit all pending demographic nodes.</p>
      <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
      <p style="font-size: 12px; opacity: 0.6;">This is an authoritative notification from your Flagship CMS Portal.</p>
    </div>
  `
};
