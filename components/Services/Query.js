import { gql } from '@apollo/client';

const NEWS_ARTICLES = gql`
query NEWSANDRUMORS($categoryIn: [ID] = [1525, 22]) {
  posts(first: 12, where: {categoryIn: $categoryIn}) {
    nodes {
      id
      slug
      title
      uri
      excerpt
      categories {
        edges {
          isPrimary
          node {
            name
            slug
          }
        }
      }
      featuredImage {
        node {
          id
          sourceUrl
        }
      }
      author {
        node {
          id
          name
        }
      }
      date
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;


const FEATURED_ARTICLES = gql`
  query NEWSANDRUMORS {
    posts(first: 1, where: {categoryName: "featured"}) {
      nodes {
        id
        slug
        title
        categories {
          edges {
            isPrimary
            node {
              name
              slug
            }
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        author {
          node {
            id
            name
          }
        }
        date
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const LOAD_MORE_NEWS_ARTICLES = gql`
query LOADNEWS($after: String) {
  posts(first: 12, where: {categoryName: "news"}, after: $after) {
    nodes {
      id
      title
      slug
      categories {
        edges {
          isPrimary
          node {
            name
            slug
          }
        }
      }
      featuredImage {
        node {
          id
          sourceUrl
        }
      }
      author {
        node {
          id
          name
        }
      }
      date
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

const PHOTO_GALLARY = gql`
  query{
    photoGallaries {
      nodes {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }

`;

const VIDEO_PLAYLIST = gql`

  query VIDEOLIST {
    videoPlaylists {
      nodes {
        id
        videoplaylist {
          videoid
        }
      }
    }
  }

`;

const COMPANIES = gql`

  query COMPANIES {
    companies(where: {orderby: TERM_ORDER}) {
      nodes {
        id
        name
      }
    }
  }

`;

const RESULTS = gql`
  query RESULTS {
    quickResults(where: {orderby: {field: MODIFIED, order: DESC}}) {
      nodes {
        id
        title
        content
        shows {
          nodes {
            id
            name
          }
        }
      }
    }
  }

`;

const SHOWS = gql`

  query SHOWS {
    showsCompanies {
      nodes {
        id
        title
        showsAndCompanies {
          photo {
            sourceUrl
          }
        }
        companies {
          nodes {
            id
            name
          }
        }
      }
    }
  }

`;


const SINGLE_CATEGORY = gql`
query SingleCategory($slug: ID!) {
  category(id: $slug, idType: SLUG) {
    name
    id
    seo {
      fullHead
      metaDesc
      metaKeywords
      opengraphImage {
        sourceUrl
      }
      title
    }
    posts {
      nodes {
        id
        date
        slug
        title
        content
        excerpt
        date
        
        author{
          node{
            id
            name
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        categories {
          edges {
            isPrimary
            node {
              name
              slug
            }
          }
        }
      }
      pageInfo{
        endCursor
        hasNextPage
      }
    }
  }
}
`;
const RELATED_CATEGORY = gql`
query SingleCategory($slug: ID!) {
  category(id: $slug, idType: SLUG) {
    name
    id
    seo {
      fullHead
      metaDesc
      metaKeywords
      opengraphImage {
        sourceUrl
      }
      title
    }
    posts(first: 8) {
      nodes {
        id
        date
        slug
        title
        content
        excerpt
        date
        
        author{
          node{
            id
            name
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        categories {
          edges {
            isPrimary
            node {
              name
              slug
            }
          }
        }
      }
      pageInfo{
        endCursor
        hasNextPage
      }
    }
  }
}
`;
const LOAD_MORE_SINGLE_CATEGORY = gql`
query SingleCategory($slug: ID!, $after: String) {
  category(id: $slug, idType: SLUG) {
    name
    id
    posts(after: $after) {
      nodes {
        id
        date
        slug
        title
        content
        date
        author{
          node{
            id
            name
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        categories{
          edges {
            isPrimary
            node {
              name
              slug
            }
          }
        }
      }
      pageInfo{
        endCursor
        hasNextPage
      }
    }
  }
}
`;


const FOOTER_NEWS_ARTICLES = gql`
  query NEWSANDRUMORS {
    posts(first: 12, where: {categoryName: "lists"}) {
      nodes {
        id
        slug
        title
        excerpt
        categories {
          edges {
            isPrimary
            node {
              name
              slug
            }
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        author {
          node {
            id
            name
          }
        }
        date
      }
    }
  }
`;
const SEARCH_ARTICELS = gql`
query Search($query: String) {
  posts(where: {search: $query}) {
    nodes {
      id
      title
      slug
      date
      featuredImage {
        node{
          sourceUrl
        }
      }
      categories{
        edges {
          isPrimary
          node {
            name
            slug
          }
        }
      }
      author{
        node{
          name
        }
      }
    }
    pageInfo{
      endCursor
      hasNextPage
    }
    
  }
}
`;
const LOAD_MORE_SEARCH_ARTICELS = gql`
query Search($query: String, $after: String) {
  posts(where: {search: $query}, after: $after) {
    nodes {
      id
      title
      slug
      date
      featuredImage {
        node{
          sourceUrl
        }
      }
      categories{
        edges {
          isPrimary
          node {
            name
            slug
          }
        }
      }
      author{
        node{
          name
        }
      }
    }
    pageInfo{
      endCursor
      hasNextPage
    }
    
  }
}
`;


const SINGLEPOST = gql`
query singlePost($id: ID!) {
  post(id: $id, idType: SLUG) {
    databaseId
    title
    uri
    slug
    content
    
    author {
      node {
        name
      }
    }
    seo {
      fullHead
      metaDesc
      metaKeywords
      canonical
      opengraphImage {
        sourceUrl
      }
      title
    }
    categories{
      edges {
        isPrimary
        node {
          name
          slug
        }
      }
    }
    date
    sourcelinkfileds {
      sourceLink
      sourceLabel
    }
    featuredImage {
      node {
        mediaItemUrl
        caption
      }
    }
  }
}
`;


const GET_POST_CURSOR = gql`
  query GETPOSTCurs($id: Int!) {
    posts(where: {id: $id}, first: 1) {
      pageInfo {
        endCursor
      }
    }
  }
`


const GET_NEXT_POST = gql`
  query GETNEXTPOST ($cursor: String!) {
    posts(first: 1, after: $cursor) {
      nodes {
        databaseId
        title
        slug
        uri
        content
        author {
          node {
            name
          }
        }
        date
        categories{
          edges {
            isPrimary
            node {
              name
              slug
            }
          }
        }
        sourcelinkfileds {
          sourceLink
          sourceLabel
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`


const GET_SEO_PAGE = gql`
query GetSeo ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    seo {
      fullHead
      title
      metaDesc
      metaKeywords
      opengraphImage {
        sourceUrl
      }
    }
  }
}
`

const SINGLE_AUTHOR = gql`
query GETPOSTSBYWUTHOR($authorName: String!, $termTaxonomId: [ID] = ["22", "1525", "611", "73", "64", "1781", "1760"]) {
  posts(where: {authorName: $authorName}) {
    nodes {
      id
      title
      slug
      date
      seo {
        fullHead
        metaDesc
        metaKeywords
        title
        opengraphImage {
          sourceUrl
        }
      }
      categories(where: { termTaxonomId: $termTaxonomId}) {
        edges {
          isPrimary
          node {
            name
            slug
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`
const LOAD_MORE_SINGLE_AUTHOR = gql`
query LOADMOREPOSTSBYWUTHOR($authorName: String!, $after: String!, $termTaxonomId: [ID] = ["22", "1525", "611", "73", "64", "1781", "1760"]) {
  posts(where: {authorName: $authorName}, after: $after) {
    nodes {
      id
      title
      slug
      date
      categories(where: { termTaxonomId: $termTaxonomId}) {
        edges {
          isPrimary
          node {
            name
            slug
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`

const GET_SINGLE_TAG = gql`
query GETSINGLETAG($id: ID!, $termTaxonomId: [ID] = ["22", "1525", "611", "73", "64", "1781", "1760"]) {
  tag(id: $id, idType: SLUG) {
    name
    id
    seo {
      fullHead
      metaDesc
      metaKeywords
      opengraphImage {
        sourceUrl
      }
      title
    }
    posts {
      nodes {
        id
        date
        slug
        title
        content
        excerpt
        date
        author {
          node {
            id
            name
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        categories(where: { termTaxonomId: $termTaxonomId}) {
          edges {
            isPrimary
            node {
              name
              slug
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`
const LOADMORE_SINGLE_TAG = gql`
query GETSINGLETAG($id: ID!, $after: String!, $termTaxonomId: [ID] = ["22", "1525", "611", "73", "64", "1781", "1760"]) {
  tag(id: $id, idType: SLUG) {
    name
    id
    seo {
      fullHead
      metaDesc
      metaKeywords
      opengraphImage {
        sourceUrl
      }
      title
    }
    posts(after: $after) {
      nodes {
        id
        date
        slug
        title
        content
        excerpt
        date
        author {
          node {
            id
            name
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        categories(where: { termTaxonomId: $termTaxonomId}) {
          edges {
            isPrimary
            node {
              name
              slug
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`

const GET_ALL_CATEGORIES = gql`{
    categories(first: 999) {
      nodes {
        slug
      }
    }
  }`

const GET_SITEMAP_ALL_URL_POSTS = gql`{
  posts (first: 999999999) {
    nodes {
      uri
      title
      date
    }
  }
}`
const GET_SITEMAP_URI_POSTS = gql`{ 
  posts(first: 99999) {
    nodes {
      uri
      title
      date
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  }`

  const GET_EVENTS = gql`
  query EventSchedules{
    eventSchedules {
      nodes {
        id
        title
        eventfileds {
          eventCompany
          eventDate
          eventType
          eventImage {
            sourceUrl
          }
        }
      }
    }
  }
  `

export {GET_EVENTS, GET_SITEMAP_ALL_URL_POSTS, GET_SITEMAP_URI_POSTS, GET_ALL_CATEGORIES, LOADMORE_SINGLE_TAG, GET_SINGLE_TAG, RELATED_CATEGORY, SINGLE_AUTHOR, LOAD_MORE_SINGLE_AUTHOR, GET_SEO_PAGE, GET_NEXT_POST, GET_POST_CURSOR, SINGLEPOST, LOAD_MORE_SINGLE_CATEGORY, LOAD_MORE_NEWS_ARTICLES, FOOTER_NEWS_ARTICLES, SINGLE_CATEGORY, FEATURED_ARTICLES, NEWS_ARTICLES, PHOTO_GALLARY, VIDEO_PLAYLIST, COMPANIES, SHOWS, RESULTS, SEARCH_ARTICELS, LOAD_MORE_SEARCH_ARTICELS };