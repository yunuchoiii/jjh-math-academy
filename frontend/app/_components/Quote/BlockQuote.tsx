"use client";

import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  & .shadow {
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.1);
  }

  & b, strong {
    color: #4c7e87;
  }
`;

const BlockQuote = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className="relative py-[30px]">
      <section className="relative bg-[#F2F7F8] border border-blue-1 shadow rounded-tr-[50px] rounded-bl-[50px] px-[30px] md:px-[50px] lg:px-[80px] py-[30px] md:py-[40px]">
        <div className="flex items-center justify-center">
          <div className="font-medium NanumSquare leading-relaxed">
            {children}
          </div>
        </div>
        <Image 
          src="/images/icons/quote.svg" 
          alt="quote" 
          width={50} 
          height={50} 
          className="absolute -top-[30px] left-8 rotate-180"
        />
        <Image 
          src="/images/icons/quote.svg" 
          alt="quote" 
          width={50} 
          height={50} 
          className="absolute -bottom-[30px] right-8"
        />
      </section>
    </Container>
  );
};

export default BlockQuote;
