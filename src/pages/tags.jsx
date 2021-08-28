import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import Layout from '../layout/index';
import SEO from '../components/SEO';
import PostShortList from '../components/postShortList';
// import './tags.scss';

const Tags = ({ data }) => {
  const { group } = data.allMarkdownRemark;
  const tagList = [];
  group.forEach(tag => {
    const posts = [];
    tag.edges.forEach(({ node }) => {
      posts.push({
        date: node.frontmatter.date,
        timeToRead: node.timeToRead,
        slug: node.fields.slug,
        title: node.frontmatter.title,
      });
    });

    tagList.push({
      fieldValue: tag.fieldValue,
      posts,
    });
  });
  return (
    <Layout>
      <SEO title="Tags" path="/tags" />
      <h1 className="text-center">Tags</h1>
      <ul className="tags-head">
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${_.kebabCase(tag.fieldValue)}`} className="post-tag">
              {`${tag.fieldValue} (${tag.totalCount})`}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <PostShortList data={tagList} />
    </Layout>
  );
};

Tags.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
          edges: PropTypes.arrayOf(
            PropTypes.shape({
              node: PropTypes.shape({
                fields: PropTypes.shape({
                  slug: PropTypes.string.isRequired,
                }).isRequired,
                timeToRead: PropTypes.number.isRequired,
                frontmatter: PropTypes.shape({
                  title: PropTypes.string.isRequired,
                  date: PropTypes.string,
                }).isRequired,
              }).isRequired,
            }),
          ),
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Tags;

export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
        edges {
          node {
            fields {
              slug
            }
            timeToRead
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  }
`;
