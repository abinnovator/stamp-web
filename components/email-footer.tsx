import { Section, Img, Text, Row, Column, Link, Tailwind } from "@react-email/components";
import React from 'react'

const Emailfooter = () => {
  return (
    <Tailwind>
        <Section className="text-center">
            <table className="w-full">
            <tr className="w-full">
                <td align="center">
                <Img
                    alt="Stamp Logo"
                    height="42"
                    src="https://stamp-green.vercel.app/Logo.svg"
                    width="42"
                />
                </td>
            </tr>
            <tr className="w-full">
                <td align="center">
                <Text className="my-[8px] font-semibold text-[16px] text-gray-900 leading-[24px]">
                    Stamp
                </Text>
                <Text className="mt-[4px] mb-0 text-[16px] text-gray-500 leading-[24px]">
                    Work smarter. Not harder.
                </Text>
                </td>
            </tr>
            
            </table>
        </Section>  
        </Tailwind>
  )
}

export default Emailfooter
