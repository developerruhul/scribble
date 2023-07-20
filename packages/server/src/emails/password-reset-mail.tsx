import { type User } from '@prisma/client';
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Heading,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface ScribbleResetPasswordEmailProps {
  token?: string;
  user?: User;
}

const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

export const PasswordResetMail = ({
  token,
  user,
}: ScribbleResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Follow these instructions to reset your scribble password!
      </Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/scribble-logo.png`}
                width="40"
                height="37"
                alt="Scribble Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>Password reset</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {user?.name || 'Scribble user'},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>
                Someone requested a password reset for your scribble account:
              </strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              To reset your password, visit this following address
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] text-white rounded text-[12px] font-semibold no-underline text-center"
                href={`${baseUrl}/reset-password?token=${token}`}
              >
                Click here to reset your password
              </Button>
            </Section>
            <Text className="text-black/60 text-[13px] leading-[24px] text-center font-medium">
              If this was a mistake, just ignore this email and nothing will
              happen.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetMail;
