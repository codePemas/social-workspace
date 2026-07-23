import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      userType,
      monthlyIncome,
      loanAmount,
      loanTermMonths,
      totalInterest,
      totalRepayment,
      monthlyRepayment,
    } = body;

    // Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["liyemavanda199@gmail.com"],
      subject: `New Loan Application: ${fullName}`,
      html: `
        <h2>New Loan Application Submitted</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>User Type:</strong> ${userType}</p>
        <p><strong>Monthly Income:</strong> R${monthlyIncome}</p>
        <hr />
        <h3>Loan Details</h3>
        <p><strong>Requested Amount:</strong> R${loanAmount}</p>
        <p><strong>Term:</strong> ${loanTermMonths} month(s)</p>
        <p><strong>Total Interest:</strong> R${totalInterest}</p>
        <p><strong>Total Repayment:</strong> R${totalRepayment}</p>
        <p><strong>Monthly Repayment:</strong> R${monthlyRepayment} / month</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}