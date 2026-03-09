import { Section, Row, Column, Img, Link, Tailwind } from "@react-email/components";
import React from 'react'

const Emailheader = () => {
  return (
    <Tailwind>
      <Section className="my-[40px] px-[32px] py-[40px]">
        <Row>
          <Column className="w-[80%]">
            <Img
              alt="Stamp logo"
              height="42"
              src="https://stamp-green.vercel.app/Logo.svg"
            />
          </Column>
          <Column align="right">
            <Row align="right">
              <Column className="px-[8px]">
                <Link className="text-gray-600 [text-decoration:none]" href="https://stamp-green.vercel.app">
                  About
                </Link>
              </Column>
              <Column className="px-[8px]">
                <Link className="text-gray-600 [text-decoration:none]" href="https://stamp-green.vercel.app">
                  Features
                </Link>
              </Column>
            </Row>
          </Column>
        </Row>
      </Section>  
    </Tailwind>
  )
}

export default Emailheader
