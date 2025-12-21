const nodemailer = require('nodemailer');

exports.sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Create Transporter (GMAIL)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email Options
        const mailOptions = {
            from: `"${name}" <${email}>`, // Proper sender format
            to: 'kunaltudu2@gmail.com, kunaltudu@gmail.com', // Sending to both as requested
            subject: `New Contact Form Message from ${name}`,
            text: `
                You have received a new message from your Quiz App Contact Form.

                Name: ${name}
                Email: ${email}
                
                Message:
                ${message}
            `,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #f4d125;">
                    ${message}
                </blockquote>
            `
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email. Check server logs.' });
    }
};
