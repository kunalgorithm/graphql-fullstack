import fetch from 'isomorphic-unfetch';
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../src/ProTip';
import Link from '../src/Link';

const Index = ({ users }) => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js example
      </Typography>
      <Link href="/login" color="secondary">
        Login
      </Link>{' '}
      or{' '}
      <Link href="/signup" color="secondary">
        Sign up
      </Link>
      <ProTip />
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      <div>
        {users.map((user, i) => (
          <div key={i}>{user.name}</div>
        ))}
      </div>
    </Box>
  </Container>
);

Index.getInitialProps = async () => {
  // console.log(process.env);

  const response = await fetch(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/graphql'
      : `https://api-routes-graphql-app.kunalgorithm.now.sh/api/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query: '{ users { name } }' }),
    }
  );

  const {
    data: { users },
  } = await response.json();

  return { users };
};

export default Index;
