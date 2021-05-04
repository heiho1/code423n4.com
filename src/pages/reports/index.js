import React from "react";
import { graphql } from "gatsby";
import DefaultLayout from "../../layouts/DefaultLayout";
import ReportList from "../../components/ReportList";

export default function SiteIndex({ data }) {
  const reports = data.reports.edges;

  return (
    <DefaultLayout title="Code 423n4" bodyClass="landing">
      <div className="wrapper-main">
        <section>
          {reports ? (
            <ReportList reports={reports} />
          ) : (
            "No reports yet. You can add one in the `_reports` directory."
          )}
        </section>
      </div>
    </DefaultLayout>
  );
}

export const query = graphql`
  query {
    reports: allMarkdownRemark(
      filter: { fields: { collection: { eq: "reports" } } }
      sort: { fields: frontmatter___contest___contestid }
    ) {
      edges {
        node {
          frontmatter {
            title
            image
            link
            slug
            findings
            altUrl
            sponsor {
              id
              image
              link
              name
            }
            contest {
              end_time
              start_time
              title
              repo
              amount
              details
            }
          }
        }
      }
    }
  }
`;
