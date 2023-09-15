import { GET_SEO_PAGE } from "../components/Services/Query";

import dynamic from "next/dynamic";
const Headview = dynamic(() => import("../components/common/Head"));
import client from '../components/ApolloClient'
const Layout = dynamic(() => import("../components/common/Layout"));
export default function PrivacyPolicy({ SeoData, QuotesData }) {
  return (
    <>
      <Headview
        title={SeoData?.title}
        description={SeoData?.metaDesc}
        keywords={SeoData?.metaKeywords}
        Image={SeoData?.opengraphImage?.sourceUrl}
      >
        {SeoData?.fullHead}{" "}
      </Headview>
      <Layout QuotesData={QuotesData}>
        <div className="my-5 mx-10">
          <h1 className="text-[20px] md:text-[30px]  font-semibold uppercase text-center py-10">
            privacy policy
          </h1>
          <div className="py-[32px] bg-white dark:bg-[#161616] rounded px-5 md:px-10 font_nunito text-lg leading-8 font-normal">
            <h1 className=" font-bold text-xl uppercase pb-4">
              Your privacy is important to us
            </h1>
            <p>
              WrestlingWorld is committed to ensuring that your privacy is
              protected. This Privacy Policy applies to www.wrestlingworld.co
              (hereinafter, “us”, “we”, or “www.wrestlingworld.co”). Should we
              ask you to provide certain information by which you can be
              identified when using this website, then you can be assured that
              it will only be used in accordance with this privacy statement.
              WrestlingWorld may change this policy from time to time by
              updating this page. You should check this page from time to time
              to ensure that you are happy with any changes. This policy is
              effective from Feb 1, 2018
            </p>
            <h1 className=" font-bold text-xl uppercase py-5">
              Website Visitors
            </h1>
            <p>
              Like most website operators, WrestlingWorld collects
              non-personally-identifying information of the sort that web
              browsers and servers typically make available, such as the browser
              type, language preference, referring site, and the date and time
              of each visitor request. WrestlingWorld’s purpose in collecting
              non-personally identifying information is to better understand how
              WrestlingWorld’s visitors use its website. From time to time,
              WrestlingWorld may release non-personally-identifying information
              in the aggregate, e.g., by publishing a report on trends in the
              usage of its website. WrestlingWorld also collects potentially
              personally-identifying information like Internet Protocol (IP)
              addresses for logged in users and for users leaving comments on
              https://www.wrestlingworld.co blog posts. WrestlingWorld only
              discloses logged in user and commenter IP addresses under the same
              circumstances that it uses and discloses personally-identifying
              information as described below.
            </p>
            <h1 className=" font-bold text-xl uppercase py-5">
              Gathering of Personally-Identifying Information
            </h1>
            <p>
              Certain visitors to WrestlingWorld’s website choose to interact
              with WrestlingWorld in ways that require WrestlingWorld to gather
              personally-identifying information. The amount and type of
              information that WrestlingWorld gathers depends on the nature of
              the interaction. For example, we ask visitors who sign up for a
              newsletter at https://www.wrestlingworld.co to provide a username
              and email address.
            </p>

            <h1 className=" font-bold text-xl uppercase py-5">Security</h1>

            <p>
              We are committed to ensuring that your information is secure. In
              order to prevent unauthorized access or disclosure we have put in
              place suitable physical, electronic and managerial procedures to
              safeguard and secure the information we collect online.
              Advertisements Ads appearing on our website may be delivered to
              users by advertising partners, who may set cookies. These cookies
              allow the ad server to recognize your computer each time they send
              you an online advertisement to compile information about you or
              others who use your computer. This information allows ad networks
              to, among other things, deliver targeted advertisements that they
              believe will be of most interest to you. This Privacy Policy
              covers the use of cookies by WrestlingWorld and does not cover the
              use of cookies by any advertisers.
            </p>

            <h1 className=" font-bold text-xl uppercase py-5">
              Links To External Sites
            </h1>

            <p>
              Our Service may contain links to external sites that are not
              operated by us. If you click on a third party link, you will be
              directed to that third party’s site. We strongly advise you to
              review the Privacy Policy and terms and conditions of every site
              you visit. We have no control over, and assume no responsibility
              for the content, privacy policies or practices of any third party
              sites, products or services.
            </p>
            <h1 className=" font-bold text-xl uppercase py-5">Cookies</h1>

            <p>
              A cookie is a small file which asks permission to be placed on
              your computer’s hard drive. Once you agree, the file is added and
              the cookie helps analyze web traffic or lets you know when you
              visit a particular site. Cookies allow web applications to respond
              to you as an individual. The web application can tailor its
              operations to your needs, likes and dislikes by gathering and
              remembering information about your preferences. We use traffic log
              cookies to identify which pages are being used. This helps us
              analyze data about web page traffic and improve our website in
              order to tailor it to customer needs. We only use this information
              for statistical analysis purposes and then the data is removed
              from the system. Overall, cookies help us provide you with a
              better website, by enabling us to monitor which pages you find
              useful and which you do not. A cookie in no way gives us access to
              your computer or any information about you, other than the data
              you choose to share with us. You can choose to accept or decline
              cookies. Most web browsers automatically accept cookies, but you
              can usually modify your browser setting to decline cookies if you
              prefer. This may prevent you from taking full advantage of the
              website.
            </p>
            <h1 className=" font-bold text-xl uppercase py-5">
              Contact Information
            </h1>

            <p>
              If you have any questions about this Privacy Policy, please
              contact us.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const resSeo = await client.query({
    query: GET_SEO_PAGE,
    variables: { id: 477 },
  });
  const resQuotes = await fetch(
    `https://api.wrestlingworld.co/wp-json/jet-cct/wrestling_quotes/?_order=asc`
  );
  const QuotesData = await resQuotes.json();
  return {
    props: {
      SeoData: resSeo?.data?.page?.seo,
      QuotesData,
    }, // will be passed to the page component as props
  };
}
