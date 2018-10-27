using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace JTemplate.Helpers
{
    public class EmailHelper
    {


        /*
         * 
         *  SMTP Username:
            AKIAJA3ZAVBFGMAUO7UA
            SMTP Password:
            Al7VUsk9jULMC2bSsAqp4i6nFGyevy1ur3ejXo7u0lqI 
         * 
         */

        private static string doNotReply = "donotreply@jordanriley.me";

        public static void Send(string toAdress, string subject, string body)
        {


            // Replace sender@example.com with your "From" address. 
            // This address must be verified with Amazon SES.
            String FROM = doNotReply;
            String FROMNAME = "Jordan";

            // Replace recipient@example.com with a "To" address. If your account 
            // is still in the sandbox, this address must be verified.
            String TO = toAdress;

            // Replace smtp_username with your Amazon SES SMTP user name.
            String SMTP_USERNAME = "AKIAJA3ZAVBFGMAUO7UA";

            // Replace smtp_password with your Amazon SES SMTP user name.
            String SMTP_PASSWORD = "Al7VUsk9jULMC2bSsAqp4i6nFGyevy1ur3ejXo7u0lqI";

            // If you're using Amazon SES in a region other than US West (Oregon), 
            // replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP  
            // endpoint in the appropriate AWS Region.
            String HOST = "email-smtp.us-west-2.amazonaws.com";

            // The port you will connect to on the Amazon SES SMTP endpoint. We
            // are choosing port 587 because we will use STARTTLS to encrypt
            // the connection.
            int PORT = 587;


            // Create and build a new MailMessage object
            MailMessage message = new MailMessage();
            message.IsBodyHtml = true;
            message.From = new MailAddress(FROM, FROMNAME);
            message.To.Add(new MailAddress(TO));
            message.Subject = subject;
            message.Body = body;
            // Comment or delete the next line if you are not using a configuration set
            //message.Headers.Add("X-SES-CONFIGURATION-SET", CONFIGSET);

            using (var client = new System.Net.Mail.SmtpClient(HOST, PORT))
            {
                // Pass SMTP credentials
                client.Credentials =
                    new NetworkCredential(SMTP_USERNAME, SMTP_PASSWORD);

                // Enable SSL encryption
                client.EnableSsl = true;

                // Try to send the message. Show status in console.
                try
                {
                    Console.WriteLine("Attempting to send email...");
                    client.Send(message);
                    Console.WriteLine("Email sent!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("The email was not sent.");
                    Console.WriteLine("Error message: " + ex.Message);
                }
            }

        }




    }
}
