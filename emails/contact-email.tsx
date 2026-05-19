import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const main = {
  backgroundColor: "#f4f4f5",
  color: "#18181b",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  width: "100%",
  maxWidth: "620px",
  margin: "0 auto",
  padding: "36px 20px",
};

const card = {
  backgroundColor: "#ffffff",
  border: "1px solid #e4e4e7",
  borderRadius: "16px",
  padding: "32px",
};

const eyebrow = {
  margin: "0 0 10px",
  color: "#71717a",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
};

const heading = {
  margin: "0",
  color: "#111827",
  fontSize: "28px",
  lineHeight: "1.2",
};

const label = {
  margin: "0 0 4px",
  color: "#71717a",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const value = {
  margin: "0",
  color: "#18181b",
  fontSize: "15px",
  lineHeight: "1.6",
};

const messageBox = {
  marginTop: "18px",
  padding: "18px",
  backgroundColor: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
};

export function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New portfolio message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Text style={eyebrow}>Portfolio Contact</Text>
            <Heading style={heading}>New message from {name}</Heading>

            <Hr style={{ borderColor: "#e4e4e7", margin: "24px 0" }} />

            <Section>
              <Text style={label}>From</Text>
              <Text style={value}>
                {name} · {email}
              </Text>
            </Section>

            <Section style={{ marginTop: "16px" }}>
              <Text style={label}>Subject</Text>
              <Text style={value}>{subject}</Text>
            </Section>

            <Section style={messageBox}>
              <Text style={label}>Message</Text>
              <Text style={{ ...value, whiteSpace: "pre-wrap" }}>{message}</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactEmail;
