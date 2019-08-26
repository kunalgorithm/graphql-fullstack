import fetch from 'isomorphic-unfetch';

const Index = ({ users }) => (
  <div>
    {users.map((user, i) => (
      <div key={i}>{user.name}</div>
    ))}
  </div>
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
